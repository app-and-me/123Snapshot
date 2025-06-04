import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	storageBucket: "snapshow-4fc42.appspot.com",
});

const bucket = admin.storage().bucket();
export default bucket;
