import express from 'express'
import { dirname } from 'path'
import {fileURLToPath} from "url"
import bodParser from 'body-parser'
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 4000;

app.use(bodParser.urlencoded({extended: true}));
var password = "";
function redirectPassword(req, res, next){
    password = req.body["password"];
    next();
}
app.use(redirectPassword);
app.get('/', (req, res) => {
    console.log(req.body);
    res.sendFile(__dirname + "/public/index.html");
});
app.post("/check", (req, res) => {
    if(password === "Babloo" || password === "babloo"){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.sendFile(__dirname + "/public/index.html");
    }
})
app.listen(port, () => {
    console.log("App is listening on ", port);
})