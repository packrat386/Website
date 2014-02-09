

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
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.logger("short"));
    app.use(require('stylus').middleware(__dirname + 'public'));
});

app.get('/', function(req, res) {
    res.render('index', {
	title: 'index'
    });
});

app.get('/BracketDistTool', function(req,res) {
    res.render('bracketDistTool', {
	title: 'bracketDistTool',
    });
});

app.post('/BracketDistTool', function(req,res) {
    if(/wiki.teamliquid.net\/starcraft2\/(.*)/.test(req.body.page)){
	var result = /wiki.teamliquid.net\/starcraft2\/(.*)/.exec(req.body.page);
	var pageTitle = result[1];
	console.log(pageTitle);
	parser.getPageData(pageTitle, function(page){
	    var code = '';
	    console.log("we're in a callback!");
	    if(page.query.pages != undefined){
		for(i in page.query.pages){
		    if(page.query.pages[i].revisions != undefined){
			code = parser.parsePage(page.query.pages[i].revisions[0]['*']);
			res.render('distToolOut', {
			    title: pageTitle,
			    output: code 
			});
		    }else{
			res.render('bracketDistTool', {
			    title: 'bracketDistTool',
			    errorMsg: 'There was an error in your input, please try again' 
			});
		    }
		}
	    }	    
	}); 
    }
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
