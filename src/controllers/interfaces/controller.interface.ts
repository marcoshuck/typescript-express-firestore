import { DocumentData } from "@google-cloud/firestore";
import {NextFunction, Request, Response} from "express";

export default interface IController {
    create(req: Request, res: Response, next: NextFunction): DocumentData | undefined;
    readOne(req: Request, res: Response, next: NextFunction): DocumentData | undefined;
    readAll(req: Request, res: Response, next: NextFunction): DocumentData[] | undefined;
    update(req: Request, res: Response, next: NextFunction): DocumentData | undefined;
    delete(req: Request, res: Response, next: NextFunction): DocumentData | undefined;
}
