import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "snapshow-4fc42.appspot.com",
  storageBucket: "gs://snapshow-4fc42.firebasestorage.app",
});

const bucket = admin.storage().bucket();
export default bucket;
