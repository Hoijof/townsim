
/*var world = new World ('Earth', new Array(), new Array(), 0, 0);
var t1 = new Town('Charlestown', 10, 11);
var t2 = new Town('GoirsLand', 20, 44);
var c1 = new Citizen('Bob', 'Sinclair', 23);
var c2 = new Citizen('George', 'RR Martin', 19);
var c3 = new Citizen('Hoijof', 'Golpeo', 23);
var c4 = new Citizen('Arkey', 'Seoras', 23);
var c5 = new Citizen('Ismael', 'Gordo', 100);


t1.setCitizen(c1);
t1.setCitizen(c2);
t2.setCitizen(c3);
t2.setCitizen(c4);
t2.setCitizen(c5);

t1.introduceCitizens();
t2.introduceCitizens();*/

var world = new World ('Tainor', [], [], 0, 0);
world.createMap(300,450);
world.generateTowns(30,30);
world.generateCitizens(700,700);
world.assignCitizensToTowns(1);
world.describeTowns();
world.introduceCitizens();