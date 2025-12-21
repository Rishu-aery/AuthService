const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS)
}