/*Array.prototype.repeat= function(what, L){
	while(L) this[--L]= what;
	return this;
}*/
Array.prototype.size = function(){
	return this.filter(function(a){return a !== undefined;}).length
};

function isAppening(prob) {
	return getRandomInt(0, 100) <= prob;

}

function loadjsfile( filename)
{
	var rnd = Math.floor(Math.random()*80000);
	var fileref = document.createElement( 'script' );
	fileref.setAttribute( "type", "text/javascript" );
	fileref.setAttribute( "src", filename + "?r=" + rnd ); // note this line
}

function getRandomInt (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCitizenName(sex) {
	if (sex == 'male') {
		return maleNames[getRandomInt(0,maleNames.length-1)];
	} else if (sex == 'female') {
		return femaleNames[getRandomInt(0,femaleNames.length-1)];
	}
	return 'Bernt';
}
function getRandomCitizenSurname() {
	return surnames[getRandomInt(0,surnames.length-1)];
}
function getRandomTownName() {
	if(isAppening(33)) return townNames[getRandomInt(0,townNames.length-1)];
	return townFirstNames[getRandomInt(0,townFirstNames.length-1)]+townSecondNames[getRandomInt(0,townSecondNames.length-1)];
}






// meh
function createCORSRequest(method, url){
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr){
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined"){
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}

function readFile (fileName) {
	if (FileReader)
	{
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var url = 'http://ivy-corp.com/src/data/'+fileName;

			var request = createCORSRequest('GET', url);
			if (request){
				request.onload = function(){
					surnames = request.response;
					//console.log(surnames);
					return ('pedrinn');
				};
				request.send();
			}

		} else {
			alert('The File APIs are not fully supported by your browser.');
		}
	} else {
		console.log ('Your browser doesn\'t support the FileReader functionality of HTML5, you\'re not suited to be' +
			'part of the testing team, sorry');
	}
}