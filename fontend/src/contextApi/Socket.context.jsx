
import { io } from "socket.io-client";
import { useContext } from "react";
import { createContext , useEffect , useState } from "react";

const socketContext = createContext();

const SocketProvider = ({children}) => {
 const socket = io(`${import.meta.env.VITE_BASE_URL}`);
   
    useEffect(() => {
       
        socket.on("connect" , () => {   
            console.log("Socket connected" , socket.id);
        });

    //    socket.on("disconnect" , () => {
    //         console.log("Socket disconnected");
    //    });

    }, []);

    const sendMessage = (eventname, message) => {
        socket.emit(eventname, message);
    };

    const receiveMessage = (eventname, callback) => {
        socket.on(eventname, callback);
    }   


    return (
        <socketContext.Provider value={{ receiveMessage, sendMessage ,socket }}>
            {children}
        </socketContext.Provider>
    );
};

const UseSocketContext = () => {
    return useContext(socketContext);
};

export { socketContext, SocketProvider, UseSocketContext };