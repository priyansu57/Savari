const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/userController.js");
const authMiddleware = require("../middleware/auth.middleware.js");

router.post("/register" , [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname must be 3 character!!"),
    body("password").isLength({min:6}).withMessage("Passwor must be 6 character!!"),
] , userController.registerUser );

router.post("/login" , [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Passwor must be 6 character!!"),
] , userController.loginUser );


router.get("/profile" , authMiddleware.authUser, userController.getUserProfile);
router.get("/logout" ,authMiddleware.authUser , userController.logoutUser );














module.exports = router;