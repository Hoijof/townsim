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

		if(!error) createWorld(name, creationTime, mapX, mapY, minTowns, maxTowns, minCitizens, maxCitizens,
							   citizensInTowns, godName);
		else alert("Not able to create the map, look at your console to see the errors");
	});

	function updateActiveView() {
		switch(activeView.selector) {
			case "#lbNewWorldView":
				console.debug("lbNewWorld updated");
				break;
			case "#lbViewActualWorldView":
				console.debug("lbViewActualWorld updated");
				break;
			case "#lbConfigurationView":
				console.debug("lbConfiguration updated");
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
		//console.log(activeView);
	}

	var activeView = "undefined";
	initTesting();
});


