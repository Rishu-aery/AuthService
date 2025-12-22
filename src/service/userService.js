const { UserRepository } = require("../repository/userRepository.js");
const jwt = require('jsonwebtoken');

const { JWT_SECRET, PORT } = require("../config/serverConfig.js")

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

    generateToken(user) {
        try {
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" })
            return token;
        } catch (error) {
            console.error("Error while generating the token: ", error);
            throw error;
        }
    }

    verifyToken(token, JWT_SECRET){
        try {
            const result = jwt.verify(token, JWT_SECRET);
            return result;
        } catch (error) {
            console.error("Error while validating the token: ", error);
            throw error;
        }
    }

}

module.exports = {
    UserService
}