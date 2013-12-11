function Citizen(name, surname, birthday, sex) {
	this.id = world.getLastCitizenId();
	this.name = name;
	this.surname = surname;
	this.sex = sex;
	this.birthday = birthday;
	this.bornPlace = world.getName();
	this.nickname = 'undefined';
	this.profession = [-1, 0, 0]; //[name, level, exp]
	this.town = 'undefined';
	this.stats = [0,0,0,0,0,0];
	this.skills = [];

	world.setCitizen(this);
}

//trivial functions
Citizen.prototype.getBornPlace = function () {
	return this.bornPlace;
};
Citizen.prototype.setBornPlace = function (bornPlace) {
	this.bornPlace = bornPlace;
};
Citizen.prototype.getNickname = function () {
	return this.nickname;
};
Citizen.prototype.setNickname = function (nickname) {
	this.nickname = nickname;
};
Citizen.prototype.getStats = function () {
	return this.stats;
};
Citizen.prototype.setStats = function (stats) {
	this.stats = stats;
};
Citizen.prototype.getSkills = function () {
	return this.skills;
};
Citizen.prototype.setSkills = function (skills) {
	this.skills = skills;
};
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
Citizen.prototype.getSex = function () {
	return this.sex;
};
Citizen.prototype.setSex = function (sex) {
	this.sex = sex;
};
Citizen.prototype.setSurname = function (surname) {
	this.surname = surname;
};
Citizen.prototype.getBirthday = function () {
	return this.birthday;
};
Citizen.prototype.setBirthday = function (birthday) {
	this.birthday = birthday;
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
	var message = "Sir, this is citizen " + this.name + " " + this.surname + " and I\'m a " + this.sex
					+ " and I\'m " + getAgeFromTime(this.getBirthday()) + " years old.";
	if (this.town !== 'undefined') {
		message += " I'm from " + this.town.getName();
	} else {
		message += " I'm homeless and living of our world, " + world.getName();
	}
	message += ". My identification number is " + this.id + ".";
	if (this.profession[0] == 0-2) message += " I'm the " + _tMisc[this.profession[1]] + " " + _tProfessions[this.profession[0]] + " of " + this.getTown().getName();
	else message += " I'm a " + _tMisc[this.profession[1]] + " " + _tProfessions[this.profession[0]];

	console.log(message);
};

