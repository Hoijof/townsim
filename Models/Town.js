function Town (name, creationTime, x, y, size) {
	this.id = world.getLastTownId();
	this.name = name;
	this.creationTime = creationTime;
	this.x = x;
	this.y = y;
	this.size = size; // it increases with the number of citizens, if they leave the town loses sizes with time.
	this.citizens = [];
	this.major = "undefined";

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
Town.prototype.getCreationTime = function() {
	return this.creationTime;
};
Town.prototype.setCreationTime = function(creationTime) {
	this.creationTime = creationTime;
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
Town.prototype.getSize = function () {
	return this.size;
};
Town.prototype.setSize = function (size) {
	this.size = size;
};
Town.prototype.setCitizen = function(citizen) {
	this.citizens[citizen.id] = citizen;
	if(this.citizens.size() > this.size) this.size++;
	citizen.setTown(this);
};
Town.prototype.removeCitizenById = function (id) {
	this.citizens.splice(id,1);
};
Town.prototype.getNumberOfCitizens = function () {
	return this.citizens.size();
};
Town.prototype.getMajor = function () {
	return this.major;
};
Town.prototype.setMajor = function (citizen) {
	this.major = citizen;
	var profession = [-2,1,0]; // to expand
	citizen.setProfession(profession);
};

// algorithm functions
Town.prototype.getRandomCitizen = function () {
	var max = [-1, -1];
	this.citizens.forEach(function (citizen) {
		var num = getRandomInt(0,100);
		if (num > max[1]){
			max[0] = citizen;
			max[1] = num;
		}
	});
	return max[0];
};

Town.prototype.introduceCitizens = function() {
	this.citizens.forEach(function(citizen)  {
		citizen.salute();
	});
};

Town.prototype.describe = function () {
	var message = "Town created the " + this.creationTime + " and named \"" + this.getName() + "\" situated in [" + this.getX() + "," + this.getY() + "]" +
		" with a size of " + this.size + " plots";
	if (this.citizens.size() == 0) {
		message += " and with no citizens.";
	} else {
		message += " and with " + this.citizens.size() + " citizens.";
	}
	var major = this.getMajor();
	if (major != 'undefined'){
		message += " Its Major is " + major.getName() + " " + major.getSurname() + ".";
	} else {
		message += " It has no Major.";
	}

	message += " The town the id " + this.id;

	console.log(message);
};



