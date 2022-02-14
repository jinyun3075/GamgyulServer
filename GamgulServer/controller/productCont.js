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

const list = async (req, res) => {
    const query = req.query;
    const {accountname} = req.params;
    try {
        const data = await service.list(query, accountname);
        res.status(200).json({"data":data.length,"product":data});
    }catch(error) {
        res.status(400).json(error.message);
    }
}

const view = async (req, res) => {
    const { product_id } = req.params;
    try {
        const data = await service.view(product_id);
        res.status(200).json(data);
    }catch(error) {
        res.status(400).json(error.message);
    }
}
module.exports = { register, list, view }