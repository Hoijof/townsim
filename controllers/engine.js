function getProfessionLevelByProfessionAndCitizen(profession, citizen) {
	if(profession[0] == -1) return 0;
	var perfectScore = getPerfectScoreByProfessionId(profession[0]);
	perfectScore += perfectScore*0.3;
	var increment = perfectScore/Math.pow(_tJobLevel.length,2);
	return Math.floor(Math.sqrt(getActualExperienceInJobByCitizen(profession[0], citizen)/increment));
}

function getPerfectScoreByProfessionId(id) {
	var professionDefinition = professionsStats[id];
	var perfectScore = 0;

	professionDefinition[1].forEach(function (elem) {
		perfectScore += maxStat * elem[1];
	});
	professionDefinition[2].forEach(function (elem) {
		perfectScore += maxSkill * elem[1];
	});
	return perfectScore;
}

function getActualExperienceInJobByCitizen (professionId, citizen) {
	var professionDefinition = professionsStats[professionId];
	var score = 0;
	var stats = citizen.getStats();
	var skills = citizen.getSkills();
	professionDefinition[1].forEach(function (elem) {
		score += stats[elem[0]] * elem[1];
	});
	professionDefinition[2].forEach(function (elem) {
		score += skills[elem[0]] * elem[1];
	});
	return score;
}

function giveWorkExperiencieFromCitizen (citizen) {
	var professionDefinition = professionsStats[citizen.getProfession()[0]];
	var stats = citizen.getStats();
	var skills = citizen.getSkills();
	professionDefinition[3].forEach(function (elem) {
		stats[elem[0]] = Math.round((stats[elem[0]] + elem[1])*10000)/10000;
	});
	professionDefinition[4].forEach(function (elem) {
		skills[elem[0]] = Math.round((skills[elem[0]] + elem[1])*10000)/10000;
	});
}