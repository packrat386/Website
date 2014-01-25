
// web.js
var express = require("express");
var logfmt = require("logfmt");
var path = require("path");
var app = express();

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

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});