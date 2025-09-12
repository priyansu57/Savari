const { validationResult } = require("express-validator");
const rideService = require("../services/ride.services.js");
const mapService = require("../services/map.service.js");
const { sendMessageToSocketId } = require("../Socket/Socket.js");
const rideSchema = require("../Models/rideSchema.js");


module.exports.createRide = async ( req , res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }

    const { pickup , destination , vehicleType ,paymentType }= req.body;

    try {

        const ride = await rideService.createRide({user: req.user , pickup , destination , vehicleType , paymentType});
        // console.log( "Created ride:", ride);


         if (ride) {
                const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
                // console.log("Pickup coordinates:", pickupCoordinates);

                const destinationCoordinates = await mapService.getAddressCoordinate(destination);
                // console.log("Destination coordinates:", destinationCoordinates);

                const captainInRadius = await mapService.getCaptainsInTheRadius( pickupCoordinates.ltd , pickupCoordinates.lng , 5 , vehicleType);
                // console.log("Captains in radius:", captainInRadius);
               
                const userRide = await rideSchema.findById(ride._id).populate("user");
                userRide.otp = '';

                captainInRadius.map( (captain) => {
                    sendMessageToSocketId(captain.socketId , {
                        event: "new-ride-request",
                        data: userRide,
                    });
                });

                return res.status(201).json(ride);
         }

    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ message: error.message })
    }

};


module.exports.getFare = async (req , res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors : errors.array()})
        }

        const {pickup, destination} = req.query;

        // console.log({pickup, destination});
        

        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.log(error);
       return res.status(500).json({message: "Internal server error."})
    }
}

module.exports.confirmRide = async (req , res) => {

    const errors = validationResult(req);       
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }   
     
    const { rideId }= req.body;

    try {       

        const ride  = await rideService.confirmRide({ captain: req.captain , rideId });
        if(!ride){
            return res.status(404).json({ message: "Ride not found or already confirmed by another captain." });
        }

        await sendMessageToSocketId(ride.user.socketId , {
            event: "ride-confirmed",
            data: ride,
        });

        return res.status(200).json({ message: "Ride confirmed successfully" });
    } catch (error) {
        console.error("Error confirming ride:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.verifyOtp = async (req , res) => {

    const errors = validationResult(req);       
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }
    const { otp , rideId }= req.body;
    try {
        if(!otp){
            return res.status(400).json({ message: "OTP is required" });
        }

        const ride = await rideService.verifyOtp({ otp, rideId });
        if(!ride){
            return res.status(404).json({ message: "Ride not found or OTP is invalid." });
        }

        await sendMessageToSocketId(ride.captain.socketId , {
                event: "ride-started",
                data: ride,
            });
            
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports.finishRide = async (req , res) => {

    const errors = validationResult(req);       
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
    }
    const { rideId }= req.body;
    try {
        if(!rideId){
            return res.status(400).json({ message: "Ride ID is required" });
        }   
        const ride = await rideService.finishRide({ rideId });
        if(!ride){
            return res.status(404).json({ message: "Ride not found or cannot be finished." });
        }

       await sendMessageToSocketId(ride.user.socketId , {
                event: "ride-completed",
                data: ride,
            }); 
        await sendMessageToSocketId(ride.captain.socketId , {
                event: "ride-completed",
                data: ride,
            });

        return res.status(200).json({ message: "Ride finished successfully" });
    } catch (error) {
        console.error("Error finishing ride:", error);
        return res.status(500).json({ message: error.message });
    }   
};
