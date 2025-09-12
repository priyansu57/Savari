const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./DB/db.js");
const cookiesParse = require("cookie-parser")

const userRoutes = require("./routes/userRouter.js");
const captainRoutes = require("./routes/captainRouter.js");
const mapsRoutes = require("./routes/map.routes.js");
const rideRoutes = require("./routes/ride.routes.js");

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParse());

//Database call
connectToDb();

app.get("/" , (req,res) => {
    res.send("working!!");
});

//routes
app.use("/users" , userRoutes);
app.use("/captains" , captainRoutes);
app.use("/maps" , mapsRoutes);
app.use("/rides" , rideRoutes);

module.exports =  app;