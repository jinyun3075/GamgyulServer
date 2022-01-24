const service = require('../model/profileService')

const preprofile = async (req,res) => {
    const { accountname } = req.params;
    const data = await service.preprofile(accountname);
    res.status(200).json(data);
}

module.exports = {preprofile}