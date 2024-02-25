import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"world",
    password:"Babloo@123",
    port:5432,
});
db.connect();
let flages = [{}];
let currentFlage = {};
let totalCorrect = 0;
db.query("SELECT * FROM flags", (err,res) => {
    if(err){
        console.log("Getting DATABASE ERROR:: ERROR::",err.stack);
    }else{
        flages = res.rows;
    }
    db.end();
});

app.get('/', async(req, res) => {
    totalCorrect = 0;
    await nextQuestion();
    console.log(`current Flage: ${currentFlage.flage}`);
    res.render("index.ejs",{false: currentFlage.flage});
});
app.post("/submit", (req, res) => {
    let answer = req.body.answer.trim();
    let isCorrect = false;
    if(currentFlage.flage === answer.flage){
        totalCorrect++;
        console.log(`totalCorrect: ${totalCorrect}`);
        isCorrect = true;
    }
    nextQuestion();
    res.render("index.ejs",{
        flage: currentFlage.flage,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
    });
});
async function nextQuestion(){
    const randomFlage = flages[Math.floor(Math.random() * flages.length)];
    currentFlage = randomFlage;
}
app.listen(port, ()=> {
    console.log("app is listening on ", port);
})