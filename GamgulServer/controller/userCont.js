const service = require('../model/userService')

const sign = async (req, res, next)=> {
    const { user } = req.body;
    if(user.password.length<6){
        res.status(400).send({"message": "비밀번호는 6자 이상이여야 합니다."});
        return next();
    }
    try{
        const data = await service.create(user);
        const resdata = {
            _id : data._id,
            username : data.username,
            acoountname : data.accountname,
            email : data.email,
            intro : data.intro,
            image : data.image,
            hearts : data.hearts,
            following : data.following,
            follower : data.follower,
            followCount : data.followCount
        }
        res.status(200).json(resdata);
    } catch(error) {
        res.status(400).json({"message": error.message})
    }
}

const login = async (req, res) => {

}

module.exports = {sign, login};