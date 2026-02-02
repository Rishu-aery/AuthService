const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index.js");
const { ValidationError, ClientError } = require("../utils/errorHandler.js");
const { USER_NOT_FOUND } = require("../utils/constants.js");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Error In repository layer: ", error);
            throw new ValidationError(error);
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
                throw new ClientError(StatusCodes.NOT_FOUND, USER_NOT_FOUND, USER_NOT_FOUND)
            }
            return user;
        } catch (error) {
            console.error("Error In repository layer: ", error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new ClientError(StatusCodes.NOT_FOUND, USER_NOT_FOUND, USER_NOT_FOUND)
            }
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