import express from 'express'
const app = express();
const port = 5000;
app.get('/', (req, res) => {
    // res.send("<p>My name is Babloo kumar</p>");
    const today = new Date();
    const day = today.getDay();
    console.log(day);
    let dayType = "a weekday";
    let advice = "It's time to work hard";
    if(day === 0 || day === 6){
        dayType = "the weekend";
        advice = "It's time to fun something";
    }
    res.render("index.ejs", 
    {dayType: dayType, advice: advice}
    )
    // if(day === 6){
    //     res.render("index.ejs", 
    //     {dayType: "a weekend", advice: "It's time to fun something new"}
    //     );
    // }else{
    //     res.render("index.ejs",
    //     {dayType: "a weekday", advice: "It's time to work hard"}
    //     );
    // }
   
});
app.listen(port, () => {
    console.log(`App is listening on ${port} port`);
});