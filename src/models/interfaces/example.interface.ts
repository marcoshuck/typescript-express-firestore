import { Timestamp } from "@google-cloud/firestore";

export default interface IExample {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    birthday?: Timestamp;
    country?: string;
    province?: string;
    city?: string;
    genre?: string;
}
