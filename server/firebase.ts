import admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();


let db: admin.firestore.Firestore | null = null;

export function initializeFirebase() {
  if (db) {
    return db;
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!projectId || !privateKey || !clientEmail) {
      console.warn('⚠️  Firebase credentials not configured. Contact form will save to Firestore when credentials are provided.');
      return null;
    }

    // Check if already initialized
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
    }

    db = admin.firestore();
    console.log('✅ Firebase Firestore initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    return null;
  }
}

export function getFirestore(): admin.firestore.Firestore | null {
  if (!db) {
    return initializeFirebase();
  }
  return db;
}

console.log("🔥 FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("🔥 FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("🔥 FIREBASE_PRIVATE_KEY exists?", !!process.env.FIREBASE_PRIVATE_KEY);
