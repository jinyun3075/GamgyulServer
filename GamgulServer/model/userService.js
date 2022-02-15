const data = require('./Schema/userSchema').model;
const bcrypt = require('bcrypt')
const create = async (user) => {
    if (!user.email || !user.username || !user.accountname || !user.password){
        throw new Error("필수 사항을 모두 입력해주세요");
    }
    if (user.password.length < 6) {
        throw new Error("비밀번호는 6자 이상이여야 합니다.");
    }
    const pw = bcrypt.hashSync(user.password, 10);
    const Schema = new data({
        email: user.email,
        password: pw,
        username: user.username,
        accountname: user.accountname,
        intro: user.intro,
        image: user.image
    })
    const res = await Schema.save();
    const json = res.toJSON();
    delete json.password;
    return json
}
const login = async (user) => {
    if (!user.email && !user.password) {
        throw new Error("이메일 또는 비밀번호를 입력해주세요.")
    } else if (!user.email) {
        throw new Error("이메일을 입력해주세요.")
    } else if (!user.password) {
        throw new Error("비밀번호를 입력해주세요.")
    }
    const dbuser = await data.findOne({ email: user.email });
    if (!dbuser) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    const result = await bcrypt.compare(user.password, dbuser.password);
    if (!result) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    return dbuser;
}

const alluser = () => {
    return data.find();
}

const updateuser = async (infouser, user) => {
    const id = infouser.id;
    const dao = await data.findByIdAndUpdate(id,
        {
            username: user.username,
            accountname: user.accountname,
            intro: user.intro,
            image: user.image
        },
        { new: true }
    );
    const json = dao.toJSON();
    delete json.password;
    delete json.email;
    delete json.pubDate;
    delete json.modDate;
    return json
}

const search = async (keyword) => {
    const user = await data.find({ $or: [{ username: new RegExp(keyword) }, { accountname: new RegExp(keyword) }] });
    const dtolist = [];
    for (const id of user) {
        let dto = await data.findById(id);
        let json = dto.toJSON();
        delete json.intro;
        delete json.image;
        delete json.hearts;
        delete json.email;
        delete json.password;
        delete json.pubDate;
        delete json.modDate;
        json.followerCount = dto.follower.length;
        json.followingCount = dto.following.length;
        dtolist.push(json);
    }
    return dtolist;
}

module.exports = { create, login, alluser, updateuser, search };