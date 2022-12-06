const {response} = require("express");
require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

app.get("/", function(req, res){
    res.send("Hello Migracode!")
});

const port = process.env.PORT || 4000

app.listen(port, function(){
    console.log(`Server is running at port ${port}`)
});