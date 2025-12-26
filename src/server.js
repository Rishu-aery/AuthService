const express = require('express');
const bodyParser = require('body-parser');

const { PORT, DB_SYNC } = require("./config/serverConfig.js");
const apiRoutes = require("./routes/index.js");
const db = require("./models/index.js");


const prepareAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log("Server startes at PORT: ",PORT)
        if (DB_SYNC) {
            db.sequelize.sync({ alter: true })
        }
    })

}

prepareAndStartServer();