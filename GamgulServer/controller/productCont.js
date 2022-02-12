const service = require('../model/productService')

const register = async (req, res) => {
    const {product, infouser} = req.body;
    try{
        const data = await service.register(product, infouser);
        res.status(200).json(data);
    }catch(error) {
        res.status(400).json(error.message);
    }
}

module.exports = { register }