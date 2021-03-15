import {Request,Response,NextFunction, request} from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
        if(err instanceof CustomError){
            return res.status(err.statusCode).send({
                errors: err.serializeErrors()
            });
        }

        res.status(500).send({
            errors:[{
                message: 'Something Went Wrong'
            }]
        })
    }
