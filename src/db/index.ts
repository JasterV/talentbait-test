import * as admin from 'firebase-admin'
import config from '../config';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase.credentials as any)
});

const db = admin.firestore()

export default db;