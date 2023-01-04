const Application = require("./app/server");

require('dotenv').config();

new Application(3500, process.env.DB_URL);