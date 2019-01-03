import {Request, Response} from 'express';
import Controller from './controller';


export default class ExampleController {
    public static readonly collectionName: string = "examples";

    static create(req: Request, res: Response): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.create(req, res);
        return;
    }

    static readOne(req: Request, res: Response): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.readOne(req, res);
        return;
    }

    static readAll(req: Request, res: Response): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.readAll(req, res);
        return;
    }

    static update(req: Request, res: Response): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.update(req, res);
        return;
    }
    
    static delete(req: Request, res: Response): void {
        let controller: Controller = new Controller(ExampleController.collectionName);
        controller.delete(req, res);
        return;
    }
}