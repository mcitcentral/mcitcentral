import dotenv from "dotenv";
import firebaseAdmin from "firebase-admin";

dotenv.config();
const credential = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, "base64").toString());
if (firebaseAdmin.apps.length === 0)
  firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(credential) });

export default firebaseAdmin;
