const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = mongoose.Schema({
    username: String,
    accountname: String,
    intro: String,
    image: String,
    isfollow: Boolean,
    following: Array,
    follower: Array,
    followerCount: Number,
    followingCount: Number
})

module.exports = mongoose.model("profile",schema);