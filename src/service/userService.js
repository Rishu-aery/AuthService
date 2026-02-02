const { UserRepository } = require("../repository/userRepository.js");
const { JWT_SECRET } = require("../config/serverConfig.js");
const { ClientError, InternalError } = require("../utils/errorHandler.js");
const { USER_UNAUTHORIZED, AUTHENTICATION_ERROR, USER_NOT_FOUND } = require("../utils/constants.js");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signIn(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            
            const isPasswordMatch = await this.checkPassword(password, user.password);
            if (!isPasswordMatch) {
                throw new ClientError(StatusCodes.UNAUTHORIZED, AUTHENTICATION_ERROR, USER_UNAUTHORIZED)
            }

            const newToken = this.generateToken({user: user.email, id: user.id});
            return newToken;
        } catch (error) {
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token, JWT_SECRET);

            const user = await this.userRepository.getById(response.id);
            if (!user) {
                throw new ClientError(
                    StatusCodes.NOT_FOUND,
                    USER_NOT_FOUND,
                    "User no longer exist for this token!"
                )
            }
            return user.id
        } catch (error) {
            throw error;
        }
    }

    generateToken(user) {
        try {
            const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1d" })
            return token;
        } catch (error) {
            throw new InternalError();
        }
    }

    verifyToken(token, jwtSecret) {
        try {
            const result = jwt.verify(token, jwtSecret);
            return result;
        } catch (error) {
            throw new ClientError(StatusCodes.UNAUTHORIZED, AUTHENTICATION_ERROR, "Invalid token!");
        }
    }

    async checkPassword(plainPassword, encryptedPassword) {
        try {
            return await bcrypt.compare(plainPassword, encryptedPassword);
        } catch (error) {
            throw new ClientError(
            StatusCodes.UNAUTHORIZED, 
            AUTHENTICATION_ERROR,
            "AUTHENTICATION_ERROR"
        );
        }
    }

    async isAdmin(userId) {
        try {
            const result = await this.userRepository.isAdmin(userId);
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