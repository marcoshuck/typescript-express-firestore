import * as admin from 'firebase-admin';

const key = require('../keys/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: "https://fencing-tournament.firebaseio.com"
});

const db: FirebaseFirestore.Firestore = admin.firestore();
db.settings({timestampsInSnapshots: true});

export default db;