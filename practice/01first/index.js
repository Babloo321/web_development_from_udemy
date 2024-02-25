import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
function logger(req, res, next){
    console.log("Request Method: ", req.method);
    console.log("Request Url: ", req.url);
    next();
}
app.use(logger);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


// app.use(express.static("public"));

app.get("/",(req, res) =>{
    // res.send("<h1>My Name is Babloo Kumar</h1>")
    res.render("index.ejs");
})
app.post('/submit', (req, res) => {
    const fname = req.body["fname"];
    const lname = req.body["lname"];
    console.log(req.body);
    res.render("index.ejs", {fname: fname, lname: lname})
    res.redirect("/");
})
app.put("/put", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Server is listening on https://localhost:${port}`);
})