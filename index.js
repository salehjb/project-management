// index.js
import Application from "./app/server.js"
// dotenv config
import dotenv from "dotenv";
dotenv.config()

new Application(process.env.PORT, process.env.DB_URL)