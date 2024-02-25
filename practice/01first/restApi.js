import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const bearerToken = "591be124-d5fa-4d5c-91ff-38f22a8459e0";
const API_URL = "https://secrets-api.appbrewery.com";
const config = {
    headers: {Authorization: `Bearer ${bearerToken}`},
}
app.get("/",(req, res) => {
    res.render("restApi.ejs", {content: "waiting for result..."});
})

app.post("/get-secret", async (req, res) => {
    const searchId = req.body.id;
    console.log(searchId);
    try {
        const response = await axios.get(API_URL + "/secrets/" + searchId, config);
        res.render("restApi.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.render("restApi.ejs", {content: JSON.stringify(error.response.data)});
    }
});

app.post("/post-secret", async(req,res) => {
    try {
        const response = await axios.post(API_URL + "/secrets",req.body,config);
        res.render("restApi.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.render("restApi.ejs", {content: JSON.stringify(error.response.data)});
    }
})

app.post("/put-secret", async(req, res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.put(API_URL+"/secrets/"+searchId, req.body, config);
        res.render("restApi.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.render("restApi.ejs", {content: JSON.stringify(error.response.data)});
    }
});
app.post("/patch-secret", async(req, res) => {
    const searchId = req.body.id
    try {
        const response = await axios.patch(API_URL+"/secrets/"+searchId, req.body,config);
        res.render("restApi.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.render("restApi.ejs", {content: JSON.stringify(errro.response.data)});
    }
});
app.post("/delete-secret", async(req, res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.delete(API_URL+"/secrets/"+searchId,config);
        res.render("restApi.ejs", {content: JSON.stringify(response.data)});
    } catch (error) {
        res.render("restApi.ejs", {content: JSON.stringify(error.response.data)});
    }
})
app.listen(port,()=> console.log("App is listening on", port));