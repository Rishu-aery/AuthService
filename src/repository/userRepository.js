const { User, Role } = require("../models/index.js");
const AppErrors = require("../utils/errorHandler.js");
const { NOT_FOUND } = require("../utils/constants.js")

const { StatusCodes } = require("http-status-codes");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new AppErrors(error).validationError();
            }
            console.error("Error In repository layer: ", error.name);
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const result = await User.destroy({
                where: {
                    id: userId
                }
            });
            return result ;
        } catch (error) {
            console.error("Error In repository layer: ", error);
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["id", "email"]
            });
            return user;
        } catch (error) {
            console.error("Error In repository layer: ", error);
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                throw new AppErrors().clientError(
                    NOT_FOUND,
                    "Invalid email sent in request!",
                    "Email not found. Enter valid email!",
                    StatusCodes.NOT_FOUND
                );
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const role = await Role.findOne({
                where: {
                    role: "ADMIN"
                }
            });
            return user.hasRole(role);
        } catch (error) {
            console.error("Error In repository layer: ", error);
            throw error;
        }
    }
}


module.exports = {
    UserRepository
}