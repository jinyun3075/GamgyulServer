const userdata = require('./Schema/userSchema');
const profiledata = require('./Schema/profileSchema');

const preprofile = async (accountname, infouser)=> {
    const data = await userdata.find({accountname});
    const json = data[0].toJSON();
        delete json.email;
        delete json.password;
        delete json.hearts;
        delete json.pubDate;
        delete json.modDate;
        const result = checkfollow(data[0], infouser.id);
        if(result) {
            json.isfollow = true;
        } else {
            json.isfollow = false;
        }
        return json;
}

const follow = async (accountname, infouser) => {
    const id = infouser.id;
    let follower = await userdata.findOneAndUpdate({accountname},
    {$push:{follower : id}},{new:true});

    let following = await userdata.findByIdAndUpdate(id,
    {$push:{following : follower.id}},{new:true});
    
    const check1 = checkfollow(follower,id);
    const check2 = checkfollow(following,follower.id);

    follower = follower.toJSON();
    following = following.toJSON();
    
    followDto(follower,following,check1,check2);

    const data = [];
    data.push(follower);
    data.push(following);
    return data;
}

const unfollow = async (accountname, infouser) => {
    const id = infouser.id;
    let follower = await userdata.findOneAndUpdate({accountname},
    {$pull:{follower : id}},{new:true});

    let following = await userdata.findByIdAndUpdate(id,
    {$pull:{following : follower.id}},{new:true});

    const check1 = checkfollow(follower,id);
    const check2 = checkfollow(following,follower.id);

    follower = follower.toJSON();
    following = following.toJSON();
    followDto(follower,following,check1,check2);

    const data = [];
    data.push(follower);
    data.push(following);
    return data;
}

const checkfollow = (follow, infouserid) => {
    return follow.follower.find(id => id == infouserid);
}

const followDto = (follower,following,check1,check2)=> {
    if(check1) {
        follower.isfollow = true;
    } else {
        follower.isfollow = false;
    }
    if(check2) {
        following.isfollow = true;
    } else {
        following.isfollow = false;
    }
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
}
module.exports = {preprofile, follow, unfollow};