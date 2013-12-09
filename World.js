function World (name, towns, citizens, lastTownId, lastCitizenId) {
	this.name = name;
	this.towns = towns;
	this.citizens = citizens;
	this.lastTownId = lastTownId;
	this.lastCitizenId = lastCitizenId;
}

World.prototype.getName = function() {
	return this.name;
};
World.prototype.setName = function(name) {
	this.name = name;
};

World.prototype.getLastTownId = function() {
	return this.lastTownId++;
};

World.prototype.getLastCitizenId = function() {
	return this.lastCitizenId++;
};

World.prototype.addCitizen = function(citizen) {
	this.citizens[citizen.id] = citizen;
};

World.prototype.introduceCitizens = function() {
	this.citizens.forEach(function(citizen)  {
		citizen.salute();
	});
};

World.prototype.addTown = function(town) {
	this.towns[town.id] = town;
};

World.prototype.generateCitizens = function(min, max) {
	var i = this.lastCitizenId;
	var end = i + getRandomInt(min, max);

	for (i; i < end; ++i ) {
		var citizen = new Citizen(getRandomCitizenName(), getRandomCitizenSurname(), getRandomInt(0,100));
		this.citizens[citizen.id] = citizen;
	}
};
