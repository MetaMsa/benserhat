const express=require("express");
const app=express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use("/gpdr", function(req, res) {
    res.render("gpdr.ejs");
});

app.use("/", function(req, res) {
    res.render("index");
});

app.listen(process.env.PORT || 5000);