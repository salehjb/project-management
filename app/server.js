const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

module.exports = class Application {
    constructor(PORT, DB_URL) {
        this.configApplication();
        this.createServer(PORT);
        this.configDatabase(DB_URL);
        this.createRoutes();
        this.errorHandler();
    }

    configApplication() {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, "..", "public")))
    }

    createServer(PORT) {
        app.listen(PORT, () => {
            console.log(`app listening on port ${PORT}`);
        })
    }

    configDatabase(DB_URL) {
        mongoose.set("strictQuery", false);
        mongoose.connect(DB_URL, (error) => {
            if (!error) console.log("connection established to database");
        });
    }

    errorHandler() {
        // handle 404 error
        app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "page not found",
                success: false
            })
        })

        // express error handler
        app.use((error, req, res, next) => {
            const status = error?.status || 500;
            const message = error?.message || "internal server error";

            return res.status(status).json({
                status,
                message,
                success: false
            })
        })
    }

    createRoutes() {
        app.get('/', (req, res, next) => {
            return res.json({
                message: "welcome to express application"
            })
        })
    }
}