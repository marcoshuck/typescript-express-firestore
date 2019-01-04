import {Request, Response} from 'express';
import { DocumentData } from '@google-cloud/firestore';

export default interface IController {
    create(req: Request, res: Response): DocumentData | undefined;
    readOne(req: Request, res: Response): DocumentData | undefined;
    readAll(req: Request, res: Response): DocumentData[] | undefined;
    update(req: Request, res: Response): DocumentData | undefined;
    delete(req: Request, res: Response): DocumentData | undefined;
}