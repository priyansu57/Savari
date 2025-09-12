const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "captain",
    },
    pickup: {
        type: String,
        required: true,
    },
    pickupCoordinates: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        },
    },
    destination: {
        type: String,
        required: true,
    },
    destinationCoordinates: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
        },
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
        default: "pending",
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentType: {
        type: String,
        default: "cash",
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: Number,
        selected: false,
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ["auto", "car", "bike", "premier"],
    },
});

// Add 2dsphere indexes for geospatial queries
rideSchema.index({ pickupCoordinates: "2dsphere" });
rideSchema.index({ destinationCoordinates: "2dsphere" });

module.exports = mongoose.model("ride", rideSchema);
