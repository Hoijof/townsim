Array.prototype.repeat= function(what, L){
	while(L) this[--L]= what;
	return this;
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

function getRandomCitizenName() {
	return 'test';
}

function getRandomCitizenSurname() {
	return 'stosterona'
}