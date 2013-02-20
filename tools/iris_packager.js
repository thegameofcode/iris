
var fs = require('fs');
var compressor = require('node-minify');

var html = [];
var js = [];
var outputFile;
var initJs;
var pathBase = "";

function init () {
 var inputPaths, outputPath;

 process.argv.forEach(
  function (val, index, array) {
   var param;

   param = getParam("input=", val);
   if ( param !== null ) {
    inputPaths = param.split(",");
   }

   param = getParam("output=", val);
   if ( param !== null ) {
    outputPath = param;
   }

   param = getParam("init=", val);
   if ( param !== null ) {
    initJs = param;
   }

   param = getParam("base=", val);
   if ( param !== null ) {
    pathBase = param;
   }
  }
  );

 if ( !inputPaths ) {
  throw "you must specify the parameter input=path_to_directory/,path_to_file...";
 }
 
 if ( !outputPath ) {
  throw "you must specify the parameter output=path/";
 }

 if ( !initJs ) {
  throw "you must specify the parameter init=path/file.js";
 }

 if (fs.existsSync(outputPath) && fs.statSync(outputPath).isDirectory()) {
  outputFile = validatePath(outputPath) + initJs.match(/[^/]+\.js$/);
 } else {
  outputFile = outputPath;
 }
 
 js.push(initJs);
 
 var numInputPathsProccessed = 0
 for (var i = 0; i < inputPaths.length; i++) {
  var initPath = pathBase + inputPaths[i];
  console.log("scanning '" + initPath + "'...");
  (function(path) {
   fs.stat(path, function(err, stats) {
    if (err) throw err;
    if (stats.isFile()) {
     scanFile(path);
    } else {
     scanPath(validatePath(path));
    }
    numInputPathsProccessed++;
    if (numInputPathsProccessed === inputPaths.length) {
     generateOutput();
    }
   }); 
  })(initPath);
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
 if ( file.substr(-5) === '.html' ) {
  console.log("found html '" + file + "'...");
  var content = fs.readFileSync(file, "utf8").replace(/[\r\n\t]/g,"");
  html.push({
   path : file, 
   content : content
  });

 } else if ( file.substr(-3) === '.js' ) {
  console.log("found js '" + file + "'...");
  js.push(file)

 }
}

function generateOutput () {

 // Compress using Google Closure
 new compressor.minify({
  type: 'gcc',
  fileIn: js,
  fileOut: outputFile,
  callback: function(err){
   if ( err ) {
    throw err;
   } else {
    concatTemplates();
   }
  }
 });
}

function concatTemplates(){
 var content = [];
 for ( var f=0, F=html.length;f<F; f++ ) {
  content.push(
   "iris.Tmpl('"
   + html[f].path.replace(pathBase, "")
   +"','"
   + html[f].content.replace(/\'/g, "\\\'")
   + "');\n"
   );
 }

 fs.appendFile(
  outputFile,
  content.join(""),
  function(err) {
   if(err) {
    console.error(err);
   } 
   else {
    console.log("the file was saved in " + outputFile);
   }
  }
  );	
}

init();
