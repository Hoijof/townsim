function World (name, creationDate, towns, citizens, lastTownId, lastCitizenId) {
	this.name = name;
	this.towns = towns;
	this.citizens = citizens;
	this.lastTownId = lastTownId;
	this.lastCitizenId = lastCitizenId;
	this.creationDate = creationDate;
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
World.prototype.getCreationDate = function() {
	return this.creationDate;
};
World.prototype.setCreationDate = function(creationDate) {
	this.creationDate = creationDate;
};
World.prototype.getGod = function() {
	return this.god;
};
World.prototype.setGod = function(god) {
	this.god = god;
};

World.prototype.setTown = function(town) {
	this.towns[town.id] = town;
	this.map[town.getX()][town.getY()] = town.id;
};
World.prototype.removeTown = function(town) {
	this.towns.splice(town.id, 1);
	this.map[town.getX()][town.getY()] = -1;
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


// algorith functions
World.prototype.generateCitizens = function(min, max) {
	var i = this.lastCitizenId;
	var end = i + getRandomInt(min, max);

	for (i; i < end; ++i ) {
		var sex = "";
		if (getRandomInt(0,1)) sex = "male";
		else sex = "female";

		var citizen = new Citizen(getRandomCitizenName(sex), getRandomCitizenSurname(), getRandomInt(0,100), sex);

		var profession = new Array(3);
		profession[0] = getRandomInt(0,_tProfessions.length-1);
		if(isAppening(5)) profession[1] = 3;
		else if(isAppening(15)) profession[1] = 2;
		else if(isAppening(30)) profession[1] = 1;
		else profession[1] = 0;
		profession[2] = 14;
		citizen.setProfession(profession);

		this.citizens[citizen.id] = citizen;
	}
};

World.prototype.generateTowns = function(min, max) {
	var i = this.lastTownId;
	var end = i + getRandomInt(min, max);

	for (i; i < end; ++i ) {
		var randomCoords = world.getRandomCords();
		var town = new Town(getRandomTownName(), "Today", randomCoords[0],randomCoords[1], getRandomInt(5,100));
		this.setTown(town);
	}
};

World.prototype.getRandomCords = function () { //TODO Do while not a good option
	var tmp = [getRandomInt(0,this.map[0].length-1), getRandomInt(0,this.map[0].length-1)];
	do {
		if (this.map[tmp[0]][tmp[1]] == -1) break;
		else tmp = [getRandomInt(0,this.map[0].length-1), getRandomInt(0,this.map[0].length-1)];
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

World.prototype.assingMajors = function () {
	this.towns.forEach(function (town){
			if (town.getNumberOfCitizens() > 0) {
				town.setMajor(town.getRandomCitizen());
			}
		}
	);
};