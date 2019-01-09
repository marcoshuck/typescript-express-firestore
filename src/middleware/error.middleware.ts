import {NextFunction, Request, Response} from "express";
import CustomError from "../utils/error.interface";

/**
 * Middleware function used on the request's pipeline to deliver error messages.
 * @param err Custom error object
 * @param req The request that originated the error
 * @param res The response that's sent to the client
 * @param next The next function executed in the app's middleware
 */
export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  const error: CustomError = err as CustomError;
  res.status(error.status || 500).render("error", {
    error: err,
    message: error.message,
    status: error.status || 500,
  });
}
