import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
var details = "";
function userDetails(req, res, next){
    console.log(req.body);
    details = req.body["email"] + req.body["password"];
    next();
}
app.use(userDetails);
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")

});
app.post("/login", (req, res) => {
    res.send(`<h1>You Detail is:</h1><br> <h2>${details}</h2>`);
})
app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})