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
	var lines = page.split(/\r\n|\r|\n/g),
		vars = {
			"bracketCount": 1,
			"groupStageCount": 1,
			"data": {}
		};

	parseBracket(lines, vars);
	console.log("done");
	parseGroupStage(lines, vars);
	console.log("done");
	console.log("vars:", vars);
};

var parseBracket = function(lines, vars){
	var DE;
	var numPlayers;
	var result;
	var bracketRE = /{{(.*)bracket$/i;
	var inBracket = false,
		race;

	console.log("we're parsing brackets");

	for(i in lines){
		//if we're in a bracket
		if(bracketRE.test(lines[i])){
			inBracket = true;
			result = bracketRE.exec(lines[i]);
			//check if its a standard bracket
			if(/(\d+)(S|D)E/i.test(result[1])){
				result = /(\d+)(S|D)E/.exec(result[1]);
				DE = result[2] === 'D';
				numPlayers = result[1];
			}
		}

		if(inBracket){
			if(/\|R(\d+)(D|W)(\d+)race=([ztpr])/i.test(lines[i])){
				result = /\|R(\d+)(D|W)(\d+)race=([ztpr])/i.exec(lines[i]);	
				console.log("Found Round " + result[1] + " " + result[2] + result[3] + " race: " + result[4]);
				if(vars.data["Round " + result[1]] === undefined){
					vars.data["Round " + result[1]] = {"p": 0, "t": 0, "z": 0, "r": 0};
				}
				vars.data["Round " + result[1]][result[4]]++;
			}
		}
		if(/{{:(.*)}}/.test(lines[i])){
			result = /{{:(.*)}}/.exec(lines[i]);
			console.log("found link: ");
			console.log(result[1]);
		}

	}
};

var parseGroupStage = function(lines, vars) {
	var inGroupStage = false,
		groupStageHeadingLevel = 0,
		inGroupTable = false,
		result,
		race;
	
	for(i in lines){
		// If we are in a group stage section, look for a heading that could close this section
		if(inGroupStage && /^(=+).*=+$/.test(lines[i])){
			result = /^(=+).*=+$/.exec(lines[i]);
			// Close the current group stage if section ends
			// (new heading with at same level, or level closer to 1)
			if(result[1].match(/=/g).length <= groupStageHeadingLevel){
				vars.groupStageCount++;
				inGroupStage = false;
				groupStageHeadingLevel = 0;
			}
		}
		// Look for a Group Stage heading (not mandatory)
		if(/^(=+)[\s]*Group Stage.*=+$/i.test(lines[i])) {
			result = /^(=+)[\s]*Group Stage.*=+$/i.exec(lines[i]);
			inGroupStage = true;
			groupStageHeadingLevel = result[1].match(/=/g).length;
			vars.data["Group Stage " + vars.groupStageCount] = {"p": 0, "t": 0, "z": 0, "r": 0};
		}
		// Look for a GroupTableStart line
		if(/\{\{(Template:)?GroupTableStart/i.test(lines[i])) {
			inGroupTable = true;
		}
		if(inGroupTable){
			if(/\{\{(Template\:)*GroupTableSlot[\s]?\|(.*)race=([ztpr])/i.test(lines[i])) {
				result = /\{\{(Template\:)*GroupTableSlot[\s]*\|.*race=([ztpr])/i.exec(lines[i]);
				race = result[2].toLowerCase();
				console.log("Found in Group Stage " + vars.groupStageCount + " race:", race);
				vars.data["Group Stage " + vars.groupStageCount][race]++;
			}
		}
	}
};

var genOut = function(data){
	var cum = '';
	var line = '';
	for(key in data){
		line += "{{RaceDist|title=";
		line += key.replace(/ /g, "&nbsp;");
		line += "|protoss=";
		line += data.key.p;
		line += "|terran=";
		line += data.key.t;
		line += "|protoss=";
		line += data.key.z;
		line += "|nyd=";
		line += data.key.p + data.key.t + data.key.p;
		line += "}}";
		cum += line;
	}

	console.log(cum);
}

module.exports.getPageData = getPageData;
module.exports.parsePage = parsePage;