const express = require('express');
const {body, query} = require('express-validator');
const rideController = require("../controller/ride.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/create" , 
    authMiddleware.authUser,
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(['auto' , 'car' , 'bike' , 'premier']).withMessage("Invalid vehicle type"),
     rideController.createRide
);

router.get("/get-fare",
    authMiddleware.authUser,
    query("pickup").isString().isLength({min:3}).withMessage("Invalid pickup address"),
    query("destination").isString().isLength({min:3}).withMessage("Invalid destination address"),
    rideController.getFare
);

router.post("/confirm-ride",
    authMiddleware.authCaptain,
    body("rideId").isString().isLength({min:10}).withMessage("Invalid ride id"),
    rideController.confirmRide
);

router.post("/verify-otp" , 
    authMiddleware.authCaptain,
    body("otp").isString().isLength({min:4}).withMessage("Invalid OTP"),
    body("rideId").isString().isLength({min:10}).withMessage("Invalid ride id"),
    rideController.verifyOtp
);

router.post("/finish-ride" ,
    authMiddleware.authCaptain,
    body("rideId").isString().isLength({min:10}).withMessage("Invalid ride id"),
    rideController.finishRide
);

module.exports = router;