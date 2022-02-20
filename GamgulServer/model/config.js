const mongoose = require("mongoose");

const setDB = async ()=>{
    // mongoose.connect(process.env.DATA_URL,{useNewUrlParser:true}); // Atlas DB
    mongoose.connect(process.env.DOCKER,{useNewUrlParser:true}); // 도커 DB
    // mongoose.connect(process.env.LOCAL,{useNewUrlParser:true}); // 로컬 DB
    const db = mongoose.connection;
    db.on('error',()=>{
        console.log("DB연결 실패");
    });
    db.once('open',()=> {
        console.log("DB연결 성공");
    });
}
module.exports = setDB;