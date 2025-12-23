const { ClientErrors } = require("../utils/errorCodes.js")

const validateSignIn = (req, res, next) => {
    const body = req.body;

    if (!body.email || !body.password) {
        return res.status(ClientErrors.BAD_REQUEST).json({
            data: {},
            success: false,
            message: "Invalid Request Body!",
            err: "email and password is required!"
        })
    }

    next();
}

module.exports = validateSignIn;