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

class ClientError extends AppError {
    constructor(statusCode, message, error) {
        super(
            statusCode,
            message,
            error
        )
    }
}

class InternalError extends AppError {
    constructor(message = "Internal server error", originalError = null) {
        super(
            StatusCodes.INTERNAL_SERVER_ERROR,
            message,
            "An unexpected error occurred. Please try again later.", // Generic message
        );
        // Log original error but don't expose it
        console.error("Internal Error:", message, originalError);
    }
}

module.exports = {
    ValidationError,
    ClientError,
    InternalError
}