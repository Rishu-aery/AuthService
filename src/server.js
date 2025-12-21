const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require("./config/serverConfig.js");
const apiRoutes = require("./routes/index.js");


const prepareAndStartServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log("Server startes at PORT: ",PORT)
    })

}

prepareAndStartServer();