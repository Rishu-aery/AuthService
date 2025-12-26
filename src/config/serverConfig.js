const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
    JWT_SECRET: process.env.JWT_SECRET,
    DB_SYNC: process.env.DB_SYNC == "true" ? true : false
}