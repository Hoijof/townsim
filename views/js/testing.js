$("document").ready(function() {
	$('#lateralBar').on("click", "p", function () {
		setActiveView($(this).attr('id'))
	});

	function initTesting() {
		activeView = $("#indexView");
	}

	$('#newWorldSubmit').on("click", function() {
		var error = false;

		var name = $("#newWorldName").val();
			if(typeof(name) != 'string' || name.length > 15 || name.length < 1){
				console.log("Incorrect Name");
				error = true;
			}
		var creationTime = parseInt($("#newWorldCreationTime").val());
			if(isNaN(creationTime) || creationTime > 10000 || creationTime < 0){
				console.log("Incorrect creation time");
				error = true;
			}
		var mapX = parseInt($("#newWorldMapX").val());
			if(isNaN(mapX) || mapX > 1000 || mapX < 1){
				console.log("Incorrect map X");
				error = true;
			}
		var mapY = parseInt($("#newWorldMapY").val());
			if(isNaN(mapY) || mapY > 1000 || mapY < 1){
				console.log("Incorrect map Y");
				error = true;
			}
		var minTowns = parseInt($("#newWorldMinimumTowns").val());
			if(isNaN(minTowns) || minTowns > 1000 || minTowns < 1){
				console.log("Incorrect Minimum number of towns");
				error = true;
			}
		var maxTowns = parseInt($("#newWorldMaximumTowns").val());
			if(isNaN(maxTowns) || maxTowns > 1000 || maxTowns < 1){
				console.log("Incorrect Maximum number of towns");
				error = true;
			}
		var minCitizens = parseInt($("#newWorldMinimumCitizens").val());
			if(isNaN(minCitizens) || minCitizens > 10000 || minCitizens < 1){
				console.log("Incorrect Minimum number of citizens");
				error = true;
			}
		var maxCitizens = parseInt($("#newWorldMaximumCitizens").val());
			if(isNaN(maxCitizens) || maxCitizens > 10000 || maxCitizens < 1){
				console.log("Incorrect Maximum number of towns");
				error = true;
			}
		var citizensInTowns = parseInt($("#newWorldCitizensToTowns").val());
//		console.log(typeof(citizensInTown)); console.log(citizensInTown);
			citizensInTowns /= 100;
			if(isNaN(citizensInTowns) || citizensInTowns > 1 || citizensInTowns < 0){
				console.log("Incorrect percentage of citizens assigned to towns");
				error = true;
			}
		var godName = $("#newWorldGodName").val();
		if(typeof(godName) != 'string' || godName.length > 15 || godName.length < 1){
			console.log("Incorrect God name");
			error = true;
		}

		if(!error){
			createWorld(name, creationTime, mapX, mapY, minTowns, maxTowns, minCitizens, maxCitizens,
						citizensInTowns, godName);
			updateTopBar();
		}
		else alert("Not able to create the map, look at your console to see the errors");
	});

	$("#scPrevious").on("click", function() {
		if(params[1] > 0)	params[1]--;
		updateActiveView();
	});

	$("#scNext").on("click", function() {
		if(params[1] < world.citizens.size()-1) params[1]++;
		updateActiveView();
	});

	$("#stPrevious").on("click", function() {
		if(params[1] > 0)	params[1]--;
		updateActiveView();
	});

	$("#stNext").on("click", function() {
		if(params[1] < world.towns.size()-1) params[1]++;
		updateActiveView();
	});


	$(".toTown").on("click", "span", function () {
		params[0] = "showTownView";
		params[1] = $(this).attr('id').split('-')[1];
		setActiveView("showTown");
	});
	$(".toCitizen").on("click", "span", function () {
		params[0] = "showCitizenView";
		params[1] = $(this).attr('id').split('-')[1];
		setActiveView("showCitizen");
	});
	$(".toCitizenList").find("> div > ul").on("click", "li", function () {
		params[0] = "showCitizenView";
		params[1] = $(this).attr('id').split('-')[1];
		setActiveView("showCitizen");
	});
	$(".toTownList").find("> div > ul").on("click", "li", function () {
		params[0] = "showTownView";
		params[1] = $(this).attr('id').split('-')[1];
		setActiveView("showTown");
	});

	$("#nextDay").on("click", function() {
		if (timeTimer != -1) {
			window.clearInterval(timeTimer);
			timeTimer = -1;
			$(this).removeClass('activated');
		} else {
			$(this).addClass('activated');
			timeTimer = setInterval(function(){
				world.passADay();
				updateTopBar();
				updateActiveView();
			},$(this).find("> input").val());
		}
	});

	function updateActiveView() {
		switch(activeView.selector) {
			case "#lbNewWorldView":

			break;
			case "#lbViewActualWorldView":

				//general
				$("#swName").html(world.getName());
				$("#swActualDate").html(getDateFromTime(world.getActualTime()));
				$("#swGodName").html(world.getGod());
				$("#swMapSize").html(world.map[0].length + "x" + world.map.length);

				//towns
				$("#swNumberOfTowns").html(world.towns.size());
				var mostPopulated = world.getTownById(0);
				var lessPopulated = world.getTownById(0);
				//noinspection JSDuplicatedDeclaration
				var html = "";
				world.towns.forEach(function (town) {
					html += "<li id=\"swTown-" + town.getId()
						+ "\" class=\"clickableInfo\">" + town.getName() + "</li>";
					if (town.getNumberOfCitizens() > mostPopulated.getNumberOfCitizens()) mostPopulated = town;
					if (town.getNumberOfCitizens() < lessPopulated.getNumberOfCitizens()) lessPopulated = town;
				});
				$("#swListOfTowns").find("> div > ul").html(html);
				$("#swMostPopulatedTown").html("<span id=\"swTown-" + mostPopulated.getId()
						+ "\" class=\"clickableInfo\">" + mostPopulated.getName() + "</span>");
				$("#swLessPopulatedTown").html("<span id=\"swTown-" + lessPopulated.getId()
					+ "\" class=\"clickableInfo\">" + lessPopulated.getName() + "</span>");

				//citizens
				$("#swNumberOfCitizens").html(world.citizens.size());
				var htmlTown = "";
				var htmlWithoutTown ="";
				var countTown = 0;
				var countWithoutTown = 0;
				world.citizens.forEach(function (citizen) {
					if (citizen.getTown() != world.getName()) {
						htmlTown += "<li id=\"swCitizen-" + citizen.getId()
							+ "\" class=\"clickableInfo\">" + citizen.getName() + " " + citizen.getSurname() + "</li>";
						++countTown
					} else {
						htmlWithoutTown += "<li id=\"swCitizen-" + citizen.getId()
							+ "\" class=\"clickableInfo\">" + citizen.getName() + " " + citizen.getSurname() + "</li>";
						++countWithoutTown;
					}
				});
				$("#swNumberCitizensWithTown").html(countTown);
				$("#swNumberCitizensWithoutTown").html(countWithoutTown);
				$("#swListOfCitizensWithTown").find("> div > ul").html(htmlTown);
				$("#swListOfCitizensWithoutTown").find("> div > ul").html(htmlWithoutTown);
			break;
			case "#lbConfigurationView":

			break;
			case "#showCitizenView":
				if(params[0] != "showCitizenView"){
					params[0] = "showCitizenView";
					params[1] = 0;
				}
				var citizen = world.getCitizenById(params[1]);
				if (typeof(citizen) == 'undefined') return;

				$("#showCitizenView").find("> div > header").html("Citizen " + citizen.getId());
				//general
				$('#scName').html(citizen.getName());
				$('#scSurname').html(citizen.getSurname());
				$('#scSex').html(citizen.getSex());
				$('#scBornPlace').html(citizen.getBornPlace());
				//misc
				$('#scNickname').html(citizen.getNickname());
				//noinspection JSDuplicatedDeclaration
				var tmp = citizen.getProfession();
				$('#scProfessionLevel').html(_tJobLevel[tmp[1]]);
				$('#scProfession').html(_tProfessions[tmp[0]]);
				$('#scBirthday').html(getDateFromTime(citizen.getBirthday()));
				$('#scAge').html(getAgeFromTime(citizen.getBirthday()));
				tmp = citizen.getTown();
				if (typeof(tmp) == 'object') $('#scTown').html("<span id=\"scTown-" + tmp.getId()
														+ "\" class=\"clickableInfo\">" + tmp.getName() + "</span>");
				else $('#scTown').html(world.getName());

                //Stats&Skills
                var stats = citizen.getStats();
                var html = "";
                    for(var i = 0; i < stats.length; i++) html += "<div>" + _tStats[i] + ": " + stats[i] +"</div>";
                $("#scStats").html(html);
                var skills = citizen.getSkills();
                html = "";
                    for(i = 0; i < skills.length; i++) html += "<div>" + _tSkills[i] + ": " + skills[i] +"</div>";
                $("#scSkills").html(html);
			break;
			case "#showTownView":
				if(params[0] != "showTownView"){
					params[0] = "showTownView";
					params[1] = 0;
				}
				var town = world.getTownById(params[1]);
				if (typeof(town) == 'undefined') return;

				$("#showTownView").find("> div > header").html("Town " + town.getId());
				//general
				$("#stName").html(town.getName());
				$("#stCreationDate").html(getDateFromTime(town.getCreationTime()));
				$("#stCoordinates").html(town.getX() + "x" + town.getY());
				$("#stSize").html(town.getSize());
				$("#stNumberOfCitizens").html(town.citizens.size());
				//noinspection JSDuplicatedDeclaration
				var tmp = town.getMajor();
				if(typeof(tmp) == 'object') $("#stMajor").html("<span id=\"stCitizen-" + tmp.getId()
								+ "\" class=\"clickableInfo\">" + tmp.getName() + " " + tmp.getSurname() + "</span>");
				else $("#stMajor").html('undefined');

				//noinspection JSDuplicatedDeclaration
				var html = "";
				town.citizens.forEach(function (citizen) {
					html += "<li id=\"stCitizen-" + citizen.getId()
								+ "\" class=\"clickableInfo\">" + citizen.getName() + " " + citizen.getSurname() + "</li>";
				});
				$("#stListOfCitizens").find("> div > ul").html(html);
			break;
			default:
				console.debug("none updated");

		}
	}
	function setActiveView(view) {
		activeView.hide();
		activeView = $("#"+view+"View");
		updateActiveView();
		activeView.show();
	}

	function updateTopBar () {
		$("#tbWorldName").html(world.getName());
		$("#tbTowns").html(world.towns.size());
		$("#tbCitizens").html(world.citizens.size());
		$("#tbMapSize").html(world.map[0].length + "x" + world.map.length);
		$("#tbDate").html(getDateFromTime(world.getActualTime()));
	}

	var activeView = "undefined";
	var params = [];
	var timeTimer = -1;
	initTesting();
});


