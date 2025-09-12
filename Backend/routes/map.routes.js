const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleware/auth.middleware.js");
const mapController = require("../controller/maps.controller.js");
const { query } = require('express-validator');


router.get("/get-coordinates" ,
     query('address').isString().isLength({min: 3}),
    authMiddleWare.authUser , mapController.getCoordinates );

router.get("/get-distance-time" , 
    query('origin').isString().isLength({ min: 3}),
    query('destination').isString().isLength({ min:3}),
    authMiddleWare.authUser,
    mapController.getDistanceTime
);


router.get("/get-suggestions" , 
    query('input').isString().isLength({ min: 3}),
    authMiddleWare.authUser,
    mapController.getAutoCompleteSuggestions
);

module.exports = router;     