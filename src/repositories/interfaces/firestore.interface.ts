import { DocumentReference, DocumentData } from "@google-cloud/firestore";

export default interface IFirestoreRepository {
    create(object: DocumentData): Promise<DocumentReference>;
    readOne(id: string): Promise<DocumentReference>;
    readAll(): Promise<Array<DocumentReference>>;
    update(id: string, object: DocumentData): Promise<DocumentReference>;
    delete(id: string): Promise<DocumentReference>;
}