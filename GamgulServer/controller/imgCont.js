const fs = require('fs');
const getImage = (req, res) => {
    const { img } =req.params;
    try {
        const type = img.split('.')[1];
        fs.readFile('upload/'+img,(err,data)=> {
                // res.writeHead(200, {"Context-Type": "image/jpg"});
                // res.write(data);
                // res.end();
                res.status(200).type(type).send(data)
            }
        )
    }catch(error) {
        res.status(400).json({"error":error.message});
    }
}
const imageOne = (req, res) => {
    try {
        const img= req.file;
        res.status(200).json(img);
    } catch(error) {
        res.status(400).json({ "message" : "upload fail" });
    }
}
const imageMany = async (req, res) => {
    try{
        const img = req.files;
        res.status(200).json(img);
    }catch {
        res.status(400).json({ "message" : "uploads fail" });
    }
}
module.exports = {imageOne, imageMany, getImage};