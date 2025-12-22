const { User } = require("../models/index.js");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.error("Error In repository layer: ", error);
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
}


module.exports = {
    UserRepository
}