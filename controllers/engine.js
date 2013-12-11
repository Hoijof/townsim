function setProfessionLevelByCitizen(citizen) {
	var profession = citizen.getProfession();
	var perfectScore = getPerfectScoreByProfessionId(profession[0]);
	perfectScore += perfectScore*0.1;
	var increment = perfectScore/Math.pow(_tJobLevel.length,2);
	profession[1] = _tJobLevel[Math.floor(Math.sqrt(getActualExperienceInJobByCitizen(profession[0], citizen)/increment))];
	citizen.setProfession(profession);
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
	console.log(score);
	return score;
}