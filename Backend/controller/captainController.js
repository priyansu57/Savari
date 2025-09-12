const captainModel = require("../Models/captain.model.js");
const createService = require("../services/captain.service.js");
const {validationResult} = require("express-validator")
const BlacklistTokenModel = require("../Models/blacklistModel.js");

module.exports.registerCaptain = async (req , res) => {
  
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
 }

 const {fullname , email , password , vehicle} = req.body;

 console.log("fullname :" , fullname + "\n" + "email :" + email + "\n" + "password : " + password + "\n" + "vehicle : "  , vehicle);
 

  const isCaptain = await captainModel.findOne({email});

  if (isCaptain) {
     return res.status(400).json({ message: "Captain already exist."});
  };

 const hashPassword = await captainModel.hashPassword(password);

 const captain = await createService.createCaptain ({
    fullname,
    email,
    password:hashPassword,
    vehicle
 }) ;

 const captainToken = captain.generateAuthToken();

 res.cookie("captainToken" , captainToken);

 res.status(201).json({captainToken , captain});

};


module.exports.loginCaptain = async (req ,res) => {

     const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.status(400).json({errors: errors.array()});
     };

     const {email , password} = req.body;

     const captain = await captainModel.findOne({email}).select("+password");

     if(!captain) {
        res.status(400).json({message: "Invalid email and password"});
     };

     const isMatch = await captain.comaparePassword(password);

     if(!isMatch) {
        res.status(400).json({message: "Invalid email and password"});
     };

     const captaintoken = await captain.generateAuthToken();
     res.cookie("captainToken" , captaintoken);
     res.status(200).json({captaintoken , captain});

};

module.exports.logoutCaptain = async (req ,res) => {
       
    const token = req.cookies.captaintoken || req.headers.authorization?.split(' ')[1];
     await BlacklistTokenModel.create({token});

     res.clearCookie('captainToken');
    res.status(200).json({message: "Logged out"});
};

module.exports.getCaptinProfile = async (req,res) => {
    res.status(200).json({ captain: req.captain})
};

