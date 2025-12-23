const { UserService } = require("../service/userService.js");
const { SuccessCodes, ServerErrors } = require("../utils/errorCodes.js");

const userService = new UserService();

const create = async(req, res) => {
    try {
        const body = req.body;
        const userRequest = {
            email: body.email,
            password: body.password
        }
        const user = await userService.create(userRequest);
        
        return res.status(SuccessCodes.CREATED).json({
            data: user,
            success: true,
            message: "Successfully Signed Up.",
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(ServerErrors.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Internal Server Error!",
            err: error
        })
    }
}

const signIn = async(req, res) => {
    try {
        const body = req.body;
        const token = await userService.signIn(body.email, body.password);
        return res.status(SuccessCodes.OK).json({
            data: token,
            success: true,
            message: "Successfully Signed In.",
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(ServerErrors.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Internal Server Error!",
            err: error
        });
    }
}

module.exports = {
    create,
    signIn
}