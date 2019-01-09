import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import {NextFunction, Request, Response} from "express";
import db from "../db";
import FirestoreRepository from "../repositories/firestore.repository";
import CustomError from "../utils/error.interface";
import IController from "./interfaces/controller.interface";

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
  public create(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
    let data: DocumentData | undefined;
    if (req.body == null) {
      const err: CustomError = new Error("The body was empty or undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }
    this.repository.create(req.body).then((value) => {
      res.status(200).send(value.get().then((document) => {
        if (document.data()) {
          data = document.data();
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
  public readOne(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
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
  public readAll(req: Request, res: Response, next: NextFunction): DocumentData[] | undefined {
    let dataArray: DocumentData[];
    let allPromises: Array<Promise<DocumentSnapshot>>;
    this.repository.readAll().then(async (list) => {
      if (list.length === 0) {
        const err: CustomError = new Error("The list of entities was empty") as CustomError;
        err.status = 204;
        next(err);
        return;
      }
      allPromises = new Array<Promise<DocumentSnapshot>>();
      list.forEach(async (item) => {
        allPromises.push(item.get());
      });
      Promise.all(allPromises).then(async (promises) => {
        dataArray = new Array<DocumentData>();
        promises.forEach(async (promise) => {
          dataArray.push(promise.data() as DocumentData);
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
  public update(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
    if (req.body == null) {
      const err: CustomError = new Error("The body was empty or undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
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
  public delete(req: Request, res: Response, next: NextFunction): DocumentData | undefined {
    if (req.params.id == null) {
      const err: CustomError = new Error("The id was undefined") as CustomError;
      err.status = 400;
      next(err);
      return;
    }

    this.repository.delete(req.params.id).then(() => {
      res.status(200).send("The object was deleted.");
    }).catch((reason) => {
      next(reason);
    });
    return;
  }
}
