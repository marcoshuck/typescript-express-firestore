import {Request, Response} from 'express';
import Controller from './controller';
import { NextFunction } from 'connect';


export default class ExampleController {
    public static readonly collectionName: string = "examples";

    static create(req: Request, res: Response, next: NextFunction): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.create(req, res, next);
        return;
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