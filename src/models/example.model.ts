import { Timestamp } from "@google-cloud/firestore";
import {IsAlpha, IsNotEmpty, IsString} from "class-validator";
import IExample from "./interfaces/example.interface";

/**
 * An example schema
 */
export default class Example implements IExample {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public firstName?: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public middleName?: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public lastName?: string;

  @IsNotEmpty()
  public birthday?: Timestamp;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public country?: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public province?: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public city?: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  public genre?: string;
}
