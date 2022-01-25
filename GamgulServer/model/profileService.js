const userdata = require('./Schema/userSchema');
const profiledata = require('./Schema/profileSchema');

const preprofile = (accountname)=> {
    return userdata.find({accountname});
}

const follow = async (accountname, infouser) => {
    const id = infouser.id;
    let follower = await userdata.findOneAndUpdate({accountname},
    {$push:{follower : id}},{new:true});

    let following = await userdata.findByIdAndUpdate(id,
    {$push:{following : follower.id}},{new:true});
    
    follower = follower.toJSON();
    following = following.toJSON();

    delete follower.password;
    delete following.password;
    delete follower.modDate;
    delete following.modDate;
    delete follower.pubDate;
    delete following.pubDate;
    
    follower.followerCount = follower.follower.length;
    following.followerCount = following.follower.length;
    follower.followingCount = follower.following.length;
    following.followingCount = following.following.length;

    const data = [];
    data.push(follower);
    data.push(following);
    return data;
}
module.exports = {preprofile, follow};