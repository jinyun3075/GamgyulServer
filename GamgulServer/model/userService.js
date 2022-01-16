const data = require('./Schema/userSchema');

const create= async (user)=>{
    const Schema = new data({
        email : user.email,
        password : user.password,
        username : user.username,
        accountname : user.accountname,
        intro : user.intro,
        image : user.image
    })
    return Schema.save();
}

module.exports = {create};