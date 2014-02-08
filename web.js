

//things I need for node
var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var app = express();

//importing my own functions
var parser = require('./parser.js');
var fragments = require('./fragments.js');

app.use(logfmt.requestLogger());

app.configure(function() {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger("short"));
});

app.get('/', function(req, res) {
    res.sendfile("index.html");
});

app.get('/BracketDistTool', function(req,res) {
    res.sendfile("distTool.html");
});

app.post('/BracketDistTool', function(req,res) {
    parser.getPageData(req.body.page, function(page){
	var code = '';
	console.log("we're in a callback!");
	if(page.query.pages != undefined){
	    for(i in page.query.pages){
		code = parser.parsePage(page.query.pages[i].revisions[0]['*']);
	    }
	    res.send(fragments.codeHeader + "<p>Table for: " + req.body.page + "</p><div class=\"well\">" +  code + "</div>" + fragments.codeFooter);
	}else{
	    res.send("error, incorrect input, please go back and try again");
	}
    }); 
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
