const mongoose = require("mongoose");

const setDB = async ()=>{
    mongoose.connect(process.env.DATA_URL);
    // mongoose.connect(process.env.LOCAL);
    const db = mongoose.connection;
    db.on('error',()=>{
        console.log("DB연결 실패");
    });
    db.once('open',()=> {
        console.log("DB연결 성공");
    });
}
module.exports = setDB;