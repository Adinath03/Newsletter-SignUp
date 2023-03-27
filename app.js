const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const https = require("https");
const app = express();
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data); 
    const  url = "https://us14.api.mailchimp.com/3.0/lists/d0c134c10a";

    const options =  {
        method: "POST",
        auth: `adinarg:${process.env.MAILCHIMP_API_KEY}`
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(response.statusCode);
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(80,function(){
    console.log("Server started on 3000.");
})