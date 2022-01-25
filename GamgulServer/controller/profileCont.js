const service = require('../model/profileService')

const preprofile = async (req,res) => {
    const { accountname } = req.params;
    const { infouser } = req.body;
    try {
        const data = await service.preprofile(accountname);
        const json = data[0].toJSON()
        delete json.email;
        delete json.password;
        delete json.hearts;
        delete json.pubDate;
        delete json.modDate;
        const result = data[0].following.find(id => id == infouser.id);
        if(result) {
            json.isfollow = true;
        } else {
            json.isfollow = false;
        }
        res.status(200).json(json);
    } catch(error) {
        res.status(400).json({"message" : "profile fail"})
    }
}

module.exports = {preprofile}