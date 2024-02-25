import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render("index.ejs");
});
app.post("/kkkk", (req, res) => {
    const nameLength = req.body["fName"].length + req.body["lName"].length;
    console.log(nameLength);
    res.render("index.ejs", {numOfLetters: nameLength});
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})