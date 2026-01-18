import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import testRoute from "./test/dailyEmailRoute.js";
import dailyEmailRoute from "./routes/reminderRouter.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "https://email-reminder-dsa.vercel.app/" }));
app.use(express.json());

app.use("/test", testRoute);
app.use("/api/v1", dailyEmailRoute);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
