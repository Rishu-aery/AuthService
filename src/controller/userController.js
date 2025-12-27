const { UserService } = require("../service/userService.js");
const { SuccessCodes, ServerErrors, ClientErrors } = require("../utils/errorCodes.js");

const userService = new UserService();

const create = async (req, res) => {
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
            message: "Successfully Signed Up",
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

const signIn = async (req, res) => {
    try {
        const body = req.body;
        const token = await userService.signIn(body.email, body.password);
        return res.status(SuccessCodes.OK).json({
            data: token,
            success: true,
            message: "Successfully Signed In",
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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const response = await userService.isAuthenticated(token);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "User Authenticated",
        })
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

const isAdmin = async (req, res) => {
    try {
        const body = req.body;
        const response = await userService.isAdmin(body.userId);
        res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully fetched user is admin or not",
        })
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
    signIn,
    isAuthenticated,
    isAdmin
}