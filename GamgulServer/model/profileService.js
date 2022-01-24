const userdata = require('./Schema/userSchema');
const profiledata = require('./Schema/profileSchema');

const preprofile = (accountname)=> {
    return userdata.find({accountname});
}
module.exports = {preprofile};