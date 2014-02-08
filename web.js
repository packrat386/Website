

//things I need for node
var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var app = express();

//importing my own functions
var parser = require('./parser.js');

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
	console.log("we're in a callback!");
	for(i in page.query.pages){
	    console.log(page.query.pages[i].revisions[0]['*']);
	}
    }); 
    res.send("you requested: " + req.body.page);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
