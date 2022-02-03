const service = require('../model/postService')

const create = async (req,res) => {
    const { post, infouser } = req.body;
    try{
        const data = await service.create(post,infouser.id);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json(error.message);
    }
}

const feed = async (req,res) => {
    const query = req.query;
    const { infouser } = req.body
    try{
        const data = await service.list(query, infouser.id);
        res.status(200).json({"post":data});
    }catch(error) {
        res.status(400).json(error);
    }
}

module.exports = { create, feed };