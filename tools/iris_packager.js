
var fs = require('fs');
var compressor = require('node-minify');
var extend = require('node.extend');
var fileset = require('fileset');
var util = require('util');
var path = require('path');

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
  css: true
 },
 outputPath: "",
 cssSuffix:"-min"
}

var globalStats = {
 js: {
  numFiles: 0,
  inputSize: 0,
  outputSize: 0,
  compression: 0
 }, 
 html: {
  numFiles: 0,
  inputSize: 0,
  outputSize: 0,
  compression: 0
 },
 css: {
  numFiles: 0,
  inputSize: 0,
  outputSize: 0,
  compression: 0
 },
 total: {
  numFiles: 0,
  inputSize: 0,
  outputSize: 0,
  compression: 0
 }
};

var file_config = null;
if (fs.existsSync("iris_packager.json") && fs.statSync("iris_packager.json").isFile()) {
 file_config = fs.readFileSync("iris_packager.json");
 config = extend(true, config, JSON.parse(file_config));
}

function init () {
 
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
   console.log("Gerenating output. Wait please...");
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
 if (config.extension.html && file.substr(-5) === '.html' ) {
  console.log("found html '" + file + "'...");
  globalStats.html.numFiles++;
  globalStats.html.inputSize += fs.statSync(file).size;
  var content = fs.readFileSync(file, "utf8").replace(/[\r\n\t]/g,"");
  config.html.push({
   path : file, 
   content : content
  });

 } else if (config.extension.js && file.substr(-3) === '.js' ) {
  console.log("found js '" + file + "'...");
  config.js.push(file);
 } else if ( config.extension.css && file.substr(-4) === '.css' ) {
  console.log("found css '" + file + "'...");
  config.css.push(file);
 }
}

function generateOutput () {

 for ( var i = 0; i < config.js.length; i++) {
  globalStats.js.numFiles++;
  globalStats.js.inputSize += fs.statSync(config.js[i]).size;
 }
 // Compress using Google Closure
 new compressor.minify({
  type: 'gcc',
  fileIn: config.js,
  fileOut: config.outputFile,
  callback: function(err){
   if ( err ) {
    throw err;
   } else {
    globalStats.js.outputSize += fs.statSync(this.fileOut).size;
    globalStats.js.compression = parseInt((globalStats.js.inputSize - globalStats.js.outputSize) / globalStats.js.inputSize * 100) + "%";
    minifyCSS();
   }
  }
 });
}

function minifyCSS() {
 var filesProcessed = 0;
 for ( var f=0, F=config.css.length;f<F; f++ ) {
  var inCSS = config.css[f];
  globalStats.css.inputSize += fs.statSync(inCSS).size;
  (function (fileIn) {
   var outCSS = path.dirname(fileIn) + "/" + path.basename(fileIn, ".css") + config.cssSuffix + ".css";
   new compressor.minify({
    type: 'yui-css',
    fileIn: fileIn,
    fileOut: outCSS,
    callback: function(err){
     filesProcessed++;
     globalStats.css.outputSize += fs.statSync(outCSS).size;
     globalStats.css.compression = parseInt((globalStats.css.inputSize- globalStats.css.outputSize) / globalStats.css.inputSize * 100) + "%";
     if (filesProcessed == config.css.length) {
      globalStats.css.numFiles = filesProcessed;
      concatTemplates();
     }
    }
   });  
  })(inCSS);
 }
}

function concatTemplates(){
 var content = [];
 for ( var f=0, F=config.html.length;f<F; f++ ) {
  content.push(
   "iris.tmpl('"
   + config.html[f].path.replace(config.pathBase, "")
   +"','"
   + config.html[f].content.replace(/\'/g, "\\\'")
   + "');\n"
   );
 }

 fs.appendFile(
  config.outputFile,
  content.join(""),
  function(err) {
   if(err) {
    console.error(err);
   } 
   else {
    globalStats.html.outputSize = fs.statSync(config.outputFile).size - globalStats.js.outputSize;
    globalStats.html.compression = parseInt((globalStats.html.inputSize- globalStats.html.outputSize) / globalStats.html.inputSize * 100) + "%";
    globalStats.total.numFiles = globalStats.js.numFiles + globalStats.html.numFiles + globalStats.css.numFiles;
    globalStats.total.inputSize = globalStats.js.inputSize + globalStats.html.inputSize + globalStats.css.inputSize;
    globalStats.total.outputSize = fs.statSync(config.outputFile).size + globalStats.css.outputSize;
    globalStats.total.compression = parseInt((globalStats.total.inputSize- globalStats.total.outputSize) / globalStats.total.inputSize * 100) + "%";
    console.log("***************************************************************************************");
    console.log("STATS = " + util.inspect(globalStats));
    console.log("***************************************************************************************");
    console.log("\nthe file was saved in " + config.outputFile);
   }
  }
  );	
}

init();
