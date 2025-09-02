import app from "./app.js";
import { config } from "./config/index.js";
import listEndpoints from "express-list-endpoints";

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);

  console.log(listEndpoints(app));
});
