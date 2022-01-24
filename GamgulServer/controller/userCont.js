const service = require('../model/userService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sign = async (req, res, next)=> {
    const { user } = req.body;
    if(user.password.length<6){
        res.status(400).send({"message": "비밀번호는 6자 이상이여야 합니다."});
        return next();
    }
    try{
        const data = await service.create(user);
        const resdata = {
            _id : data._id,
            username : data.username,
            acoountname : data.accountname,
            email : data.email,
            intro : data.intro,
            image : data.image,
            hearts : data.hearts,
            following : data.following,
            follower : data.follower,
            followCount : data.followCount
        }
        res.status(200).json(resdata);
    } catch(error) {
        res.status(400).json({"message": error.message})
    }
}

const login = async (req, res) => {
    const user = req.body.user;
    try {
        if(!user.email && !user.password) {
            throw new Error("이메일 또는 비밀번호를 입력해주세요.")
        }else if(!user.email) {
            throw new Error("이메일을 입력해주세요.")
        }else if(!user.password) {
            throw new Error("비밀번호를 입력해주세요.")
        }
        const data = await service.login(user)
        const token = bcrypt.hashSync(process.env.TOKEN,10);
        const sendData = {
            user: {
                "_id" : data._id,
                "username" : data.username,
                "email" : data.email,
                "accountname" : data.accountname,
                "image" : data.image,
                "token" : token,
            }
        }
        const token2 = jwt.sign({
            _id: data._id,
            username: data.accountname,
        },process.env.TOKEN2,
        {
            expiresIn: "3d",
        });
        res.cookie("access_token",token2,{
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true
        });
        res.status(200).json(sendData);
    } catch(error) {
        res.status(400).json({"message": error.message})
    }

}

module.exports = {sign, login};