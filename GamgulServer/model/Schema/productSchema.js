const mongoose = require("mongoose");

const schema = mongoose.Schema({
    itemName: {
        type: String,
        require: "상품 이름을 입력해주세요."
    },
    price: {
        type: Number,
        require: "가격을 입력해주세요.",
    },
    link: String,
    itemImage: String,
    author: {
        type: String,
        require: true
    }
});

schema.post('save', (error, doc, next) => {
    if(error.errors.price.reason.code == 'ERR_ASSERTION') {
        next(new Error("가격은 숫자로 입력하셔야 합니다."));
    }
    next(error);
});

schema.post('findOne', (error, doc, next) => {
    if(error.kind=="ObjectId"){
        next(new Error("존재하지 않는 게시글입니다."));
    }
    next(error);
})

module.exports = mongoose.model("product", schema);