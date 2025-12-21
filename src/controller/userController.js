const { UserService } = require("../service/userService.js");

const userService = new UserService();

const create = async(req, res) => {
    try {
        const body = req.body;
        const userRequest = {
            email: body.email,
            password: body.password
        }
        const user = await userService.create(userRequest);
        
        return res.status(201).json({
            data: user,
            success: true,
            message: "User creatd successfully.",
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            data: {},
            success: false,
            message: "Internal Server Error!",
            err: error
        })
    }
}

module.exports = {
    create
}