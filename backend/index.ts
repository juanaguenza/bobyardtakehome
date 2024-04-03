import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/api/routes/comments";
import { initDB } from "./src/config/elephantSQL";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

const startServer = async () => {
  await initDB();

  app.use(cors());
  app.use(express.json({ limit: "10mb" })); // Increase the limit as needed
  app.use("", router);

  app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
  });
};

startServer();
