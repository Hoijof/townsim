function World (name, creationTime, towns, citizens, lastTownId, lastCitizenId) {
	this.name = name;
	this.towns = towns;
	this.citizens = citizens;
	this.lastTownId = lastTownId;
	this.lastCitizenId = lastCitizenId;
	this.actualTime = creationTime;
	this.god = "undefined";
	this.map = [[0,0],[0,0]];
}

// trivial functions

World.prototype.getName = function() {
	return this.name;
};
World.prototype.setName = function(name) {
	this.name = name;
};
World.prototype.getActualTime = function() {
	return this.actualTime;
};
World.prototype.setActualTime = function(actualTime) {
	this.actualTime = actualTime;
};
World.prototype.getGod = function() {
	return this.god;
};
World.prototype.setGod = function(god) {
	this.god = god;
};

World.prototype.setTown = function(town) {
	this.towns[town.id] = town;
	this.map[town.getY()][town.getX()] = town.id;
};
World.prototype.removeTown = function(town) {
	this.towns.splice(town.id, 1);
	this.map[town.getY()][town.getX()] = -1;
};
World.prototype.getTownById = function (id) {
	return this.towns[id];
};
World.prototype.getTownsCount = function () {
	return this.towns.length;
};
World.prototype.describeTowns = function () {
	this.towns.forEach(function(town)  {
		town.describe();
	});
};
World.prototype.getCitizenById = function (id) {
	return this.citizens[id];
};
World.prototype.setCitizen = function(citizen) {
	this.citizens[citizen.id] = citizen;
};
World.prototype.removeCitizen = function (citizen) {
	this.citizens.splice(citizen.id, 1);
};
World.prototype.introduceCitizens = function() {
	this.citizens.forEach(function(citizen)  {
		citizen.salute();
	});
};
World.prototype.getLastTownId = function() {
	return this.lastTownId++;
};
World.prototype.getLastCitizenId = function() {
	return this.lastCitizenId++;
};
World.prototype.describeWorld = function () {
	var message = "This is the world called " + this.getName() + ". Created on " + getDateFromTime(this.getActualTime());
	message += " " + this.getName() + " has " + this.citizens.size() + " citizens and " + this.towns.size() + " towns."
			+ " The god of this world is called " + this.getGod();

	console.log(message);
};

// algorithm functions
World.prototype.generateCitizens = function(min, max) {
	var i = this.lastCitizenId;
	var end = i + getRandomInt(min, max);

	for (i; i < end; ++i ) {
		var sex = "";
		if (getRandomInt(0,1)) sex = "male";
		else sex = "female";

		var citizen = new Citizen(getRandomCitizenName(sex), getRandomCitizenSurname(), this.getActualTime(), sex);
		citizen.generateStats(statPointsToAssign);
		citizen.generateSkills(skillPointsToAssign);
		var profession = new Array(3);
		profession[0] = getRandomInt(0,_tProfessions.length-1); // profession
		profession[1] = 0; // level
		profession[2] = 0; // events linked to the profession such as ]
		citizen.setProfession(profession);
		citizen.setTown(this.getName());
		this.citizens[citizen.id] = citizen;
	}
};

World.prototype.generateTowns = function(min, max) {
	var i = this.lastTownId;
	var end = i + getRandomInt(min, max);

	for (i; i < end; ++i ) {
		var randomCords = world.getRandomCords();
		var town = new Town(getRandomTownName(), this.getActualTime(), randomCords[0],randomCords[1], getRandomInt(5,100));
		this.setTown(town);
	}
};

World.prototype.getRandomCords = function () { //TODO Do while not a good option
	var tmp = [getRandomInt(0,this.map[0].length-1), getRandomInt(0,this.map.length-1)];

	do {
		if (this.map[tmp[1]][tmp[0]] == -1) break;
		else tmp = [getRandomInt(0,this.map[0].length-1), getRandomInt(0,this.map.length-1)];
	} while (true);
	return tmp;
};
World.prototype.createMap = function (sizeX, sizeY) {
	var tmp = new Array(sizeY);

	for(var i = 0; i < tmp.length; ++i) {
		tmp[i] = new Array(sizeX);
		for(var j = 0; j < tmp[i].length; ++j) tmp[i][j] = -1;
	}

	this.map = tmp;
};

World.prototype.assignCitizensToTowns = function (totalAssigned) {
	var citizensWithoutHome = this.citizens.size();
	var tmpCitizens = new Array(this.citizens.size());
	for(var i = 0; i < tmpCitizens.length; ++i) tmpCitizens[i] = i;
	do {
		//PRE nobody death and no towns destroyed
		var citizen = world.getCitizenById(tmpCitizens[getRandomInt(0,tmpCitizens.size()-1)]);
		var town = world.getTownById(getRandomInt(0,this.towns.size()-1));
		town.setCitizen(citizen);
		citizensWithoutHome--;
		tmpCitizens.splice(tmpCitizens.indexOf(citizen.id),1);
	} while ( (citizensWithoutHome/this.citizens.length) > (1-totalAssigned))
};

World.prototype.assignMajors = function () {
	this.towns.forEach(function (town){
			if (town.getNumberOfCitizens() > 0) {
				town.setMajor(town.getRandomCitizen());
			}
		}
	);
};

World.prototype.passADay = function () {
	this.setActualTime(this.getActualTime()+1);
	this.towns.forEach(function(town){
		town.makeCitizensWork();
	});

	if ((this.getActualTime() % (daysInAMonth*monthsInAYear)) == 0) {
		this.citizens.forEach(function (citizen){
			citizen.setProfession(citizen.getProfession());
		});
	}
};