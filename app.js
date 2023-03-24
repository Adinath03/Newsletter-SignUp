const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.send("server is running.");
})
app.listen(3000,function(){
    console.log("Server started on 3000.");
})