function Town (name, x, y) {
	this.id = world.getLastTownId();
	this.name = name;
	this.x = x;
	this.y = y;
	this.citizens = new Array();

	world.addTown(this);
}

Town.prototype.addCitizen = function(citizen) {
	this.citizens[citizen.id] = citizen;
	citizen.setTown(this);
};

Town.prototype.introduceCitizens = function() {
	this.citizens.forEach(function(citizen)  {
		citizen.salute();
	});
};

Town.prototype.getName = function() {
	return this.name;
};

Town.prototype.setName = function(name) {
	this.name = name;
};
