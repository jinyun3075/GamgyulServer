const data = require('./Schema/userSchema');
const bcrypt = require('bcrypt')
const create= async (user)=>{
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
// const login = async (user)=> {
//     const Schema = data.find({email:user.email,password:user.password})
// }
module.exports = {create, login};