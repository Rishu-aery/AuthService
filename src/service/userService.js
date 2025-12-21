const { UserRepository } = require("../repository/userRepository.js")

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.error("Error In service layer: ", error);
            throw error;
        }
    }
}

module.exports = {
    UserService
}