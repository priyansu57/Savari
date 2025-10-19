
const { Server, Socket } = require("socket.io")
const userModel = require("../Models/userModel.js");
const captainModel = require("../Models/captain.model.js");
const rideModel = require("../Models/rideSchema.js");

let io ;

function intializeSocket(server) {
    
    io = new Server(server , {
        cors : {
            origin : "*",
            methods: ["GET" , "POST"]
        }
    } );

    io.on("connection" , (socket) => {
        console.log(`Client connected ${socket.id}`);
        
        socket.on("join" , async (data) => {
            const {userId , userType}=data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId , {
                    socketId: socket.id
                });
            }else if (userType === "captain") {
                 await captainModel.findByIdAndUpdate(userId , {socketId: socket.id});
            };

        });

        socket.on("update-captain-location" , async (data) => {
                    
        const {userId , location} = data;

        // console.log("userId at backend" , userId);
        // console.log("location lng" , location.lng);
        // console.log("location ltd" , location.ltd);

        if(!location || !location.lng || !location.ltd){
            return io.emit("error" , {message: "Location is required with lng and ltd"});
        }

        // Update the captain's location in the database
              await captainModel.findByIdAndUpdate(userId, {
                location: {
                type: "Point", // GeoJSON format requires a "type" field
                coordinates: [location.lng, location.ltd], // [longitude, latitude]
                },
        });
    });

      

         socket.on("cancel_ride", async (data) => {
           const { rideId } = data;
           console.log("Ride cancelled:", rideId);

           const ride = await rideModel.findOne({ _id: rideId }).populate('user');
           console.log("Ride details:", ride);
           if (ride) {
               ride.status = "cancelled";
               await ride.save();
               if (ride.user && ride.user.socketId) {
                   console.log("Emitting ride_cancelled to user with socketId:", ride.user.socketId);
                   io.to(ride.user.socketId).emit("ride_cancelled", { rideId });
               }
           }
            // io.to(data.user.socketId).emit("ride_cancelled", { rideId });

       });


    });

    

    //  io.on("disconnection" , (socket) => {
    //     console.log(`Client connected ${socket.id}`);
        
    // });
};

function sendMessageToSocketId(socketId ,messageObject) {
    // console.log("Sending message to socketId:", socketId, "Message:", messageObject.event, "Data:", messageObject.data);
    // console.log("sockeId: " , socketId , "message : " , messageObject);
    
    if(io){
        console.log("sockeId: " , socketId , "message : " , messageObject);
        io.to(socketId).emit(messageObject.event , messageObject.data);
    }else{
        console.log("Socket.io not initialized.");
    }
}

module.exports = {intializeSocket , sendMessageToSocketId };