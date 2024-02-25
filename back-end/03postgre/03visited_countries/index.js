/*
import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"world",
  password:"Babloo@123",
  port:5432,
});
db.connect();

async function visited_countries(){
  const result = await db.query("SELECT country_code FROM visited_countries");
  const countries = [];
  result.rows.forEach((country) =>{
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  // const result = await db.query("SELECT country_code FROM visited_countries");
  // // const result = await db.query("SELECT code FROM countries");
  // const countries = [];
  // result.rows.forEach((country) => {
  //   countries.push(country.country_code);
  // })
   const countries = await visited_countries();
  res.render("index.ejs", {countries:countries, total: countries.length});
  // db.end();
});

app.post('/add', async(req, res) => {
  const input = req.body['country'];
  const result = await db.query("SELECT code FROM countries WHERE name = $1",[input]);
  if(result.rows.length !== 0){
    const data = result.rows[0];
    console.log(data.code);
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [data.code]);
  }
  res.redirect("/");
});
// db.end();
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

*/


import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Babloo@123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    // const countryCode = data.code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
