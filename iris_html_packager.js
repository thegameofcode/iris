var cluster = require('cluster')
,	cpuCount= require('os').cpus().length
,	util 	= require("util")
,	http 	= require("http")
,	url 	= require('url')
,	fs 		= require('fs')
,	Q 		= require('q')
;

var irisFilePath   = ""; 
var irisOutputFile = ""; 

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

if ( irisFilePath && irisOutputFile ) {
console.log("loading...", irisFilePath);
	var path = null;
	fs.readFile(
		irisFilePath
		, "utf8"
		, function(err, data) {
	    	if(err) { 
	    		console.error("not found valid json file in the path '"+irisFilePath+"'");
	    		return; 
	    	}
	    	path = JSON.parse(data);
	    	searchTree(path);
	    	processPromises();
		}
	);
}
else {
	console.error("you must specify the parameter path=./mypathfile.js");
}


var html = [];

var promises = 0;
function addPromise(p_path){
	html.push( { path : p_path, content : "", call : callPromise } );
}

function callPromise(p_idx){
	fs.readFile(
		html[p_idx].path
		, "utf8"
		, function(err, data) {
	    	if(err) { 
	    		console.error("error loading path");
	    		return; 
	    	}
	    	html[p_idx].content    =  data.replace(/\n/g,"").replace(/\t/g, "");
	    	html[p_idx].contentMin =  data;
	    	promises++;
	    	checkPromises();
		}
	);
}

function processPromises(){
	for ( var f=0, F=html.length;f<F; f++ ) {
		html[f].call(f);
	}
}

function searchTree(p_node){
	for ( var name in p_node ) {
		searchNode(p_node[name]);
	}	
}

function searchNode(p_node){
	if ( typeof p_node === "string" ) {
		if ( p_node.indexOf(".html") > -1 ) {
			addPromise( p_node );
		}
		else {
			return false;
		} 
	}
	else if ( typeof p_node === "object" ) {
		searchTree(p_node);
	}
}

function checkPromises(){
	if (  promises === html.length ) {
		createFile();
	}
}

function createFile(){
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

	fs.writeFile(
		irisOutputFile
		, content.join("")
		, function(err) {
    		if(err) {
	        	console.log(err);
	    	} 
	    	else {
	        	console.log("The file was saved in "+irisOutputFile);
	    	}
		}
	);
}




