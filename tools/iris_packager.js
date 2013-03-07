var fs = require('fs');
var compressor = require('node-minify');
var extend = require('node.extend');
var fileset = require('fileset');
var util = require('util');
var path = require('path');
var async = require('async');
var b64img = require('css-b64-images');

var config = {
 html: [],
 js: [],
 css: [],
 outputFile: "",
 initJs: "",
 pathBase: "",
 inputPaths: [],
 excludePaths: [],
 extension: {
  html: true,
  js: true,
  css: false
 },
 outputPath: "",
 cssSuffix:"-min",
 mode: "",
 deleteInputs: false,
 base64images: false
}

function ItemStats() {
 this.numFiles = 0;
 this.inputSize = 0;
 this.outputSize = 0;
 this.compression = function () {
  return parseInt((this.inputSize - this.outputSize) / this.inputSize * 100) + "%";
 };
}

var globalStats = {
 js:  new ItemStats(), 
 html:new ItemStats(),
 css: new ItemStats(),
 total: new ItemStats()
};

function init () {
 var file_config = null;
 if (fs.existsSync("iris_packager.json") && fs.statSync("iris_packager.json").isFile()) {
  file_config = fs.readFileSync("iris_packager.json");
  config = extend(true, config, JSON.parse(file_config));
 }

 process.argv.forEach(
  function (val, index, array) {
   var param;

   param = getParam("input=", val);
   if ( param !== null ) {
    config.inputPaths = param.split(",");
   }

   
   param = getParam("exclude=", val);
   if ( param !== null ) {
    config.excludePaths = param.split(",");
   }
   
   param = getParam("ext=", val);
   if ( param !== null ) {
    config.extension = (function toObject(arr) {
     var rv = {};
     for (var i = 0; i < arr.length; ++i)
      rv[arr[i]] = true;
     return rv;
    })(param.split(","));
   }
   
   
   param = getParam("output=", val);
   if ( param !== null ) {
    config.outputPath = param;
    config.outputFile = "";
   }

   param = getParam("init=", val);
   if ( param !== null ) {
    config.initJs = param;
   }

   param = getParam("base=", val);
   if ( param !== null ) {
    config.pathBase = param;
   }
   
   param = getParam("cssSuffix=", val);
   if ( param !== null ) {
    config.cssSuffix = param;
   }
   
   param = getParam("mode=", val);
   if ( param !== null ) {
    config.mode = param;
   }
   
   param = getParam("delete=", val);
   if ( param !== null ) {
    config.deleteInputs = param;
   }

   param = getParam("b64=", val);
   if ( param !== null ) {
    config.base64images = param;
   }
  }
  );

 if ( !config.inputPaths ) {
 //throw "you must specify the parameter input=path_to_directory/,path_to_file...";
 }
 
 if ( !config.outputPath && !config.outputFile ) {
  throw "you must specify the parameter output=path/";
 }

 if ( !config.initJs ) {
  throw "you must specify the parameter init=path/file.js";
 }

 if (!config.outputFile) {
  if (fs.existsSync(config.outputPath) && fs.statSync(config.outputPath).isDirectory()) {
   config.outputFile = validatePath(config.outputPath) + config.initJs.match(/[^/]+\.js$/);
  } else {
   config.outputFile = config.outputPath;
  }
 }
 
 config.js.push(config.initJs);
 console.log("***************************************************************************************"); 
 console.log("config = " + util.inspect(config));
 console.log("***************************************************************************************");
 
 var includes = "";
 var excludes = "";
 if (config.inputPaths.length > 0) {
  for (var i = 0; i < config.inputPaths.length; i++) {
   config.inputPaths[i] = config.pathBase + config.inputPaths[i];
  }
  includes = config.inputPaths.join(" ");
  if (config.excludePaths.length > 0) {
   for (i = 0; i < config.excludePaths.length; i++) {
    config.excludePaths[i] = config.pathBase + config.excludePaths[i];
   }
   excludes = config.excludePaths.join(" ");
  }
  
  fileset(includes,  excludes, function(err, files) {
   if (err) return console.error(err);
   for (var i = 0; i < files.length; i++) {
    var initPath = files[i];
    console.log("scanning '" + initPath + "'...");
   
   
    var stats = fs.statSync(initPath);
    if (stats.isFile()) {
     scanFile(initPath);
    } else {
     scanPath(validatePath(initPath));
    }
   }
  
  }).on('end', function() {
   
   generateOutput();
  }); 
 }
}

function validatePath (path) {
 if ( path.substr(-1) !== "/" ) {
  path = path + "/";
 }
 return path;
}

function getParam (label, value) {
 var idx = value.indexOf(label);
 if ( idx > -1 ) {
  return value.substring( idx + label.length );
 }
 return null;
}

function scanPath (path) {
 var filenames = fs.readdirSync(path);
 var fullPath;
 filenames.forEach(function(file) {
  fullPath = path + file;

  if ( fs.statSync(fullPath).isDirectory() ) {
   console.log("found dir '" + fullPath + "'...");
   scanPath(fullPath + "/");
  } else if ( fs.statSync(fullPath).isFile() ) {
   scanFile(fullPath);
  }
 });
}

function scanFile(file) {
 
 var ext = path.extname(file).replace(".","");
 
 if (ext === "html" || ext === "js" || ext === "css") {
  for (var i = 0; i < config[ext].length; i++) {
   if (config[ext][i] === file) {
    console.log("duplicate " + ext + " '" + file + "'...");
    return;
   }
  }
  console.log("found " + ext + " '" + file + "'...");
  config[ext].push(file);
 }
}


function generateOutput () {
 console.log("Gerenating output. Wait please...");
 
 calculateInputStats("js");
 calculateInputStats("html");
 calculateInputStats("css");
 
 async.series([
  function(callback) {
   minifyJs(callback);
  },
  function(callback) {
   minifyCSS(callback);
  },
  function(callback) {
   b64(callback);
  },
  function(callback) {
   concatTemplates(callback);
  },
  function(callback) {
   deleteFiles(callback);
  }
  ,function(callback) {
   printResults(callback);
  }
  ]);
}

function minifyJs(callback) {
 if (!config.extension.js || config.js.length == 0 || config.mode === "test") {
  callback(null, "minifyJs");
  return;
 }
 console.log("Minimizing JS...");
 
 // Compress using Google Closure
 new compressor.minify({
  type: 'gcc',
  fileIn: config.js,
  fileOut: config.outputFile,
  callback: function(err){
   if ( err ) {
    callback(err, "minifyJs");
   } else {
    globalStats.js.outputSize += fs.statSync(this.fileOut).size;
    callback(null, "minifyJs");
   }
  }
 });
}

function minifyCSS(callback) {
 if (!config.extension.css || config.css.length == 0 || config.mode === "test") {
  callback(null, "minifyCSS");
  return;
 }
 console.log("Minimizing CSS...");
 var filesProcessed = 0;
 for ( var f=0, F=config.css.length;f<F; f++ ) {
  var inCSS = config.css[f];
  (function (fileIn) {
   var outCSS = path.dirname(fileIn) + "/" + path.basename(fileIn, ".css") + config.cssSuffix + ".css";
   new compressor.minify({
    type: 'yui-css',
    fileIn: fileIn,
    fileOut: outCSS,
    callback: function(err){
     if ( err ) {
      callback(err, "minifyCSS");
     } else {
      filesProcessed++;
      globalStats.css.outputSize += fs.statSync(outCSS).size;
      if (filesProcessed == config.css.length) {
       callback(null, "minifyCSS");
      }
     }
    }
   });  
  })(inCSS);
 }
}

function b64(callback) {
 if (!config.extension.css || config.css.length == 0 || config.mode === "test" || !config.base64images) {
  callback(null, "b64");
  return;
 }
 console.log("Coding Base64 CSS Images...");
 var filesProcessed = 0;
 for ( var f=0, F=config.css.length;f<F; f++ ) {
  var inCSS = config.css[f];
  (function (fileIn) {
   var outCSS = path.dirname(fileIn) + "/" + path.basename(fileIn, ".css") + config.cssSuffix + ".css";
   b64img.fromFile(outCSS, __dirname,   function(err, css){
    if ( err ) {
      callback(err, "b64");
     } else {
      fs.writeFileSync(outCSS, css);
      filesProcessed++;
      globalStats.css.outputSize += fs.statSync(outCSS).size;
      if (filesProcessed == config.css.length) {
       callback(null, "b64");
      }
     }
   });  
  })(inCSS);
 }
}

function concatTemplates(callback){ 
 if (!config.extension.html || config.html.length == 0 || config.mode === "test") {
  callback(null, "concatTemplates");
  return;
 }
 console.log("Concatenating HTML...");
 var content = [];
 for ( var f=0, F=config.html.length;f<F; f++ ) {
  var data = fs.readFileSync(config.html[f], "utf8").replace(/[\r\n\t]/g,"");
  content.push(
   "iris.tmpl('"
   + config.html[f].replace(config.pathBase, "")
   +"','"
   + data.replace(/\'/g, "\\\'")
   + "');\n"
   );
 }

 fs.appendFile(
  config.outputFile,
  content.join(""),
  function(err) {
   if(err) {
    callback(err, "concatTemplates");
   } else {
    globalStats.html.outputSize = fs.statSync(config.outputFile).size - globalStats.js.outputSize;
    callback(null, "concatTemplates");
   }
  }
  );	
}
 
function deleteFiles(callback) {
 if (config.mode === "test" || !config.deleteInputs) {
  callback(null, "deleteFiles");
  return;
 }
 console.log("Removing files...");
 for (var ext in config.extension) {
  if (ext) {
   for (var i = 0 ; i < config[ext].length; i++) {
    var file = config[ext][i];
    console.log("Removing " + file + "...");
    fs.unlinkSync(file);
   }
  }
 }
 callback(null, "deleteFiles");
  
  
} 

function calculateInputStats(item) {
 for (var i = 0; i < config[item].length; i++) {
  globalStats[item].numFiles++;
  globalStats[item].inputSize += fs.statSync(config[item][i]).size;
 }
}


function printResults(callback) {
 globalStats.total.numFiles = globalStats.js.numFiles + globalStats.html.numFiles + globalStats.css.numFiles;
 globalStats.total.inputSize = globalStats.js.inputSize + globalStats.html.inputSize + globalStats.css.inputSize;
 if (config.mode != "test") {
  globalStats.total.outputSize = fs.statSync(config.outputFile).size + globalStats.css.outputSize;
 }
 
 for (item in globalStats) {
  globalStats[item].compression = globalStats[item].compression();
  if (globalStats[item].compression === "NaN%" || config.mode === "test" || (!config.extension[item] && item != "total") ) {
   globalStats[item].compression = "0%";
  }
 }
 
 console.log("***************************************************************************************");
 console.log("STATS = " + util.inspect(globalStats));
 console.log("***************************************************************************************");
 console.log("\nthe file was saved in " + config.outputFile);
 callback(null, "printResults");
}

init();
