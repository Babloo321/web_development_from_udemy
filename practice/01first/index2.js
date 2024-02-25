import express from 'express';
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.render("index2.ejs");
})

app.post('/choice', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})
app.listen(port, () => {
    console.log("Server is listening on: ", port," port");
})