import {Request, Response, NextFunction} from 'express';
import db from '../db';
import FirestoreRepository from '../repositories/firestore.repository';
import IController from './interfaces/controller.interface';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';
import CustomError from '../utils/error.interface';

export default class Controller implements IController {

    private repository: FirestoreRepository;

    constructor(collectionName: string) {
        this.repository = new FirestoreRepository(db, collectionName);
    }
    
    create(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
        let data: DocumentData | undefined;
        if(req.body == null) {
            let err: CustomError = new Error("The body was empty or undefined") as CustomError;
            err.status = 400;
            next(err);
            return;
        }
        this.repository.create(req.body).then((value) => {
            res.status(200).send(value.get().then(value => {
                if(value.data()) {
                    data = value.data();
                }
                return data;
            }));
        }).catch((reason) => {
            next(reason);
        });
        return data;
    }    

    readOne(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
        if(req.params.id == null) {
            let err: CustomError = new Error("The id was undefined") as CustomError;
            err.status = 400;
            next(err);
            return;
        }
        this.repository.readOne(req.params.id).then(async (value) => {
            res.status(200).send((await value.get()).data());
        }).catch((reason) => {
            next(reason);
        });
        return;
    }

    readAll(req: Request, res: Response, next: NextFunction): DocumentData[] | undefined {
        let dataArray: Array<DocumentData>;
        let promises: Array<Promise<DocumentSnapshot>>;
        this.repository.readAll().then(async (list) => {
            if(list.length == 0) {
                let err: CustomError = new Error("The list of entities was empty") as CustomError;
                err.status = 204;
                next(err);
                return;
            }
            promises = new Array<Promise<DocumentSnapshot>>();
            list.forEach(async (item) => {
                promises.push(item.get());
            });
            Promise.all(promises).then(async (promises) => {
                dataArray = new Array<DocumentData>();
                promises.forEach(async promise => {
                    dataArray.push(<DocumentData>promise.data());
                });
                res.status(200).send(dataArray);
                return dataArray;
            });
        })
        .catch((reason) => {
            next(reason);
        });
        return;
    }
    update(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
        if(req.body == null) {
            let err: CustomError = new Error("The body was empty or undefined") as CustomError;
            err.status = 400;
            next(err);
            return;
        }

        if(req.params.id == null) {
            let err: CustomError = new Error("The id was undefined") as CustomError;
            err.status = 400;
            next(err);
            return;
        }

        this.repository.update(req.params.id, req.body)
        .then(async (value) => {
            res.status(200).send((await value.get()).data());
        })
        .catch((reason) => {
            next(reason);
        });
        return;
    }
    delete(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
        if(req.params.id == null) {
            let err: CustomError = new Error("The id was undefined") as CustomError;
            err.status = 400;
            next(err);
            return;
        }

        this.repository.delete(req.params.id).then(() => {
            res.status(200).send('The object was deleted.');
        }).catch((reason) => {
            next(reason);
        });

        return;
    }


}