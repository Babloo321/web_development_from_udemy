const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    console.log(req.rawHeaders);
    res.send("Get a resource");
});
app.post("/post", (_, res) => {
    res.send("Post a resource");
});
app.put("/put", (_, res) => {
    res.send("Put a resource");
});
app.path("/patch", (_, res) => {
    res.send("Patch a resource");
})
app.delete("/delete", (_, res) => {
    res.send("Delete the resource");
})
app.listen(port, () => console.log(`App is listening on ${port}`));