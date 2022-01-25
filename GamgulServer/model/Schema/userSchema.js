const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = mongoose.Schema({
    username: {
        type: String,
        maxLength: 100,
        require: "필수 입력사항을 입력해주세요.",
    },
    accountname : {
        type: String,
        maxLength: 100,
        require: "필수 입력사항을 입력해주세요.",
        validate:[
            (accountname)=> {
                return !/[^a-z|^A-Z|^가-힣|^/.|^/_|^0-9]/g.test(accountname);
            },'영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'
        ],
        unique: true
    },
    email : {
        type: String,
        require: "필수 입력사항을 입력해주세요.",
        validate:[
            (email)=>{
                return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email);
            },'잘못된 이메일 형식입니다.'
        ],
        unique: true
    },
    password : {
        type: String,
        require: "필수 입려사항을 입력해주세요."
    }
    ,
    intro: {
        type: String,
        maxLength:500,
        require: false
    },
    image: {
        type: String,
        default: "default.png"
    },
    hearts: {
        type: Schema.Types.Mixed,
        default: []
    },
    following:{
        type: Schema.Types.Mixed,
        default: [],
        unique: true
    },
    follower: {
        type: Schema.Types.Mixed,
        default: [],
        unique: true
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
schema.post('save', function(error, doc, next) {
        if(error.keyValue){
            const {email, accountname} = error.keyValue;
            if (email && error.code === 11000) {
                next(new Error('이미 가입된 이메일주소입니다.'));
            } else if(accountname && error.code === 11000){
                next(new Error('이미 사용중인 계정 ID입니다.'))
            }
            else {
                next(error);
            }
        }
        next(error);
    }
)
// schema.method = ()=> {
//     return {
//         username : this.username
//     }
// }
// schema.method.toAuthJson = ()=> {
//     return {
//         username : this.username
//     }
// }
// schema.methods = ()=> {
//     return {
//         username : this.username
//     }
// }
module.exports = mongoose.model("post",schema);