function Town (name, x, y) {
	this.id = world.getLastTownId();
	this.name = name;
	this.x = x;
	this.y = y;
	this.citizens = [];

	world.setTown(this);
}

// trivial functions
Town.prototype.getId = function() {
	return this.id;
};
Town.prototype.getName = function() {
	return this.name;
};
Town.prototype.setName = function(name) {
	this.name = name;
};
Town.prototype.getX = function(){
	return this.x;
};
Town.prototype.setX = function(x){
	this.x = x;
};
Town.prototype.getY = function(){
	return this.y;
};
Town.prototype.setY = function(y){
	this.y = y;
};
Town.prototype.setCitizen = function(citizen) {
	this.citizens[citizen.id] = citizen;
	citizen.setTown(this);
};
Town.prototype.removeCitizenById = function (id) {
	this.citizens.splice(id,1);
};

// algorithm functions
Town.prototype.introduceCitizens = function() {
	this.citizens.forEach(function(citizen)  {
		citizen.salute();
	});
};

Town.prototype.describe = function () {
	var message = "Town named \"" + this.getName() + "\" situated in [" + this.getX() + "," + this.getY() + "]";
	if (this.citizens.size() == 0) {
		message += " and with no citizens.";
	} else {
		message += " and with " + this.citizens.size() + " citizens.";
	}
	console.log(message);
};



