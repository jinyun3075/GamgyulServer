const fs = require('fs');
const getImage = (req, res) => {
    const { img } =req.params;
    const type = img.split('.')[1];
    fs.readFile('upload/'+img,(err,data)=> {
        // res.writeHead(200, {"Context-Type": "image/jpg"});
        // res.write(data);
        // res.end();
        res.status(200).type(type).send(data)
    })
}
const imageOne = (req, res) => {
    if(req.file){
        const img = req.file;
        res.status(200).json(img);
    }else {
        res.status(error.status).json({ "message" : "upload fail" });
    }
}
const imageMany =  (req, res) => {
    if(req.files.length!=0){
        const img = req.files;
        res.status(200).json(img);
    }else {
        res.status(error.status).json({ "message" : "uploads fail" });
    }
}
module.exports = {imageOne, imageMany, getImage};