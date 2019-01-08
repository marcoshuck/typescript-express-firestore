import {Request, Response} from 'express';
import Controller from './controller';
import { NextFunction } from 'connect';
import Example from '../models/example.model';
import {validate} from 'class-validator';
import CustomError from '../utils/error.interface';


export default class ExampleController {
    public static readonly collectionName: string = "examples";

    static create(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        let example: Example = new Example();
        example = req.body;
        validate(example, {
          forbidUnknownValues: true
        }).then(errors => {
          if(errors.length > 0) {
            let err: CustomError = new Error("The body was not validated") as CustomError;
            err.status = 400;
            next(err);
            return;
          }
          controller.create(req, res, next);
          return;
        });
    }

    static readOne(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.readOne(req, res, next);
        return;
    }

    static readAll(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.readAll(req, res, next);
        return;
    }

    static update(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.update(req, res, next);
        return;
    }
    
    static delete(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.delete(req, res, next);
        return;
    }
}