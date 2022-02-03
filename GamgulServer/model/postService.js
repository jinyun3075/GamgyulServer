const data = require('./Schema/postSchema');
const user = require('./Schema/userSchema').model;
const create = async (post,id)=>{
    const Schema = new data({
        content : post.content,
        image : post.image,
        author : id
    });
    const author = await user.findById(id);
    const json = await Schema.save();
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

module.exports = {create};