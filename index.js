const express=require("express");
const app=express();

app.set("view engine", "ejs");

app.use("/user", function(req, res) {
    
});

app.use("/", function(req, res) {
    res.render("index");
});

app.listen(process.env.PORT || 5000);