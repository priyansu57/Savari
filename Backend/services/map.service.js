const axios = require("axios");
const captainModel = require("../Models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have this in your .env file
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error(`Error fetching coordinates: ${response.data.status}`);
    }

    const location = response.data.results[0].geometry.location;

    return {
      ltd: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error("Error in getAddressCoordinate:", error);
    throw new Error("Failed to fetch coordinates for the given address.");
  }
};

module.exports.getDistanceTime = async (origin , destination ) => {
 
  if (!origin || !destination) {
      throw new Error('Origin and destination are required');
  }

   const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have this in your .env file

   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;


   try {
    
    const response = await axios.get(url);
    if (response.data.status == 'OK') {

      if(response.data.rows[ 0 ].elements[ 0 ].status !== 'OK'){
        throw new Error('No routes found');
      }

       return response.data.rows[ 0 ].elements[ 0 ];
    }else{
      throw new Error('Unable to fetch distance and time ');
    }

   } catch (error) {
     console.error(error)
     throw error
   }
};

module.exports.getAutoCompleteSuggestions = async (input) => {

        if (!input) {
            throw new Error("Input is required");
        }


        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

      try {  

        const response = await axios.get(url);
        if (response.data.status == "OK") {
            return response.data.predictions;
        }else{
            throw new Error('Unable to fetch suggestions');
        }
        

    } catch (error) {
      console.log(error);
      res.status(500).json({message: "Internal server error."})
    }
};

// in that mongodb check captains within the km radius
module.exports.getCaptainsInTheRadius = async (ltd , lng , radius , vehicleType) => {

  // console.log("ltd , lng , radius , vehicleType"  , ltd , lng , radius , vehicleType);


  const captain = await captainModel.find({
    "vehicle.vehicleType": vehicleType,
    location: { $geoWithin: { $centerSphere: [ [ lng , ltd ] , radius / 6371 ] } }
  });

  return captain;
}