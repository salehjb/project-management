import express from "express";
const app = express();
// libraries
import path from "path";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
// functions => public
import { __dirname } from "./functions/public.js";
// routes
import mainRouter from "./routes/routes.js"

class Application {
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createRoutes();
    this.errorHandler();
    this.createServer(PORT);
  }

  configApplication() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      express.static(path.join(__dirname(import.meta.url), "..", "public"))
    );
    app.use(cors());
  }

  createServer(PORT) {
    http.createServer(app).listen(PORT, () => {
      console.log(`server running on port http://localhost:${PORT}`);
    });
  }

  configDatabase(DB_URL) {
    mongoose.connect(DB_URL, (error) => {
      if (error) console.log(error);
      else console.log("database connection successfully...");
    });
  }

  errorHandler() {
    // 404 error handler
    app.use((req, res, next) => {
      res.status(404).json({
        status: 404,
        success: false,
        message: "your route is not found",
      });
    });
    // express error handler
    app.use((error, req, res, next) => {
      const status = error.status || 500;
      const message = error.message || "internal server error";
      res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }

  createRoutes() {
    // home route
    app.get("/", (req, res) => {
      res.json({
        message: "this server build with express.js",
      });
    });
    // all routes
    app.use(mainRouter)
  }
}

export default Application;
