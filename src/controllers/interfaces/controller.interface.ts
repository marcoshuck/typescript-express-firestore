import {Request, Response} from 'express';
import { DocumentData } from '@google-cloud/firestore';
import FirestoreRepository from '../../repositories/firestore.repository';

export default interface IController {
    repository: FirestoreRepository;
    create(req: Request, res: Response): DocumentData | undefined;
    readOne(req: Request, res: Response): DocumentData | undefined;
    readAll(req: Request, res: Response): DocumentData[] | undefined;
    update(req: Request, res: Response): DocumentData | undefined;
    delete(req: Request, res: Response): DocumentData | undefined;
}