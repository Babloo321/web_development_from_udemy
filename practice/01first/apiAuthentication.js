import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const port=3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const api_URL = "https://secrets-api.appbrewery.com";
const username="babloo";
const password="Babloo@123";
const myApiKey = "48a2e53b-f005-4dc6-9568-103bad2d8244";
const bearerToken="8c6ee15b-194c-48fd-8987-a2b562835669";
// authentication==>(1.No auth, 2.Basic auth, 3.ApiKey auth, 4.TokenBase auth)
// No authentication
app.get("/", (req, res) => {
    res.render("apiAuth.ejs", {content: "API Response"});
})
app.get('/noAuth', async(req, res) => {
   try {
        const response = await axios.get(api_URL+"/random");
        res.render("apiAuth.ejs", {content: JSON.stringify(response.data)});
   } catch (error) {
    res.status(404).send("error",error.message);
   }
})

// Basic authentication
app.get('/basicAuth', async(req,res)=>{
    try {
        const response = await axios.get(api_URL+"/all?page=2",{
            auth:{
                username:username, 
                password:password
            }
        });
        res.render("apiAuth.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.status(404).send("error", error.message);
    }
    
    
    res.render("apiAuth.ejs", {content: JSON.stringify(response.data)});
})

//Api Key authentication
app.get("/apiKeyAuth", async(req, res) => {
    try {
        const response = await axios.get(api_URL+"/filter",{
            params:{
                score:5,
                apiKey:myApiKey,
            }
        });
        res.render("apiAuth.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.status(404).send("error", error.message);
    }
    res.render("apiAuth.ejs");
})

//Token Based authentication
app.get("/tokenAuth", async(req, res) => {
    try {
        const response = await axios.get(api_URL+"/secrets/5", {
            headers:{
                Authorization: `Bearer ${bearerToken}`
            },
        });
        res.render("apiAuth.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.status(404).send("error", error.message);
    }
    res.render("apiAuth.ejs");
})
app.listen(port, () => console.log('Server is listening on ', port));