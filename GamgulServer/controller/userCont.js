const service = require('../model/userService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sign = async (req, res, next)=> {
    const { user } = req.body;
    try{
        if(user.password.length<6){
            throw new Error("비밀번호는 6자 이상이여야 합니다.");
        }
        const data = await service.create(user);
        res.status(200).json(data);
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

const alluser = async (req,res) => {
    const user = await service.alluser();
    res.status(200).json(user);
}

const updateuser = async (req,res) => {
    const { infouser, user} = req.body;
    try {
        const data = await service.updateuser(infouser, user);
        const json = data.toJSON();
        delete json.password;
        delete json.email;
        delete json.pubDate;
        delete json.modDate;
        res.status(200).json(json);
    } catch(error) {
        res.status(400).json({"message" : "이미 사용중이 계정 ID입니다."})
    }
}

const search =  async (req, res) => {
    const { keyword } = req.query;
    try {
        const data = await service.search(keyword);
        res.status(200).json(data);
    }catch(error) {
        res.status(400).json({"message" : error});
    }
}
module.exports = {sign, login, alluser, updateuser, search};