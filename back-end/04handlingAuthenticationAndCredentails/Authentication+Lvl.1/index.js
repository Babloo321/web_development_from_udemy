import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Babloo@123",
  port: 5432, // Default PostgreSQL port
});
db.connect();
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkRes.rows.length > 0) {
      res.render("error.ejs", {content: "Email already exists! Try login"});
    } else {
      const data = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      res.render("secrets.ejs");
    }
  } catch (err) {
    res.render("error.ejs", {content: err});
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1",[email]);
    if(checkRes.rows.length > 0){
      const user = checkRes.rows[0];
      const userPassword = user.password;
      if(userPassword === password){
        res.render("secrets.ejs");
      }else{
        res.render("error.ejs", {content: "Incorrect Password"});
      }
    }else{
      res.render("error.ejs", {content: "User not found"});
    }
  } catch (error) {
    res.render("error.ejs", {content: error});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
