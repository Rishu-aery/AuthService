const express = require('express');
const router = express.Router();

const userController = require("../../controller/userController.js");
const userMiddleware = require("../../middleware/authMiddleware.js")

router.post("/signup", userMiddleware, userController.create);
router.post("/signin", userMiddleware, userController.signIn);
router.get("/isauthenticated", userController.isAuthenticated);

module.exports = router;
