const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        require:true,
        unique:true,
    },
    creatAt:{
        type:Date,
        default:Date.now,
        expires: 86400,
    },
});

module.exports = mongoose.model("BlacklistToken",blacklistSchema);