import { memo, useState } from "react";
import { Users } from "lucide-react";
import { UseContext } from "../../contextApi/context";

const date = new Date(Date.now());

const timeString = date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

// console.log(timeString); // 👉 "10:57 PM"




 function RideOptions() {
   const {setRideVehicleOption ,rideVehiclOption , fare} = UseContext();
  const rides = [
    {
      id: 1,
      name: "Car",
      seats: 4,
      eta: `2 mins away • ${timeString} `,
      price: `₹${fare.car || "320.00"}`,
      tag: "Faster",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png",
    },
    {
      id: 2,
      name: "Auto",
      seats: 3,
      eta: `3 mins away • ${timeString} `,
      price: `₹${fare.auto || "80.55"}`,
      tag: null,
      note: "Pay directly to driver, cash/UPI only",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png",
    },
    {
      id: 3,
      name: "Bike",
      seats: 1,
      eta: `4 mins away • ${timeString} `,
      price: `₹${fare.bike || "61.02"}`,
      note: "Affordable bike rides",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png",
    },
    {
      id: 4,
      name: "Premier",
      seats: 4,
      eta: `1 mins away • ${timeString } `,
      price: `₹${fare.premier  || "301.11"}`,
      tag: "Good deal",
      img: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png",
    },
  ];

  const [selected, setSelected] = useState(rides[0].id);
  // console.log(selected);
  // console.log("Ridevehicle : " , rideVehiclOption);

  

  return (
    <div className="max-w-md mx-auto mr-10 ">
      <h2 className="text-3xl font-bold mb-2">Choose a ride</h2>
      <p className="text-gray-600 text-2xl mb-4">Rides we think you'll like</p>

      <div className="space-y-3">
        {rides.map((ride) => (
          <div
            key={ride.id}
            onClick={() =>{ setSelected(ride.id), setRideVehicleOption({...ride} , )}}
            className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition
              ${selected === ride.id ? "border-black bg-gray-50" : "border-gray-300"}
            `}
          >
            {/* Left: Image + Info */}
            <div className="flex items-center gap-3">
              <img src={ride.img} alt={ride.name} className="w-14 h-14 object-contain" />
              <div>
                <div className="font-semibold flex items-center gap-2">
                  {ride.name}
                  <span className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" /> {ride.seats}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{ride.eta}</div>
                {ride.note && <div className="text-sm text-gray-500">{ride.note}</div>}
                {ride.tag && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded mt-1 inline-block">
                    {ride.tag}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Price */}
            <div className="font-semibold text-lg text-black">{ride.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(RideOptions);

// https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/Hatchback.png  // uber go
//https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png // premier
//https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Green_v1.png //auto
//https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Uber_Moto_India1.png //bike
