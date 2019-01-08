import IExample from "./interfaces/example.interface";
import { Timestamp } from "@google-cloud/firestore";
import {IsString, IsNotEmpty, IsAlpha} from "class-validator";

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