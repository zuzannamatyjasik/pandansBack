const http = require("http");
const app = require("./app");

//definicja numeru portu
const port = process.env.port || 3000;

//utworzenie serwera
const serwer = http.createServer(app);

//uruchomienie serwera
serwer.listen(port);
