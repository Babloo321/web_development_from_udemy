import express from "express";
import axios from "axios";
// import bodyParser from "body-parser";
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
let yourUsername = "";
let yourPassword = "";
let yourAPIKey = "";
let yourBearerToken = "";

app.get("/", async(req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(API_URL+"/random");
    const person = JSON.stringify(response.data);
    console.log(person);
    res.render("index.ejs", {content: person});
  } catch (error) {
    console.log("Getting error :: AXIOS ERROR :: ", error);
    res.render("index.ejs", {content: error.message});
  }
});

app.get("/basicAuth",async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  try {
   const response = await axios.get(API_URL + "/all?page=1", {
        auth: {
          username: "abc",
          password: "123",
        },
      });
      console.log(JSON.stringify(response));
      res.render("index.ejs", {content: JSON.stringify(response.data)});
  } catch (error) {
    console.log(error.message);
    // res.status(404).send("AXIOS ERROR ::", error.message);
  }
  

});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
