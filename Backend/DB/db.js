const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log("Connection Established !!!");
        })
        .catch((err) => {
            console.error("Connection error:", err);
        });
};

module.exports = connectToDb;