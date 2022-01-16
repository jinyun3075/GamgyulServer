const service = require('../model/userService')

const sign = async (req, res)=> {
    const { user } = req.body;
    try{
        const data = await service.create(user);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json({"message": error.message})
    }
}

module.exports = {sign}