var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static("app"));

// Content root
app.get("/", function(request, response) {
	console.log("html");
	fs.readFile("./app/index.html", function(err, html) {
		if(err) {
			response.writeHead(500, {"Content-Type": "text/html"});
			response.end(err);
			return;
		}

		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(html);
	});
});

app.listen(8082);
console.log("Listening on localhost:8082");