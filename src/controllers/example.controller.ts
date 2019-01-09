import {validate} from "class-validator";
import { NextFunction } from "connect";
import {Request, Response} from "express";
import Example from "../models/example.model";
import CustomError from "../utils/error.interface";
import Controller from "./controller";

/**
 * The specific ExampleController used by the examples route handler.
 */
export default class ExampleController {

  /**
   * The collection's name used by this controller.
   */
  public static readonly collectionName: string = "examples";

  /**
   * A static method used to parse, validate and create a new Example document.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static create(req: Request, res: Response, next: NextFunction): void {
    const controller: Controller = new Controller(ExampleController.collectionName);
    let example: Example = new Example();
    example = req.body;
    validate(example, { forbidUnknownValues: true }).then((errors) => {
      if (errors.length > 0) {
        const err: CustomError = new Error("The body was not validated") as CustomError;
        err.status = 400;
        next(err);
        return;
      }
      controller.create(req, res, next);
      return;
    });
  }
  /**
   * A static method used to read one Example document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static readOne(req: Request, res: Response, next: NextFunction): void {
    const controller: Controller = new Controller(ExampleController.collectionName);
    controller.readOne(req, res, next);
    return;
  }

  /**
   * A static method used to read all Example documents.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static readAll(req: Request, res: Response, next: NextFunction): void {
    const controller: Controller = new Controller(ExampleController.collectionName);
    controller.readAll(req, res, next);
    return;
  }

  /**
   * A static method used to update certain fields of an Example document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static update(req: Request, res: Response, next: NextFunction): void {
    const controller: Controller = new Controller(ExampleController.collectionName);
    controller.update(req, res, next);
    return;
  }

  /**
   * A static method used to delete an Example document by the given id.
   * @param req The request received by the API Rest
   * @param res The response sent by the API Rest
   * @param next The next function executed in the app's middleware
   */
  public static delete(req: Request, res: Response, next: NextFunction): void {
    const controller: Controller = new Controller(ExampleController.collectionName);
    controller.delete(req, res, next);
    return;
  }
}
