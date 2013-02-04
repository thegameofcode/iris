
var fs = require('fs');
var compressor = require('node-minify');

var html = [];
var js = [];
var outputFile;
var initJs;
var pathBase = "";

function init () {
	var inputPath, outputPath;

	process.argv.forEach(
		function (val, index, array) {
			var param;

			param = getParam("input=", val);
			if ( param !== null ) {
				inputPath = param;
				console.log("inputPath=" + inputPath);
			}

			param = getParam("output=", val);
			if ( param !== null ) {
				outputPath = param;
				console.log("outputPath=" + outputPath);
			}

			param = getParam("init=", val);
			if ( param !== null ) {
				initJs = param;
				console.log("initJs=" + initJs);
			}

			param = getParam("base=", val);
			if ( param !== null ) {
				pathBase = param;
				console.log("pathBase=" + pathBase);
			}
		}
	);


	if ( !inputPath ) {
		throw "you must specify the parameter input=path/";
	}

	if ( !outputPath ) {
		throw "you must specify the parameter output=path/";
	}

	if ( !initJs ) {
		throw "you must specify the parameter init=file.js";
	}

	outputFile = outputPath + initJs.match(/[^/]+\.js$/);

	js.push(initJs);

	var initPath = pathBase + inputPath;
	console.log("scanning '" + initPath + "'...");
	scanPath(initPath);
	generateOutput();
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

	 	if ( file.substr(-5) === '.html' ) {
			console.log("found js '" + fullPath + "'...");
	 		var content = fs.readFileSync(fullPath, "utf8").replace(/[\r\n\t]/g,"");
	 		html.push({path : path + file, content : content});

	 	} else if ( file.substr(-3) === '.js' ) {
			console.log("found html '" + fullPath + "'...");
	 		js.push(fullPath)

	 	} else if ( fullPath.indexOf(".") === -1 ) {
			console.log("found dir '" + fullPath + "'...");
	 		scanPath(fullPath + "/");
	 	}
	});
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
			"iris.tmpl('"
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
