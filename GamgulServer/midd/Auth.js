const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = async (req,res,next) => {
    try {
        const{ authorization, cookie} = req.headers;
        const key = authorization.split(" ");
        const token1 = await bcrypt.compare(process.env.TOKEN,key[1]);
        const token2 = jwt.verify(cookie.split("=")[1],process.env.TOKEN2);
        req.body.infouser = {
            id : token2._id
        }
        if(token1&&token2) {
            next();
        } else {
            throw new Error();
        }
        
    } catch(error) {
        res.status(500).json({"message":"auth fail"})
    }
}

module.exports = auth;