const productEntity = require('./Schema/productSchema');
const user = require('./Schema/userSchema').model;

const register = async (product, infouser) => {
    if(!product.itemName || !product.price || !product.link || !product.itemImage){
        throw new Error("필수 입력사항을 입력해주세요.");
    }
    const create = new productEntity({
        itemName: product.itemName,
        price: product.price,
        link: product.link,
        itemImage: product.itemImage,
        author: infouser.id
    });
    const data = await create.save();
    const info = await user.findById(infouser.id);
    const infojson = setInfo(info);
    const datajson = data.toJSON();
    datajson.author = infojson;
    return datajson;
}

const list = async (query, accountname) => {
    const infouser = await user.findOne({accountname});
    const daolist = await productEntity.find({author:infouser.id}).limit(query.limit).skip(query.skip);
    const infoJson = setInfo(infouser);
    const dto = [];
    for (const dao of daolist) {
        const json = dao.toJSON();
        json.author = infoJson;
        dto.push(json);
    }
    return dto;
}

const view = async (product_id) => {
    const entity = await productEntity.findById(product_id);
    const user_id = entity.author;
    const infouser = await user.findById(user_id);
    const infoJson = setInfo(infouser);
    const json = entity.toJSON();
    json.author = infoJson;
    return json;
}

const update = async (dto, product_id) => {
    const com = await productEntity.findOne({_id:product_id});
    if(com == null) {
        throw new Error('등록된 상품이 없습니다.');
    }
    if(com.author == dto.infouser.id) {
        const entity = await productEntity.findByIdAndUpdate(product_id,{
            itemName: dto.product.itemName,
            price: dto.product.price,
            link: dto.product.link,
            itemImage: dto.product.itemImage
        },{new:true});
        const infouser = await user.findById(entity.author);
        const infoJson = setInfo(infouser);
        const json = entity.toJSON();
        json.author = infoJson;
        return json;
    }
    throw new Error("잘못된 요청입니다. 로그인 정보를 확인하세요.");
}

const deleteProduct = async (product_id, infouser) => {
    const com = await productEntity.findOne({_id:product_id});
    if(com == null) {
        throw new Error('등록된 상품이 없습니다.');
    }
    if(com.author == infouser.id) {
        await productEntity.deleteOne({_id:product_id});
        return;
    }
    throw new Error("잘못된 요청입니다. 로그인 정보를 확인하세요.");
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

module.exports = { register, list, view, update, deleteProduct };