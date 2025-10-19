const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const captainController = require("../controller/captainController.js");
const authMiddleWare = require("../middleware/auth.middleware.js");

router.post("/register" , [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname must be at least 3 characters long"),
    body("vehicle.color").isString().withMessage("Vehicle color must be a string"),
    body("vehicle.plate").isString().withMessage("Vehicle plate must be a string"), 
    body("vehicle.capacity").isInt({min:1}).withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(['car' , 'bike' , 'auto']).withMessage("Vehicle type must be either car, bike or auto"),
] , captainController.registerCaptain);

router.post("/login" , [
     body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
], captainController.loginCaptain);

router.get("/logout" , authMiddleWare.authCaptain , captainController.logoutCaptain);
router.get("/profile" , authMiddleWare.authCaptain , captainController.getCaptinProfile);






module.exports = router;