import * as admin from "firebase-admin";
import FIRESTORE_DB from "./env";

// tslint:disable-next-line:no-var-requires
const key = require("../keys/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: FIRESTORE_DB,
});

const db: FirebaseFirestore.Firestore = admin.firestore();
db.settings({timestampsInSnapshots: true});

export default db;
