const mongoose = require("mongoose");

const db = async ()=>{
    mongoose.connect(process.env.DATA_URL);
    const db = mongoose.connection;
    db.on('error',()=>{
        console.log("DB연결 실패");
    });
    db.once('open',()=> {
        console.log("DB연결 성공");
    });
}
module.exports = db;