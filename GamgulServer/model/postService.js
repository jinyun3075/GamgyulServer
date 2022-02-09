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
    const infouser = setInfo(author);
    return setPost(json,infouser);
}

const list = async (query, id) => {
    const my = await user.findById(id);
    const dto =[];
    for (const follow of my.following) {
        const info = await user.findById(follow);
        const infoid = info.id;
        const board = await data.find({author:infoid});
        const infouser = setInfo(info);
        dto.push(setListPost(board ,infouser));
    }
    return dto;
    // .skip(query.skip).limit(query.limit);
}

const getMyList = async (accountname, query) => {
    const info = await user.findOne({accountname});
    const id = info.id;
    const post = await data.find({author:id}).skip(query.skip).limit(query.limit);
    const infojson = setInfo(info);
    return setListPost(post, infojson);
}

const view = async (post_id) => {
    const post = await data.findById(post_id);
    const userinfo = await user.findById(post.author);
    const infojson = setInfo(userinfo);
    return setPost(post,infojson);
}

const update = async (post, post_id, infouser) => {
    const check = await data.findOne({_id:post_id});
    if(check.author==infouser.id){
        const dto = await data.findByIdAndUpdate(post_id,
            {
                content: post.content,
                image: post.image
            },{new:true});
        const info = await user.findById(infouser.id);
        const infojson = setInfo(info);
        return setPost(dto, infojson);
    }else  {
        throw new Error("잘못된 요청입니다. 로그인 정보를 확인하세요")
    }
}

const deletePost = async (post_id, infouser) => {
    const check = await data.findOne({_id:post_id});
    if(check.author==infouser.id){
        return data.findByIdAndDelete(post_id);
    } else {
        throw new Error("잘못된 요청입니다. 로그인 정보를 확인하세요")
    }
}

const setInfo = (info) => {
    const infojson = info.toJSON();
    delete infojson.password;
    delete infojson.email;
    delete infojson.intro;
    delete infojson.pubDate;
    delete infojson.modDate;
    infojson.followingCount = info.following.length;
    infojson.followerCount = info.follower.length;
    return infojson;
}

const setPost = (post, infojson) => {
    const json = post.toJSON();
    json.heartCount = json.hearts.length;
    json.commentCount = json.comments.length;
    delete json.hearts;
    delete json.comments;
    json.hearted = false;
    json.author = infojson;
    return json;
}
const setListPost = (post, infojson) => {
    const dto =[];
    for (const list of post) {
        const json = list.toJSON();
        json.heartCount = json.hearts.length;
        json.commentCount = json.comments.length;
        delete json.hearts;
        delete json.comments;
        json.hearted = false;
        json.author = infojson;
        dto.push(json);
    }
    return dto;
}
module.exports = { create, list, getMyList, view, update , deletePost};