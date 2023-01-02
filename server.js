const {response} = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateJwt = require("./utils/jwt.js")

const express = require("express");

const app = express();
app.use(express.json());

const users = [];

app.get("/", function(req, res){
    res.send("Hello Migracode!")
});

app.post("/users/sign-up", async function(req, res){
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt);

    const userId= users.length
    const newUser = {
        id: userId,
        name: name,
        email: email,
        password: encryptedPassword
    }
    
    users.push(newUser)

    console.log(users)

    const payload = {
        user: {
        id: userId
        }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.send({jwtToken: generateJwt(userId), isAuthenticated: true})
});


app.post("/users/sign-in", async function(request, response){
    const {email, password} = request.body

    const foundUser = users.find((user)=>{
        return user.email == email
    })

    if (foundUser == undefined) {
        return response.status(401).json({error: "Invalid Credential", isAuthenticated: false});
    } 

    const isPasswordValid = await bcrypt.compare(password, foundUser.password)
    if (isPasswordValid == false){
        return response.status(401).json({error: "Invalid Credential", isAuthenticated: false});
    }

    response.send({jwtToken: generateJwt(foundUser.id), isAuthenticated: true})
})

app.get("/quotes", auth, function(request, response){
    response.send("A beautiful quote!")
});

function auth(req, res, next){
    const beareToken = req.header("authorization");
    const token = beareToken.split(" ")[1];

    try {

        const verify = jwt.verify(token, proccess.env.JWT_SECRET)
        req.user = verify.user

        next()
    } catch {
        res.status(403).send("Invalid token")
    }

}

const port = process.env.PORT || 4000

app.listen(port, function(){
    console.log(`Server is running at port ${port}`)
});