const userModel = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistTokenModel = require("../Models/blacklistModel.js");
const captainModel = require("../Models/captain.model.js");

module.exports.authUser = async( req , res , next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
     
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    };

    const isBlacklisted = await BlacklistTokenModel.findOne({token});

    // console.log("Blacklist : " + isBlacklisted);
    
     if (isBlacklisted) {
        return res.status(401).json({message: "Unauthorized from Blacklist"});
    };


    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

      next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});        
    }
   
}; 


module.exports.authCaptain = async( req , res , next) => {
    const token = req.cookies.captainToken || req.headers.authorization?.split(' ')[ 1 ];
    
    // console.log("CaptainToken :" + token);
    

    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    };

    const isBlacklisted = await BlacklistTokenModel.findOne({token});

    //  console.log("Blacklist captain : " + isBlacklisted);
    
     if (isBlacklisted) {
        return res.status(401).json({message: "Unauthorized from Blacklist"});
    };


    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

      next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized "});        
    }
   
}; 