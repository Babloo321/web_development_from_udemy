import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyparer from 'body-parser';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyparer.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log(req.body);
    // res.sendFile(__dirname + "/public/index.html");
    res.render("first.ejs");
});

app.post("/result", (req, res) => {
    console.log(req.body)
    res.render("index.ejs", {
        email: req.body["email"],
        password: req.body["password"]
    });
    
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})
