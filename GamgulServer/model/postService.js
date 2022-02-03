const data = require('./Schema/postSchema');
const user = require('./Schema/userSchema').model;
const create = async (post,id)=>{
    const Schema = new data({
        content : post.content,
        image : post.image,
        author : id
    });
    const json = await Schema.save();
    const author = await user.findById(json.author);
    const my = author.toJSON();
    const dto = json.toJSON();
    delete my.password;
    delete my.email;
    delete my.intro;
    delete my.pubDate;
    delete my.modDate;
    dto.heartCount = dto.hearts.length;
    dto.commentCount = dto.comments.length;
    delete dto.hearts;
    delete dto.comments;
    dto.hearted = false;
    dto.author = my;
    return dto;
}

const list = async (query, id) => {
    const my = await user.findById(id);
    const dto =[];
    for (const follow of my.following) {
        const id = await user.findById(follow);
        const board = await data.find({id});
        const my = id.toJSON();
        delete my.password;
        delete my.email;
        delete my.intro;
        delete my.pubDate;
        delete my.modDate;
        for (const iter of board) {
            const json = iter.toJSON();
            json.heartCount = json.hearts.length;
            json.commentCount = json.comments.length;
            delete json.hearts;
            delete json.comments;
            json.hearted = false;
            json.author = my;
            dto.push(json);
        }
    }
    return dto;
    // .skip(query.skip).limit(query.limit);
}
module.exports = { create, list };