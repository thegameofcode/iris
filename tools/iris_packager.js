var fs = require('fs'),
compressor = require('node-minify'),
extend = require('node.extend'),
fileset = require('fileset'),
util = require('util'),
path = require('path'),
async = require('async'),
b64img = require('css-b64-images');

var config = {
 html: [],
 js: [],
 css: [],
 outputPath: "",
 outputFile: "",
 initJs: "",
 appPath: ".",
 irisBaseUri: "/",
 inputPaths: [],
 excludePaths: [],
 extension: {
  html: true,
  js: true,
  css: true
 },
 outputPath: "",
 cssSuffix:"",
 mode: "",
 deleteInputs: true,
 base64images: false
};

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

 var params = {};

 process.argv.forEach(
  function (val, index, array) {
   var pos = val.indexOf("=");
   if (pos != -1) {
    var name = val.substring(0, pos);
    var value = val.substring(pos + 1);
    params[name] = value;
   }
  });

 
 if ( params["input"] !== undefined ) {
  config.inputPaths = params["input"].split(",");
 }
  
 if (config.inputPaths.length === 0) {
  config.inputPaths.push(path.normalize("."));
 }
  
 if ( params["exclude"] !== undefined ) {
  config.excludePaths = params["exclude"].split(",");
 }
   
 if ( params["ext"] !== undefined ) {
  config.extension = (function toObject(arr) {
   var rv = {};
   for (var i = 0; i < arr.length; ++i)
    rv[arr[i]] = true;
   return rv;
  })(params["ext"].split(","));
 }
 
 if ( params["minCss"] !== undefined ) {
  config.extension.css = params["minCss"].toLowerCase() === "true";
 }
   
 if ( params["minHtml"] !== undefined ) {
  config.extension.css = params["minHtml"].toLowerCase() === "true";
 }
   
 if ( params["minJs"] !== undefined ) {
  config.extension.css = params["minJs"].toLowerCase() === "true";
 }
   
 if ( params["output"] !== undefined ) {
  config.outputPath = params["output"];
  config.outputFile = "";
 }

 if ( params["appPath"] !== undefined ) {
  config.appPath = params["appPath"];    
 }
   
 if ( params["init"] !== undefined ) {
  config.initJs = createPath(config.appPath, params["init"]);    
 }
   
 if ( params["irisBaseUri"] !== undefined ) {
  config.irisBaseUri = params["irisBaseUri"];
 }
   
 if ( params["cssSuffix"] !== undefined ) {
  config.cssSuffix = params["cssSuffix"];
 }
   
 if ( params["mode"] !== undefined ) {
  config.mode = params["mode"];
 }
   
 if ( params["delete"] !== undefined ) {
  config.deleteInputs = params["delete"].toLowerCase() === "true";
 }

 if ( params["b64"] !== undefined ) {
  config.base64images = params["b64"].toLowerCase() === "true";
 }
  
 if ( !config.inputPaths ) {
 //throw "you must specify the parameter input=path_to_directory/,path_to_file...";
 //}
 
 if ( !config.outputPath && !config.outputFile ) {
  config.outputFile = config.initJs;
 }

 if ( !config.initJs ) {
  throw "you must specify the parameter init=path/file.js";
 }

 if (!config.outputFile) {
  if (fs.existsSync(config.outputPath) && fs.statSync(config.outputPath).isDirectory()) {
   config.outputFile = validatePath(config.outputPath) + config.initJs.match(/[^\/]+\.js$/);
  } else {
   config.outputFile = config.outputPath;
  }
 }
 
 var aux = config.initJs;
 if (config.mode !== "test" && config.initJs === config.outputFile) {
  aux = createPath(path.dirname(config.outputFile), "aux.js");
  fs.createReadStream(config.initJs).pipe(fs.createWriteStream(aux));
 }
 
 config.js.push(path.normalize(aux));
 console.log("***************************************************************************************"); 
 console.log("config = " + util.inspect(config));
 console.log("***************************************************************************************");
 
 var includes = "";
 var excludes = "";
 if (config.inputPaths.length > 0) {
  for (var i = 0; i < config.inputPaths.length; i++) {
   config.inputPaths[i] = createPath(config.appPath, config.inputPaths[i]);
  }
  includes = config.inputPaths.join(" ");
  if (config.excludePaths.length > 0) {
   for (i = 0; i < config.excludePaths.length; i++) {
    config.excludePaths[i] = createPath(config.appPath, config.excludePaths[i]);
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

function createPath () {
 var finalPath = "";
 for (var i = 0; i < arguments.length; i++) {
  if (finalPath !== "" && arguments[i] !== "" && finalPath.charAt(finalPath.length - 1) !== "/" && arguments[i].charAt(0) !== "/") {
   finalPath += "/";
  }
  finalPath += arguments[i];
 }
 //finalPath = finalPath.replace(/\/{2,}/g, "/");
 finalPath = path.normalize(finalPath);
 return finalPath;
}

function validatePath (path) {
 if ( path.substr(-1) !== "/" ) {
  path = path + "/";
 }
 return path;
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

 if ( file === config.initJs ) {
  return;
 }
 
 var ext = path.extname(file).replace(".","");
 var duplicate = false;
 
 if (ext === "html" || ext === "js" || ext === "css") {

  for (var i = 0; i < config[ext].length; i++) {
   if (path.resolve(config[ext][i]) === path.resolve(file)) {
    console.log("duplicate " + ext + " '" + file + "'...");
    duplicate = true;
   }
  }
  
  if (!duplicate) {
   console.log("found " + ext + " '" + file + "'...");
   config[ext].push(path.normalize(file));
  }
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
  },
  function(callback) {
   printResults(callback);
  }
  ],
  function(err, results) {
   if (err) {
    console.log("Error: " + err);
   }
  });
}

function minifyJs(callback) {
 if (!config.extension.js || config.js.length === 0 || config.mode === "test") {
  callback(null, "minifyJs");
  return;
 }
 console.log("Minimizing JS...");
 
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
 if (!config.extension.css || config.css.length === 0 || config.mode === "test") {
  callback(null, "minifyCSS");
  return;
 }
 console.log("Minimizing CSS config.css[" + config.css + "]...");
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
 if (config.css.length == 0 || config.mode === "test" || !config.base64images) {
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
 if (!config.extension.html || config.html.length === 0 || config.mode === "test") {
  callback(null, "concatTemplates");
  return;
 }
 console.log("Concatenating HTML...");
 var content = [];
 for ( var f=0, F=config.html.length;f<F; f++ ) {
  var data = fs.readFileSync(config.html[f], "utf8").replace(/[\r\n\t]/g,"");
  content.push(
   "iris.tmpl('"
   + config.html[f].replace(createPath(config.appPath, config.irisBaseUri) , "")
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
    if (ext !== "css" || config.cssSuffix !== "") {
     var file = config[ext][i];
     console.log("Removing " + file + "...");
     fs.unlinkSync(file);
    }
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
