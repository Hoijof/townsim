function Citizen(name, surname, age) {
	this.id = world.getLastCitizenId();
	this.name = name;
	this.surname = surname;
	this.age = age;
	this.profession = 'warrior';
	this.town = 'undefined';

	world.addCitizen(this);
}

Citizen.prototype.salute = function() {
	var message = "Sir, this is citizen " + this.name + " " + this.surname;
	if (this.town !== 'undefined') {
		message += " from the town of " + this.town.getName();
	} else {
		message += " townless and living of our world, " + world.getName();
	}
	message += " with identification number " + this.id + ".";

	message += " I'm " + this.age + " and I make a living as a " + this.profession;
	//profesion if
	console.debug(message);
};

Citizen.prototype.getTown = function() {
	return this.town;
};

Citizen.prototype.setTown = function(town) {
	this.town = town;
};