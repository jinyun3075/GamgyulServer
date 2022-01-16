const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imgCont = require('../controller/imgCont');

const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cd) => {
        // try{
        //     fs.accessSync('upload/'+req.params.name);
        // } catch(error) {
        //     fs.mkdirSync('upload/'+req.params.name);
        // }
        cd(null, 'upload/');
    },
    filename:(req, file, cd)=>{
        const name = file.originalname;
        cd(null, name);
    }
})
const upload = multer ({
    storage: storage,
    fileFilter : (req, file, callback )=>{
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(res.end('이미지만 넣어라!!'), null);
        }
        callback(null,true);
    },
    limit : { fileSize:5*1024*1024 },
});

router.get('/:img', imgCont.getImage);

router.post('/uploadfile',upload.single('image'), imgCont.imageOne);

router.post('/uploadfiles',upload.array('images',3), imgCont.imageMany);

module.exports = router;