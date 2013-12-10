function Citizen(name, surname, age) {
	this.id = world.getLastCitizenId();
	this.name = name;
	this.surname = surname;
	this.age = age;
	this.profession = 'warrior';
	this.town = 'undefined';

	world.setCitizen(this);
}

//trivial functions
Citizen.prototype.getId = function() {
	return this.id;
};
Citizen.prototype.getName = function() {
	return this.name;
};
Citizen.prototype.setName = function(name) {
	this.name = name;
};
Citizen.prototype.getSurname = function () {
	return this.surname;
};
Citizen.prototype.setSurname = function (surname) {
	this.surname = surname;
};
Citizen.prototype.getAge = function () {
	return this.age;
};
Citizen.prototype.setAge = function (age) {
	this.age = age;
};
Citizen.prototype.getProfession = function () {
	return this.profession;
};
Citizen.prototype.setProfession = function (profession) {
	this.profession = profession;
};
Citizen.prototype.getTown = function() {
	return this.town;
};
Citizen.prototype.setTown = function(town) {
	this.town = town;
};

//algorithm functions
Citizen.prototype.salute = function() {
	var message = "Sir, this is citizen " + this.name + " " + this.surname;
	if (this.town !== 'undefined') {
		message += " from the town of " + this.town.getName();
	} else {
		message += ", townless and living of our world, " + world.getName();
	}
	message += ". My identification number is " + this.id + ".";

	message += " I'm " + this.age + " and I make a living as a " + this.profession;
	//profesion if
	console.debug(message);
};

