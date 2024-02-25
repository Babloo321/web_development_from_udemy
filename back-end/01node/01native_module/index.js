const fs = require("fs");
// fs.writeFile("message.txt", "hello from node js!", (err) => {
//     if(err){
//         console.log("Getting error:: writefile:: error: ", err);
//     }else{
//         console.log("file is create with message.txt");
//     }
// })

// fs.readFile("./message.txt", 'utf8', (err, data) => {
//     if(err){
//         console.log("Getting error:: readfile:: error: ", err);
//     }else{
//         console.log(data);
//     }
// })
const arr = ["Babloo", "Naina", "Tuktuk", "Vikash", "Bikkee"];
for(let i = 0; i < arr.length; i++){
    fs.appendFile("record.txt",`My name is ${arr[i]}\n`, (err) => {
        if(err) throw err;
        else console.log(`${i+1} file append successful`);
    } );
}