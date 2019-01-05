import {Request, Response, NextFunction} from 'express';
import CustomError from '../utils/error.interface';

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    let error: CustomError = <CustomError>err;
    res.status(error.status || 500).render('error', {
        status: error.status || 500,
        message: error.message,
        error: err
    });
}