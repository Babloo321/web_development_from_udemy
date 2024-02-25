// var generateName = require('sillyname');
import generateName from "sillyname"
import myHero from "superheroes";
for(let i = 0; i < 5; i++){
    var name = generateName();
    console.log(name);
}
console.log("========MY S U P E R HERO=======");
for(let i = 0; i < 5; i++){
    var hero = myHero.random();
    console.log(`I am ${hero}`);
}