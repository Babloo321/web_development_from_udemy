/*
1. use the inquirer npm package to get user input
2. use the qr-image npm package to turn the user entered URL into a QR code image
3. Create a txt file to save the user input using the native fs node module
*/
// const inqurer = require("inquirer");
import inqurer from 'inquirer';
import qr from "qr-image";
import fs from 'fs';
inqurer
.prompt([
    {
    message: "Type your URL: ",
    name: "URL"
    }
])
.then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));

    fs.writeFile("URL.txt", url, (err) => {
        if(err) throw err;
        else console.log("file created successfull");
    })
})
.catch((err) => {
    if(err) throw err;
})