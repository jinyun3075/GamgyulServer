const mongoose = require("mongoose");
const schema = mongoose.Schema({
    content: {
        type: String,
        require: "내용을 입력해 주세요.",
    },
    image : {
        type: Array,
        require: "이미지를 입력해 주세요.",
    },
    hearts: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    author: {
        type : String
    },
    pubDate: {
        type: Date,
        default: Date.now
    },
    modDate : {
        type: Date,
        default: Date.now
    }
})

schema.post('findOne', function(error, doc, next) {
    if(error.kind=="ObjectId"){
        next(new Error("존재하지 않는 게시글입니다."))
    }
    next(error);
})

schema.post('findById',function(error,doc,next){
    next(error)
})
module.exports = mongoose.model("post",schema);