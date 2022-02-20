const service = require('../model/profileService')

const preprofile = async (req,res) => {
    const { accountname } = req.params;
    const { infouser } = req.body;
    try {
        const data = await service.preprofile(accountname, infouser);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message" : "profile fail"})
    }
}

const follow = async (req, res) => {
    const { accountname } = req.params;
    const { infouser } = req.body;
    try {
        const data = await service.follow(accountname, infouser);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message" : "해당 계정이 존재하지 않습니다."});
    }
}

const unfollow = async (req, res) => {
    const { accountname } = req.params;
    const { infouser } = req.body;
    try {
        const data = await service.unfollow(accountname, infouser);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message" : "해당 계정이 존재하지 않습니다."});
    }
}

const followingList = async (req, res) => {
    const query = req.query; // {limit, skip}
    const { accountname } = req.params;
    try {
        const data = await service.followingList(accountname, query);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message":"해당 계정이 존재하지 않습니다."});
    }
}

const followerList = async (req, res) => {
    const query = req.query;
    const { accountname } = req.params;
    try {
        const data = await service.followerList(accountname, query);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message":"해당 계정이 존재하지 않습니다."})
    }
}
module.exports = {preprofile, follow, unfollow, followingList, followerList}