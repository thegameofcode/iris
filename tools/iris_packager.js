/*

Dependencies:

	npm install node-minify

*/

var fs = require('fs'),
	compressor = require('node-minify'),
	irisFilePath   = "",
	irisOutputFile = "",
	path = null,
	promises = 0,
	html = [],
	js = [];


process.argv.forEach(
	function (val, index, array) {
		var paramInput = "path=";
		var paramOutput = "output=";
		var idx;

		idx = val.indexOf(paramInput);
  		if ( idx>-1 ) {
  			irisFilePath = val.substring( idx+paramInput.length );
  		}

		idx = val.indexOf(paramOutput);
  		if ( idx>-1 ) {
  			irisOutputFile = val.substring( idx+paramOutput.length );
  		}
	}
);

if ( !irisOutputFile ) {
	console.error("you must specify the parameter output=./myoutputfile.js");
}

if ( !irisFilePath ) {
	console.error("you must specify the parameter path=./mypathfile.js");
}

console.log("loading...", irisFilePath);

fs.readFile(
	irisFilePath
	, "utf8"
	, function(err, data) {
    	if(err) { 
    		console.error("not found valid json file in the path '" + irisFilePath + "'");
    	}
    	path = JSON.parse(data);
    	searchTree(path);
    	processPromises();
	}
);

function searchTree(p_node){
	for ( var name in p_node ) {
		searchNode(p_node[name]);
	}	
}

function searchNode(p_node){
	if ( typeof p_node === "string" ) {
		addPromise(p_node);
	}
	else if ( typeof p_node === "object" ) {
		searchTree(p_node);
	}
}

function checkPromises(){
	if (  promises === html.length ) {
		compressJs();
	}
}

function processPromises(){
	for ( var f=0, F=html.length;f<F; f++ ) {
		html[f].call(f);
	}
}
function addPromise(p_path){
	if ( p_path.indexOf(".html") > -1 ) {
		html.push( { path : p_path, content : "", call : callPromise } );
	}
	else {
		js.push(p_path);
	} 
}

function callPromise(p_idx){
	fs.readFile(
		html[p_idx].path
		, "utf8"
		, function(err, data) {
	    	if(err) { 
	    		console.error("error loading path");
	    	}
	    	html[p_idx].content    =  data.replace(/\n/g,"").replace(/\t/g, "");
	    	html[p_idx].contentMin =  data;
	    	promises++;
	    	checkPromises();
		}
	);
}

function compressJs () {

	// Using Google Closure
	new compressor.minify({
	    type: 'gcc',
	    fileIn: js,
	    fileOut: irisOutputFile,
	    callback: function(err){
	    	if ( err ) {
	        	console.error(err);
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
			+ html[f].path
			+"','"
			+ html[f].content.replace(/\'/g, "\\\'")
			+ "');\n"
		);
	}

	fs.appendFile(
		irisOutputFile,
		content.join(""),
		function(err) {
    		if(err) {
	        	console.error(err);
	    	} 
	    	else {
	    		console.log("the file was saved in " + irisOutputFile);
	    	}
		}
	);
}
