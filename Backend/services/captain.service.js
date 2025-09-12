
const captainModel = require("../Models/captain.model.js");


module.exports.createCaptain = async ({
    fullname , email , password , vehicle 
}) => {

    console.log("fullname :" , fullname , "\n" , "email" + email + "\n" , "password" + password + "\n", "vehicle" , vehicle  );
    

    if (!fullname || !email || !password || !vehicle) {
        throw new Error("All fields are required .")
    };

    const captain = captainModel.create({
       fullname:{
         firstname : fullname.firstname,
        lastname: fullname.lastname,
       },
        email,
        password,
        vehicle:{
            color : vehicle.color,
            plate: vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType,
        }
    });

    return captain;

}