// From http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
var HTTP_STATUS_MESSAGES = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported"
};

var mimeType = {
  ".js"   : "text/javascript"
, ".css"  : "text/css"
, ".html" : "text/html"
, ".jpg"  : "image/jpg"
, ".png"  : "image/png"
, ".ico"  : "image/vnd.microsoft.icon"
}

var port = 8081;

var fs   = require('fs');
var url  = require("url");

require('http').createServer(function (request, response) {

  if ( request.url.indexOf("/echo") == 0 ) {

    var json = { method : request.method, url : request.url };

    response.writeHead(200, HTTP_STATUS_MESSAGES[200], { 'Content-Type': 'application/json', 'Cache-Control' : 'no-cache' });

    if ( request.method == "POST" || request.method == "PUT" || request.method == "PATCH" ) {

      request.on('data', function (chunk) {
        json.data = chunk.toString();
        response.end( JSON.stringify(json) );
      });

    } else {
      response.end( JSON.stringify(json) );
    }

  } else {

    var pathname = url.parse(request.url).pathname;
    if ( !pathname || pathname=="/" || pathname.length<3) {
      response.writeHead(302, {
        'Location': "test/iris.html"
      });
      response.end();
    }
    var ext = pathname.lastIndexOf(".")>-1 ? pathname.substring( pathname.lastIndexOf(".") ) : "";

    response.writeHead(200, HTTP_STATUS_MESSAGES[200], {'Content-Type': mimeType[ext]});
    try {
      
      fs.readFile(
         "./" + pathname
        , function(p_err, p_data) {
            if ( p_err ) {
                response.writeHead(404, HTTP_STATUS_MESSAGES[404]);
                response.end();
            } else {
                response.end( p_data );
            }
        }
      );

    } catch(p_err){
      console.log("Error");
    }
  }

  

}).listen(port);

console.log('Server running at http://localhost:' + port + '/');
