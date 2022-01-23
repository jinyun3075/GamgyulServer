const data = require('./Schema/userSchema');
const bcrypt = require('bcrypt')
const create = (user)=>{
    const pw = bcrypt.hashSync(user.password,10);
    const Schema = new data({
        email : user.email,
        password : pw,
        username : user.username,
        accountname : user.accountname,
        intro : user.intro,
        image : user.image
    })
    return Schema.save();
}
const login = async (user)=> {
    const dbuser = await data.findOne({email:user.email});
    if(!dbuser) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    const result = await bcrypt.compare(user.password, dbuser.password);
    if(!result){
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    return dbuser;
}
module.exports = {create, login};