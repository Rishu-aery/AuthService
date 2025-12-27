const express = require('express');
const router = express.Router();

const userController = require("../../controller/userController.js");
const userMiddleware = require("../../middleware/authMiddleware.js");

router.post("/signup", userMiddleware.validateUserAuth, userController.create);
router.post("/signin", userMiddleware.validateUserAuth, userController.signIn);
router.get("/isauthenticated", userController.isAuthenticated);
router.post("/isAdmin", userMiddleware.validateIsAdmin, userController.isAdmin);

module.exports = router;
