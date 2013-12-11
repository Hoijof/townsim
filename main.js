

var game = {version: '0.0.2', stage: 'development'};

function createWorld (worldName, worldCreationTime, mapX, mapY, townMin, townMax, citizensMin, citizensMax,
			   citizensToTowns, godName) {
	world = new World (worldName, worldCreationTime, [], [], 0, 0);
	world.setGod(godName);
	world.createMap(mapX,mapY);
	world.generateTowns(townMin,townMax);
	world.generateCitizens(citizensMin,citizensMax);
	world.assignCitizensToTowns(citizensToTowns);
	world.assignMajors();
	world.describeWorld();
	world.describeTowns();
	world.introduceCitizens();
}

var world = 'undefined';
var actualTime = 0;
var daysInAMonth = 25;
var monthsInAYear = 10;