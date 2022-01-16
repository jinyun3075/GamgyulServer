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
                return /^[a-zA-z/][\.\_0-9]*/
            },'영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.'
        ],
        unique: [true,'이미 사용중인 계정 ID입니다.']
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
        validate:[
            function(password){
            return password&&password.length>5;
            },'비밀번호는 6자 이상이여야 합니다.'
        ]
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
        default: []
    },
    follower: {
        type: Schema.Types.Mixed,
        default: []
    },
    followCount: {
        type: Number,
        default:0
    },
    pubDate: {
        type: Date,
        default: Date.now
    },
    modData : {
        type: Date,
        default: Date.now
    }
})
schema.post('save', function(error, doc, next) {
    const {email, accountname} = error.keyValue;
    console.log(email+""+accountname)
    if (email && error.code === 11000) {
        next(new Error('이미 가입된 이메일주소입니다.'));
    } else if(accountname && error.code === 11000){
        next(new Error('이미 사용중인 계정 ID입니다.'))
    }
    else {
        next(error);
    }
})
module.exports = mongoose.model("post",schema);