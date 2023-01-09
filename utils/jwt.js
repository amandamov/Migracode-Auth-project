
const jwt = require("jsonwebtoken");
require("dotenv").config()

function generateJwt(userId){
    const payload = {
        user: {
        id: userId
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

function verifyJwt(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateJwt: generateJwt,
    verifyJwt: verifyJwt
}