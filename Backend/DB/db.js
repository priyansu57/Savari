const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(`${process.env.MONGODB_URL}/Savari`)
        .then(() => {
            console.log("Connection Established !!!");
        })
        .catch((err) => {
            console.error("Connection error:", err);
        });
};

module.exports = connectToDb;
