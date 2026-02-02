const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong!",
        errors = [],
    ) {
        super(message);
        this.data = null;
        this.success = false;
        this.message = message;
        this.errors = errors;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}


class ValidationError extends AppError {
    constructor(error) {
        super(
            StatusCodes.BAD_REQUEST,
            "Not able to validate the requested input!",
            error.errors.map((item) => {
                return item.message
            })
        );
    }
}

module.exports = {
    ValidationError
}