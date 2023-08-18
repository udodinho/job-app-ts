import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function errorHandlerMiddleware(error: Error, _: Request, res: Response, next: NextFunction) {

    let customError = {
        statusCode: error.name || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Something went wrong try again later.",
        stack: error.stack
    };

    if (error.name === "ValidationError") {       
        customError.message === `${error.message}.`
        customError.statusCode = 400
    };

    if (error.name === "CastError") {
        customError.message = `No item found with id: ${error.message}.`
        customError.statusCode = 404
    };

    if (error.name === "BadRequestError") {
        customError.message = `${error.message}.`
        customError.statusCode = 400
    };

    if (error.name === "UnauthenticatedError") {
        customError.message = `${error.message}.`
        customError.statusCode = 401
    };

    if (error.name === "NotFoundError") {
        customError.message = `${error.message}.`
        customError.statusCode = 404
    };

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    return res.status(customError.statusCode as StatusCodes ).json({ msg: customError.message })
};

export default errorHandlerMiddleware
