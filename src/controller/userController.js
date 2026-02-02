const { UserService } = require("../service/userService.js");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const body = req.body;
        const userRequest = {
            email: body.email,
            password: body.password
        }
        const user = await userService.create(userRequest);
        return res.status(200).json({
            data: user,
            success: true,
            message: "Successfully Signed Up",
        })
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

const signIn = async (req, res) => {
    try {
        const body = req.body;
        const token = await userService.signIn(body.email, body.password);
        return res.status(200).json({
            data: token,
            success: true,
            message: "Successfully Signed In",
        });
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const response = await userService.isAuthenticated(token);
        res.status(200).json({
            data: response,
            success: true,
            message: "User Authenticated",
        })
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

const isAdmin = async (req, res) => {
    try {
        const body = req.body;
        const response = await userService.isAdmin(body.userId);
        res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched user is admin or not",
        })
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}