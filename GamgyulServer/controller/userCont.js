const service = require('../model/userService')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sign = async (req, res, next) => {
    const { user } = req.body;
    try {
        const data = await service.create(user);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

const login = async (req, res) => {
    const user = req.body.user;
    try {
        const data = await service.login(user)
        const token = bcrypt.hashSync(process.env.TOKEN, 10);
        const sendData = {
            user: {
                "_id": data._id,
                "username": data.username,
                "email": data.email,
                "accountname": data.accountname,
                "image": data.image,
                "token": token,
            }
        }
        const token2 = jwt.sign({
            _id: data._id,
        }, process.env.TOKEN2,
            {
                expiresIn: "3d",
            });
        res.cookie("access_token", token2, {
            maxAge: 1000 * 60 * 60 * 24 * 3,
            httpOnly: true
        });
        res.status(200).json(sendData);
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

const alluser = async (req, res) => {
    try {
        const user = await service.alluser();
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
}

const updateuser = async (req, res) => {
    const { infouser, user } = req.body;
    try {
        const data = await service.updateuser(infouser, user);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ "message": "이미 사용중이 계정 ID입니다." })
    }
}

const search = async (req, res) => {
    const { keyword } = req.query;
    try {
        const data = await service.search(keyword);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ "message": error });
    }
}
module.exports = { sign, login, alluser, updateuser, search };