const { UserRepository } = require("../repository/userRepository.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    async signIn(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            
            const isPasswordMatch = await this.checkPassword(password, user.password);
            if (!isPasswordMatch) {
                console.log("Password doesn't match");
                throw { error: "Incorrect Password!" };
            }

            const newToken = this.generateToken({user: user.email, id: user.id});
            return newToken;
        } catch (error) {
            console.error("Error While Signing In: ", error);
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

    verifyToken(token, JWT_SECRET) {
        try {
            const result = jwt.verify(token, JWT_SECRET);
            return result;
        } catch (error) {
            console.error("Error while validating the token: ", error);
            throw error;
        }
    }

    async checkPassword(plainPassword, encryptedPassword) {
        try {
            return await bcrypt.compare(plainPassword, encryptedPassword);
        } catch (error) {
            console.error("Error while comparing the password:", error);
            throw error;
        }
    }

}

module.exports = {
    UserService
}