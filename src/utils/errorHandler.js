const { StatusCodes } = require('http-status-codes');

// class AppErrors extends Error {
//     constructor(
//         name = "App Error!",
//         message = "Something Went Wrong!",
//         description = "Something Went Wrong!",
//         statusCode = StatusCodes.INTERNAL_SERVER_ERROR
//     ) {
//         super();
//         this.name = name;
//         this.message = message;
//         this.description = description;
//         this.statusCode = statusCode;
//     }

//     validationError(name, message, description, statusCode) {

//     }
// }

class AppErrors extends Error {
    errorName;
    description = [];
    constructor(error) {
        super();
        this.errorName = error.name;
        this.description = error.errors.map((err) => err.message);
    }

    validationError() {
        return {
            name: this.errorName,
            message: "Not able to validate the requested input!",
            description: this.description,
            statusCode: StatusCodes.BAD_REQUEST
        }
    }
}

module.exports = AppErrors; 