const service = require('../model/postService')

const create = async (req,res) => {
    const { post, infouser } = req.body;
    const data = await service.create(post,infouser.id);
    console.log(data);
}

module.exports = {create};