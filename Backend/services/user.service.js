
const { validationResult } = require("express-validator");
const userModel = require("../Models/userModel.js");

module.exports.createUser = async ({firstname , lastname , email , password}) => {

    // console.log({firstname , lastname , email , password});
    

    if(!firstname || !email || !password){
        throw new Error("All fields are required");
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
    });
    
    return user

};
