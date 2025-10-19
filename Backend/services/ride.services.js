const rideModel = require("../Models/rideSchema.js");
const mapService = require("./map.service.js");
const OtpService = require("../services/Otp.service.js");
const { sendMessageToSocketId } = require("../Socket/Socket.js");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Get distance and time between pickup and destination
  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Unable to calculate distance and time");
  }

  const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
  const timeInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

  // Fare calculation logic
  const fares = {
  auto: parseFloat(calculateAutoFare(distanceInKm, timeInMinutes).toFixed(2)),
  bike: parseFloat(calculateBikeFare(distanceInKm, timeInMinutes).toFixed(2)),
  car: parseFloat(calculateCarFare(distanceInKm, timeInMinutes).toFixed(2)),
  premier: parseFloat(calculatePremierFare(distanceInKm, timeInMinutes).toFixed(2)),
};


  return fares;
}

// Calculate fare for auto
function calculateAutoFare(distance, time) {
  const baseFare = 30; // Base fare for auto
  const perKmRate = 10; // Rate per kilometer
  const perMinuteRate = 1; // Rate per minute
  return baseFare + distance * perKmRate + time * perMinuteRate;
}

// Calculate fare for bike
function calculateBikeFare(distance, time) {
  const baseFare = 20; // Base fare for bike
  const perKmRate = 8; // Rate per kilometer
  const perMinuteRate = 0.8; // Rate per minute
  return baseFare + distance * perKmRate + time * perMinuteRate;
}

// Calculate fare for motorcycle
function calculateCarFare(distance, time) {
  const baseFare = 50; // Base fare for motorcycle
  const perKmRate = 15; // Rate per kilometer
  const perMinuteRate = 2; // Rate per minute
  return baseFare + distance * perKmRate + time * perMinuteRate;
}

// Calculate fare for premier
function calculatePremierFare(distance, time) {
  const baseFare = 100; // Base fare for premier    
  const perKmRate = 25; // Rate per kilometer
  const perMinuteRate = 3;  // Rate per minute
  return baseFare + distance * perKmRate + time * perMinuteRate;
}

module.exports.getFare = getFare;

module.exports.createRide = async ({
    user , pickup , destination , vehicleType , paymentType }) => {

    const fare = await getFare(pickup , destination);

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
  const destinationCoordinates = await mapService.getAddressCoordinate(destination);
    
    const otpGenerate = () => {
       OtpService.sendMail({ email: user.email });
      // console.log(Number(OtpService.otp));
      return (Number(OtpService.otp));
    }
    // console.log( otpGenerate());

    // console.log("paymentType in createRide" , paymentType);



    const ride = await rideModel.create({
    user: user._id,
    pickup,
    pickupCoordinates: {
      type: "Point",
      coordinates: [pickupCoordinates.lng, pickupCoordinates.ltd], // [longitude, latitude]
    },
    destination,
    destinationCoordinates: {
      type: "Point",
      coordinates: [destinationCoordinates.lng, destinationCoordinates.ltd], // [longitude, latitude]
    },
    fare: fare[vehicleType],
    otp: otpGenerate(),
    vehicleType: vehicleType,
    paymentType: paymentType,
  });

    return ride;
};

module.exports.confirmRide = async ({ captain , rideId }) => {
    if(!rideId){
        throw new Error("Ride ID is required");
    }

    console.log("captain :"  , captain , "rideId :" ,rideId);

    await rideModel.findOneAndUpdate(
        { _id: rideId, status: 'pending', captain: { $exists: false } }, // Only update if ride is pending and no captain assigned
        { $set: { captain: captain._id, status: 'accepted' } },
        { new: true } // Return the updated document
    );

    const ride = await rideModel.findById(rideId).populate("user").populate("captain");

    console.log("ride after assigning captain :"  , ride);

    if(!ride){
        throw new Error("Ride not found");
    }

    return ride;
    
};

module.exports.verifyOtp = async ({ rideId , otp}) => {
    if(!rideId || !otp){
        throw new Error("Ride ID and OTP are required");
    } 

    await rideModel.findOneAndUpdate(
        { _id: rideId, otp: otp , status: 'accepted' }, // Only update if ride is accepted and OTP matches
        { $set: { status: 'ongoing' } },
        { new: true } // Return the updated document
    );

    const ride = await rideModel.findOne({ _id: rideId, otp: otp , status: 'ongoing' }).populate("captain").populate("user");
    if(!ride){
        throw new Error("Invalid OTP or Ride not found");
    }     

    

    return ride;
};

module.exports.finishRide = async ({ rideId }) => {
    if(!rideId){
        throw new Error("Ride ID is required");
    }   
    await rideModel.findOneAndUpdate(
        { _id: rideId, status: 'ongoing' }, // Only update if ride is ongoing
        { $set: { status: 'completed' } },
        { new: true } // Return the updated document
    );
    const ride = await rideModel.findOne({ _id: rideId, status: 'completed' }).populate("captain").populate("user");
    if(!ride){
        throw new Error("Ride not found or not in ongoing status");
    } 

    // console.log("Ride after finishing :" , ride);
    

    return ride;
};
