

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