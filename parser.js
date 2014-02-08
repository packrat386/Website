var http = require('http');

var getPageData = function(title, callback){
    //this is the link format
    var link = "/starcraft2/api.php?format=json&action=query&titles="+ title + "&prop=revisions&rvprop=content";
    
    //here we have the variable we're going to run the callback on
    var holder;
    
    //these are the options for the http request
    var options = {
	host: 'wiki.teamliquid.net',
	port: 80,
	path: link
    };

    //do a get request
    http.get(options, function(resp){
	var output = '';

	//put together the output
	resp.on('data', function(chunk){
	    output += chunk;
	});

	//when we're at the end, put the object together and store it
	resp.on('end', function(){
	    holder = JSON.parse(output);
	    //console.log("In end function");
	    //console.log(resp.statusCode);
	    //console.log(holder);
	    
	    callback(holder);
	});
    });
};

module.exports.getPageData = getPageData;