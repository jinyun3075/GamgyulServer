const service = require('../model/userService')

const sign = async (req, res, next)=> {
    const { user } = req.body;
    if(user.password.length<6){
        res.status(400).send({"message": "비밀번호는 6자 이상이여야 합니다."});
        return next();
    }
    try{
        const data = await service.create(user);
        console.log(await service.find());
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message": error.message})
    }
}

module.exports = {sign}