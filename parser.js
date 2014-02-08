var http = require('http');

var bracketRaceDistributionsMap = {
    '2SEBracket': {'Round 1': ['R1D1', 'R1D2']},
    '4SEBracket': {'Semifinals': ['R1D1', 'R1D2', 'R1D3', 'R1D4'], 'Finals': ['R2W1', 'R2W2']},
    '8SEBracket': {
	'Quarterfinals': ['R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8'],
	'Semifinals': ['R2W1', 'R2W2', 'R2W3', 'R2W4'],
	'Finals': ['R3W1', 'R3W2']
    },
    '16SEBracket': {
	'Round of 16': ['R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8', 'R1D9', 'R1D10', 'R1D11', 'R1D12', 'R1D13', 'R1D14', 'R1D15', 'R1D16'],
	'Quarterfinals': ['R2D1', 'R2D2', 'R2D3', 'R2D4', 'R2D5', 'R2D6', 'R2D7', 'R2D8'],
	'Semifinals': ['R3W1', 'R3W2', 'R3W3', 'R3W4'],
	'Finals': ['R4W1', 'R4W2']
    },
    '32SEBracket': {
	'Round of 32': [
	    'R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8', 'R1D9', 'R1D10', 'R1D11', 'R1D12', 'R1D13', 'R1D14', 'R1D15', 'R1D16',
	    'R1D17', 'R1D18', 'R1D19', 'R1D20', 'R1D21', 'R1D22', 'R1D23', 'R1D24', 'R1D25', 'R1D26', 'R1D27', 'R1D28', 'R1D29', 'R1D30', 'R1D31', 'R1D32'
	],
	'Round of 16': ['R2W1', 'R2W2', 'R2W3', 'R2W4', 'R2W5', 'R2W6', 'R2W7', 'R2W8', 'R2W9', 'R2W10', 'R2W11', 'R2W12', 'R2W13', 'R2W14', 'R2W15', 'R2W16'],
	'Quarterfinals': ['R3W1', 'R3W2', 'R3W3', 'R3W4', 'R3W5', 'R3W6', 'R3W7', 'R3W8'],
	'Semifinals': ['R4W1', 'R4W2', 'R4W3', 'R4W4'],
	'Finals': ['R5W1', 'R5W2']
    },
    '64SEBracket': {
	'Round of 64': [
	    'R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8', 'R1D9', 'R1D10', 'R1D11', 'R1D12', 'R1D13', 'R1D14', 'R1D15', 'R1D16',
	    'R1D17', 'R1D18', 'R1D19', 'R1D20', 'R1D21', 'R1D22', 'R1D23', 'R1D24', 'R1D25', 'R1D26', 'R1D27', 'R1D28', 'R1D29', 'R1D30', 'R1D31', 'R1D32',
	    'R1D33', 'R1D34', 'R1D35', 'R1D36', 'R1D37', 'R1D38', 'R1D39', 'R1D40', 'R1D41', 'R1D42', 'R1D43', 'R1D44', 'R1D45', 'R1D46', 'R1D47', 'R1D48',
	    'R1D49', 'R1D50', 'R1D51', 'R1D52', 'R1D53', 'R1D54', 'R1D55', 'R1D56', 'R1D57', 'R1D58', 'R1D59', 'R1D60', 'R1D61', 'R1D62'
	],
	'Round of 32': [
	    'R2W1', 'R2W2', 'R2W3', 'R2W4', 'R2W5', 'R2W6', 'R2W7', 'R2W8', 'R2W9', 'R2W10', 'R2W11', 'R2W12', 'R2W13', 'R2W14', 'R2W15', 'R2W16',
	    'R2W17', 'R2W18', 'R2W19', 'R2W20', 'R2W21', 'R2W22', 'R2W23', 'R2W24', 'R2W25', 'R2W26', 'R2W27', 'R2W28', 'R2W29', 'R2W30', 'R2W31', 'R2W32'
	],
	'Round of 16': ['R3W1', 'R3W2', 'R3W3', 'R3W4', 'R3W5', 'R3W6', 'R3W7', 'R3W8', 'R3W9', 'R3W10', 'R3W11', 'R3W12', 'R3W13', 'R3W14', 'R3W15', 'R3W16'],
	'Quarterfinals': ['R4W1', 'R4W2', 'R4W3', 'R4W4', 'R4W5', 'R4W6', 'R4W7', 'R4W8'],
	'Semifinals': ['R5W1', 'R5W2', 'R5W3', 'R5W4'],
	'Finals': ['R6W1', 'R6W2']
    },
    '4DEBracket': {
	'Round of 4': ['R1D1', 'R1D2', 'R1D3', 'R1D4'],
	'Round of 3': ['R2W1', 'R2W2', 'R2W3'],
	'Grand Finals': ['R3W1', 'R3W2']
    },
    '8DEBracket': {
	'Round of 8': ['R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8'],
	'Round of 6': ['R2W1', 'R2W2', 'R2W3', 'R2W4', 'R2W5', 'R2W6'],
	'Round of 4': ['R4W1', 'R4W2', 'R3W1', 'R3W2'],
	'Round of 3': ['R4W1', 'R4W2', 'R4W3'],
	'Grand Finals': ['R5W1', 'R5W2']
    },
    '16DEBracket': {
	'Round of 16': ['R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8', 'R1D9', 'R1D10', 'R1D11', 'R1D12', 'R1D13', 'R1D14', 'R1D15', 'R1D16'],
	'Round of 12': ['R2W1', 'R2W2', 'R2W3', 'R2W4', 'R2W5', 'R2W6', 'R2W7', 'R2W8', 'R2W9', 'R2W10', 'R2W11', 'R2W12'],
	'Round of 8': ['R4W1', 'R4W2', 'R4W3', 'R4W4', 'R3W1', 'R3W2', 'R3W3', 'R3W4'],
	'Round of 6': ['R4W1', 'R4W2', 'R4W3', 'R4W4', 'R4W5', 'R4W6'],
	'Round of 4': ['R6W1', 'R6W2', 'R5W1', 'R5W2'],
	'Round of 3': ['R6W1', 'R6W2', 'R6W3'],
	'Grand Finals': ['R7W1', 'R7W2']
    },
    '32DEBracket': {
	'Round of 32': [
	    'R1D1', 'R1D2', 'R1D3', 'R1D4', 'R1D5', 'R1D6', 'R1D7', 'R1D8', 'R1D9', 'R1D10', 'R1D11', 'R1D12', 'R1D13', 'R1D14', 'R1D15', 'R1D16',
	    'R1D17', 'R1D18', 'R1D19', 'R1D20', 'R1D21', 'R1D22', 'R1D23', 'R1D24', 'R1D25', 'R1D26', 'R1D27', 'R1D28', 'R1D29', 'R1D30', 'R1D31', 'R1D32'
	],
	'Round of 24': [
	    'R2W1', 'R2W2', 'R2W3', 'R2W4', 'R2W5', 'R2W6', 'R2W7', 'R2W8', 'R2W9', 'R2W10', 'R2W11', 'R2W12','R2W13', 'R2W14', 'R2W15', 'R2W16',
	    'R2W17', 'R2W18', 'R2W19', 'R2W20', 'R2W21', 'R2W22', 'R2W23', 'R2W24'
	],
	'Round of 16': ['R3W1', 'R3W2', 'R3W3', 'R3W4', 'R3W5', 'R3W6', 'R3W7', 'R3W8', 'R3W9', 'R3W10', 'R3W11', 'R3W12', 'R3W13', 'R3W14', 'R3W15', 'R3W16'],
	'Round of 12': ['R3W1', 'R3W2', 'R3W3', 'R3W4', 'R3W5', 'R3W6', 'R3W7', 'R3W8', 'R4W5', 'R4W6', 'R4W7', 'R4W8'],
	'Round of 8': ['R4W1', 'R4W2', 'R4W3', 'R4W4', 'R5W1', 'R5W2', 'R5W3', 'R5W4'],
	'Round of 6': ['R4W1', 'R4W2', 'R4W3', 'R4W4', 'R6W1', 'R6W2'],
	'Round of 4': ['R5W1', 'R5W2', 'R7W1', 'R7W2'],
	'Round of 3': ['R5W1', 'R5W2', 'R8W1'],
	'Grand Finals': ['R9W1', 'R9W2']
    }
}

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

    return genOut(vars.data);
};

var parseBracket = function(lines, vars){
    var DE;
    var numPlayers;
    var result;
    var bracketRE = /{{(.*)Bracket$/;
    var inBracket = false,
    bracketTitle = '',
    races = {},
    i;

    console.log("we're parsing brackets");

    for(i in lines){
	//if we're in a bracket
	if(bracketRE.test(lines[i])){
	    //if we're already in a bracket, clear data
	    if(inBracket){
		data = {}
	    } else {
		inBracket = true;
		result = bracketRE.exec(lines[i]);
		//check if its a standard bracket
		if(/(\d+)(S|D)E/i.test(result[1])){
		    result = /(\d+)(S|D)E/.exec(result[1]);
		    DE = result[2] === 'D';
		    numPlayers = result[1];
		    bracketTitle = result[0] + 'Bracket';
		}
	    }
	}
	
	if(inBracket){
	    if(/\|R(\d+)(D|W)(\d+)race=([ztpr])/i.test(lines[i])){
		result = /\|R(\d+)(D|W)(\d+)race=([ztpr])/i.exec(lines[i]);	
		console.log("Found Round " + result[1] + " " + result[2] + result[3] + " race: " + result[4].toLowerCase());
		races['R' + result[1] + result[2] + result[3]] = result[4].toLowerCase();
	    }
	}
	if(/{{:(.*)}}/.test(lines[i])){
	    result = /{{:(.*)}}/.exec(lines[i]);
	    console.log("found link: ");
	    console.log(result[1]);
	}
    }

    // if bracket data has been found, generate the distribution table data
    if(inBracket){
	data = generateBracketDistTableData(bracketTitle, races);
	for(i in data) {
	    vars.data[i] = data[i];
	}
    }
};

var generateBracketDistTableData = function(bracketTitle, races) {
    var map, distLine,
    i, race,
    data = {};

    if(bracketRaceDistributionsMap[bracketTitle] !== undefined){
	map = bracketRaceDistributionsMap[bracketTitle];
	for(distLine in map){
	    data[distLine] = {"p": 0, "t": 0, "z": 0, "r": 0, "nyd": 0};
	    for(i = 0; i < map[distLine].length; i++){
		var race = races[map[distLine][i]];
		if (race !== undefined)
		    data[distLine][races[map[distLine][i]]]++;
		else
		    data[distLine]['nyd']++;
	    }
	}
    }

    return data;
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
	if(/^(=+)[\s]*Group Stage.*=+$/i.test(lines[i])){
	    result = /^(=+)[\s]*Group Stage.*=+$/i.exec(lines[i]);
	    inGroupStage = true;
	    groupStageHeadingLevel = result[1].match(/=/g).length;
	}
	// Look for a GroupTableStart line
	if(/\{\{(Template:)?GroupTableStart/i.test(lines[i])){
	    inGroupTable = true;
	    if (vars.data["Group Stage " + vars.groupStageCount] === undefined) {
		vars.data["Group Stage " + vars.groupStageCount] = {"p": 0, "t": 0, "z": 0, "r": 0, "nyd": 0};
	    }
	}
	if(inGroupTable){
	    if(/\{\{(Template\:)*GroupTableSlot[\s]?\|(.*)race=([ztpr])?/i.test(lines[i])) {
		result = /\{\{(Template\:)*GroupTableSlot[\s]*\|.*race=([ztpr])?/i.exec(lines[i]);
		if (result[2] !== undefined)
		    race = result[2].toLowerCase();
		else
		    race = "nyd";
		console.log("Found in Group Stage " + vars.groupStageCount + " race:", race);
		vars.data["Group Stage " + vars.groupStageCount][race]++;
	    }
	}
    }
};

var genOut = function(data){
    var cum = '',
    line = '',
    key,
    index = 0,
    dataSize = 0;
    for(key in data){
	if(data.hasOwnProperty(key)) {
	    dataSize++;
	}
    }
    for(key in data){
	line = "{{RaceDist|title=";
	line += key.replace(/ /g, "&amp;nbsp;");
	line += "|protoss=";
	line += data[key].p;
	line += "|terran=";
	line += data[key].t;
	line += "|zerg=";
	line += data[key].z;
	line += "|nyd=";
	line += data[key].nyd;
	// Support for first and last lines
	if(index == 0){
	    line += "|first=1";
	}else if(index == dataSize - 1){
	    line += "|last=1";
	}
	line += "}}\r\n";
	cum += line;
	index++;
    }

    return cum;
}

module.exports.getPageData = getPageData;
module.exports.parsePage = parsePage;