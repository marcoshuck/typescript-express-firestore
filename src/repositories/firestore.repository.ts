import { CollectionReference, DocumentData, DocumentReference,
  DocumentSnapshot, Firestore } from "@google-cloud/firestore";
import IFirestoreRepository from "./interfaces/firestore.interface";

export default class FirestoreRepository implements IFirestoreRepository {
  public readonly collection: CollectionReference;

  constructor(db: Firestore, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  public async create(object: DocumentData): Promise<DocumentReference> {
    try {
      return await this.collection.add(object);
    } catch {
      throw new Error("Could not create object");
    }
  }

  public async readOne(id: string): Promise<DocumentReference> {
    try {
      return await this.collection.doc(id);
    } catch {
      throw new Error("Could not read object");
    }
  }

  public async readAll(): Promise<DocumentReference[]> {
    try {
      return await this.collection.listDocuments();
    } catch {
      throw new Error("Could not read all objects");
    }
  }

  public async update(id: string, object: DocumentData): Promise<DocumentReference> {
    try {
      const ref: DocumentReference = this.collection.doc(id);
      const snap: DocumentSnapshot = await ref.get();
      if (!snap.exists) {
        return ref;
      }
      await ref.update(object);
      return ref;
    } catch {
      throw new Error("Could not update object");
    }
  }

  public async delete(id: string): Promise<DocumentReference> {
    try {
      const ref: DocumentReference = this.collection.doc(id);
      await ref.delete();
      return ref;
    } catch {
      throw new Error("Could not remove object");
    }
  }
}
