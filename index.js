const express=require("express");
const app=express();

app.set("view engine", "ejs");

app.use("/", function(req, res) {
    res.render("index");
});

app.use(express.static("views"));

app.listen(process.env.PORT || 5000);