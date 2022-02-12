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

module.exports = { register };