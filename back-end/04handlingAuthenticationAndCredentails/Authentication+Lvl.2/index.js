import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
const saltRound = 10;
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Babloo@123",
  port: 5432,
});
db.connect();
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  try {
    const checkRes = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkRes.rows.length > 0) {
      const user = checkRes.rows[0];
      const hashPassword = user.password;
      bcrypt.compare(loginPassword, hashPassword, (err, result) => {
        if (err) {
          console.log("Error encrypting password: ", err);
        } else {
          if (result) {
            res.render("secrets.ejs");
          } else {
            res.render("error.ejs", { content: "Incorrect Password" });
          }
        }
      });
    } else {
      res.render("error.ejs", { content: "User not found" });
    }
  } catch (error) {
    res.render("error.ejs", { content: error });
  }
});
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log(email, password);
  try {
    const dbUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (dbUser.rows.length > 0) {
      res.render("error.ejs", { content: "Email already exists! Try login" });
    } else {
      bcrypt.hash(password, saltRound, async (err, hash) => {
        if (err) {
          console.log("Getting error:: ", err);
        } else {
          const data = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          res.render("secrets.ejs");
        }
      });
    }
  } catch (error) {
    res.render("error.ejs", { content: error });
  }
});

app.listen(port, () => {
  console.log("App is listening on:: ", port);
});
