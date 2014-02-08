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

var parsePage = function(page){
    //first we split it into an array called lines
    var lines = page.split(/\r\n|\r|\n/g);
    var count = 1;
    var inBracket = false;
    var DE; 
    var numPlayers;
    var result;
    var data = {};

    for(i in lines){
	//if we're in a bracket
	if(/{{(.*)bracket$/i.test(lines[i])){
	    inBracket = true;
	    result = /{{(.*)bracket$/i.exec(lines[i]);
	    //check if its a standard bracket
	    if(/(\d+)(S|D)E/i.test(result[1]){
		result = /(\d+)(S|D)E/.exec(result[1]);
		if(result[2] != 'D'){
		    DE = false;
		}else{
		    DE = true;
		}
		numPlayers = result[1];
	    }
	}
	if(inBracket){
	    if(/\|R(\d+)(D|W)(\d+)race=([ztpr])/i.test(lines[i])){
		result = /\|R(\d+)(D|W)\d+race=([ztpr])/i.exec(lines[i]);	
		console.log("Found Round " + result[1] + " " + result[2] + result[3] + " race: " + result[4]);
	    }
	}
	if(/{{:(.*)}}/.test(lines[i])){
	    result = /{{:(.*)}}/.exec(lines[i]);
	    console.log("found link: ");
	    console.log(result[1]);
	}
    }
}
	
module.exports.getPageData = getPageData;
module.exports.parsePage = parsePage;