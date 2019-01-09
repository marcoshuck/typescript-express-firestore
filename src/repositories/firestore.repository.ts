import IFirestoreRepository from './interfaces/firestore.interface';
import { DocumentData, DocumentReference, CollectionReference, Firestore } from '@google-cloud/firestore';

export default class FirestoreRepository implements IFirestoreRepository {
  public readonly collection: CollectionReference;

  constructor(db: Firestore, collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async create(object: DocumentData): Promise<DocumentReference> {
    try {
      return await this.collection.add(object);
    }
    catch {
      throw new Error("Could not create object");
    }
  }

  async readOne(id: string): Promise<DocumentReference> {
    try {
      return await this.collection.doc(id);
    }
    catch {
      throw new Error("Could not read object");
    }
  }

  async readAll(): Promise<DocumentReference[]> {
    try {
      return await this.collection.listDocuments();
    }
    catch {
      throw new Error("Could not read all objects");
    }
  }

  async update(id: string, object: DocumentData): Promise<DocumentReference> {
    try {
      let ref: DocumentReference;
      ref = this.collection.doc(id);
      await ref.update(object);
      return ref;
    }
    catch {
      throw new Error("Could not update object");
    }
  }

  async delete(id: string): Promise<DocumentReference> {
    try {
      let ref: DocumentReference = this.collection.doc(id);
      await ref.delete();
      return ref;
    }
    catch {
      throw new Error("Could not remove object");
    }
  }


}