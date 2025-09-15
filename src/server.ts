// import fs from "fs";
// import app from "./app.js";
// import { config } from "./config/index.js";
// import listEndpoints from "express-list-endpoints";
// import http from "http";
// import https from "https";

// // SSL options
// const sslOptions = {
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.cert"),
// };

// const PORT = Number(process.env.PORT || 3000);

// http.createServer(app).listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

import http from "http";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

// Start HTTP server (Railway will handle HTTPS at the edge)
http.createServer(app).listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// // Start HTTP server
// http.createServer(app).listen(config.port, "0.0.0.0", () => {
//   console.log("HTTP server running at http://192.168.1.3:" + config.port);
// });

// // Start HTTPS server
// https.createServer(sslOptions, app).listen(3443, "0.0.0.0", () => {
//   console.log("HTTPS server running at https://192.168.1.3:3443");
// });

// app.listen(config.port, () => {
//   console.log(`API running on http://localhost:${config.port}`);

//   console.log(listEndpoints(app));
// });

// app.listen(config.port, "0.0.0.0", () => {
//   console.log(`API running on http://0.0.0.0":${config.port}`);

//   console.log(listEndpoints(app));
// }); // ✅ allows access from other devices
