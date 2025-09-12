const http = require("http");
const app = require("./app");
const { intializeSocket } = require("./Socket/Socket");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

intializeSocket(server);

server.listen(port , () => {
    console.log(`Server is running on port ${port} .`);
    
})