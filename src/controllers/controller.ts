import {Request, Response} from 'express';
import db from '../db';
import FirestoreRepository from '../repositories/firestore.repository';
import IController from './interfaces/controller.interface';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';

export default class Controller implements IController {

    private repository: FirestoreRepository;

    constructor(collectionName: string) {
        this.repository = new FirestoreRepository(db, collectionName);
    }
    
    create(req: Request, res: Response): DocumentData | undefined {
        let data: DocumentData | undefined;
        if(req.body == null) {
            res.status(400).send('The body was empty or undefined');
            return;
        }
        this.repository.create(req.body).then((value) => {
            res.status(200).send(value.get().then(value => {
                if(value.data()) {
                    data = value.data();
                }
                return data;
            }));
        }).catch(() => {
            res.status(400).send("Could not create a new entity");
        });
        return data;
    }    

    readOne(req: Request, res: Response): DocumentData | undefined {
        if(req.params.id == null) {
            res.status(400).send('The id was undefined');
            return;
        }
        this.repository.readOne(req.params.id).then(async (value) => {
            res.status(200).send((await value.get()).data());
        }).catch(() => {
            res.status(400).send("Could not read the desired entity");
        });
        return;
    }

    readAll(req: Request, res: Response): DocumentData[] | undefined {
        let dataArray: Array<DocumentData>;
        let promises: Array<Promise<DocumentSnapshot>>;
        if(req.params.id) {
            res.status(400).send("Could not perform the reading all operation because there is a params.id declared in the request");
            return;
        }
        this.repository.readAll().then(async (list) => {
            if(list.length == 0) {
                res.status(400).send("The list of entities is empty");
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
        .catch(() => {
            res.status(400).send("Could not read all entities");
            return;
        });
        return;
    }
    update(req: Request, res: Response): DocumentData | undefined {
        if(req.body == null) {
            res.status(400).send('The body was empty or undefined');
            return;
        }

        if(req.params.id == null) {
            res.status(400).send('The request did not have param id');
            return;
        }

        this.repository.update(req.params.id, req.body)
        .then(async (value) => {
            res.status(200).send((await value.get()).data());
        })
        .catch(() => {
            res.status(400).send("Could not perform the updating operation");
        });
        return;
    }
    delete(req: Request, res: Response): DocumentData | undefined {
        if(req.params.id == null) {
            res.status(400).send('The id was undefined.');
            return;
        }

        this.repository.delete(req.params.id).then(() => {
            res.status(200).send('The object was deleted.');
        }).catch(() => {
            res.status(400).send("Could not perform the removing operation.");
        });

        return;
    }


}