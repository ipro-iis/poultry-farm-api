import express from "express";
import cors from "cors";
import { passport } from "./middleware/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import farmRoutes from "./modules/farms/farm.routes.js";
import dailyRoutes from "./modules/daily/daily.routes.js";
import farmCycleRoutes from "./modules/farm_cycles/farmCycle.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/health", (_req, res) => res.json({ message: "pong", timestamp: Date.now() }));

app.use("/auth", authRoutes);
app.use("/farms", farmRoutes);
app.use("/daily", dailyRoutes);
app.use("/farm-cycles", farmCycleRoutes);

export default app;
