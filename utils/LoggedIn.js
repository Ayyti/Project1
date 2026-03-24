const jwt = require("jsonwebtoken");

function loggedIn(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).send("Please login to continue.");

        jwt.verify(token, "secretkey", function (err, decoded) {
            if (err) 
                return res.status(402).send("Invalid token, please login again.");
        
            req.user = decoded;
            next();
});
        
    }
    catch (err) {
        res.status(500).send("Server error, try again later.");
    }   
}
       

module.exports = loggedIn;