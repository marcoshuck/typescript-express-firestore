import {Request, Response, NextFunction} from 'express';
import db from '../db';
import FirestoreRepository from '../repositories/firestore.repository';
import IController from './interfaces/controller.interface';
import { DocumentData, DocumentSnapshot } from '@google-cloud/firestore';
import CustomError from '../utils/error.interface';

/**
 * Modular Controller with CRUD methods using Firestore repository and DocumentData type.
 */
export default class Controller implements IController {

  /**
   * Firebase repository used by CRUD methods.
   */
  private repository: FirestoreRepository;

  constructor(collectionName: string) {
    this.repository = new FirestoreRepository(db, collectionName);
  }
  
  /**
   * Create a document in Firestore collection using the DocumentData received in the request body.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
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

  /**
   * Read one document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
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

  /**
   * Read all documents available in the Firestore collection.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
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

  /**
   * Update document fields by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
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

  /**
   * Delete document by the given id
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
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