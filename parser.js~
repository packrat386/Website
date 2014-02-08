var http = require('http');

var getPageData = function(var title){
    var link = "/starcraft2/api.php?format=json&action=query&titles="+ title + "&prop=revisions&rvprop=content";
    var options = {
	host: 'wiki.teamliquid.net',
	port: 80,
	path: link
    };

    http.get(options, function(resp){
	console.log(resp);
    });
};