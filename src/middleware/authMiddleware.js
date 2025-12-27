const { ClientErrors } = require("../utils/errorCodes.js")

const validateUserAuth = (req, res, next) => {
    const body = req.body;

    if (!body?.email || !body?.password) {
        return res.status(ClientErrors.BAD_REQUEST).json({
            data: {},
            success: false,
            message: "Invalid Request Body!",
            err: "email and password is required!"
        })
    }

    next();
}

const validateIsAdmin = (req, res, next) => {
    console.log("-----------------", req.body);
    
    if (!req.body?.userId) {
        return res.status(ClientErrors.BAD_REQUEST).json({
            data: {},
            success: false,
            message: "Invalid Request Body!",
            err: "userId is required!"
        })
    }

    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdmin
};