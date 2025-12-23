const express = require('express');
const router = express.Router();

const userController = require("../../controller/userController.js");
const userMiddleware = require("../../middleware/userMiddleware.js")

router.post("/signup", userMiddleware, userController.create);
router.post("/signin", userMiddleware, userController.signIn);

module.exports = router;
