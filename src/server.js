const express = require('express');
const app = express();
const { PORT } = require("./config/serverConfig.js")

const prepareAndStartServer = async () => {

    app.listen(3000, () => {
        console.log("Server startes at PORT: ",PORT)
    })

}

prepareAndStartServer();