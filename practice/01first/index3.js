import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
const port=3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",async(req, res) => {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    // console.log(result);
   try {
        res.render("index3.ejs", {data: result});
   } catch (error) {
        res.render("index3.ejs", {error: error.message});
   }
res.render("index3.ejs")
})
app.post('/', async(req, res) =>{
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const result = response.data;
    try {
        console.log(result[Math.floor(Math.random() * result.length)]);
        res.render("index3.ejs", {data: result[Math.floor(Math.random() * result.length)],});
    } catch (error) {
        res.render("index3.ejs", {error: error.message})
    }
})
app.listen(port, ()=>{
    console.log("Server is listening on:: ", port);
})