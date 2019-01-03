import IExample from "./interfaces/example.interface";
import { Timestamp } from "@google-cloud/firestore";

export default class Example implements IExample {
    public firstName?: string;
    public middleName?: string;
    public lastName?: string;
    public birthday?: Timestamp;
    public country?: string;
    public province?: string;
    public city?: string;
    public genre?: string;
}