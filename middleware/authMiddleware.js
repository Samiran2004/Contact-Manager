const jwt = require('jsonwebtoken');

const validatToken = async (req, res, next) => {
    let token;
    const requestHeader = req.headers.Authorization || req.headers.authorization;
    if (requestHeader && requestHeader.startsWith("Bearer")) {
        token = requestHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                res.status(401).send({
                    status: "Failed",
                    message: "Validation failed"
                });
            } else {
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(401).send({
            status: "Failed",
            message: "Undefine token"
        }); 
    }
}

module.exports = validatToken;