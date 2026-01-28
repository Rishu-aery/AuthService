const { StatusCodes } = require('http-status-codes');

class AppErrors extends Error {
    errorName;
    description = [];
    constructor(error) {
        super();
        this.errorName = error?.name;
        this.description = error?.errors.map((err) => err.message);
    }

    validationError() {
        return {
            name: this.errorName,
            message: "Not able to validate the requested input!",
            description: this.description,
            statusCode: StatusCodes.BAD_REQUEST
        }
    }

    clientError(name, message, description, statusCode) {
        return {
            name,
            message,
            description,
            statusCode
        }
    }
}

module.exports = AppErrors; 