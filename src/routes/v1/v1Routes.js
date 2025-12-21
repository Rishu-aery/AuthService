const express = require('express');
const router = express.Router();

const userController = require("../../controller/userController.js");

router.post("/user", userController.create);

module.exports = router;
