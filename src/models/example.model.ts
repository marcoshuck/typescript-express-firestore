import IExample from "./interfaces/example.interface";
import { Timestamp } from "@google-cloud/firestore";
import {IsString, IsNotEmpty} from "class-validator";

export default class Example implements IExample {
  @IsString()
  @IsNotEmpty()
  public firstName?: string;

  @IsString()
  @IsNotEmpty()
  public middleName?: string;

  @IsString()
  @IsNotEmpty()
  public lastName?: string;

  @IsNotEmpty()
  public birthday?: Timestamp;

  @IsString()
  @IsNotEmpty()
  public country?: string;

  @IsString()
  @IsNotEmpty()
  public province?: string;

  @IsString()
  @IsNotEmpty()
  public city?: string;

  @IsString()
  @IsNotEmpty()
  public genre?: string;
}