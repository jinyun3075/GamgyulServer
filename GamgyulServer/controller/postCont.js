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

const getMyList = async (req, res) => {
    const { accountname } = req.params;
    const query = req.query;
    try {
        const data = await service.getMyList(accountname, query);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json(error.message);
    }
}

const view = async (req, res) => {
    const { post_id } = req.params;
    try {
        const data = await service.view(post_id);
        res.status(200).json(data);
    }catch(error) {
        res.status(400).json(error.message);
    }
    
}

const update = async (req, res) => {
    const { post_id } = req.params;
    const { post, infouser } = req.body;
    try {
        const data = await service.update(post, post_id, infouser);
        res.status(200).json(data);
    }catch(error) {
        res.status(400).json(error.message);
    }
}

const deletePost = async (req, res) => {
    const { post_id } = req.params;
    const { infouser } = req.body;
    try {
        await service.deletePost(post_id, infouser);
        res.status(200).json("삭제되었습니다.")
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const heart = async (req, res) => {
    const {infouser} = req.body;
    const {post_id} = req.params;
    try {
        const data = await service.heart(post_id, infouser);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const unheart = async (req, res) => {
    const {infouser} = req.body;
    const {post_id} = req.params;
    try {
        const data = await service.unheart(post_id, infouser);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const comment = async (req, res) => {
    const {infouser, comment} = req.body;
    const {post_id} = req.params;
    try {
        const data = await service.comment(infouser, comment, post_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

const commentList = async (req, res) => {
    const {post_id} = req.params;
    const query = req.query;

    try {
        const data = await service.commentList(post_id, query);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json(error.message);
    }
}

const deleteComment = async(req, res) => {
    const { post_id, comment_id } = req.params;
    const { infouser } = req.body;
    try {
        await service.deleteComment(post_id, comment_id, infouser);
        res.status(200).json("삭제되었습니다.");
    } catch(error) {
        res.status(400).json(error.message);
    }
}
module.exports = { create, feed, getMyList, view, update, deletePost, heart, unheart, comment, commentList, deleteComment};