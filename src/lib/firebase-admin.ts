
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

const appName = "firebase-admin-app-content-spark";
let app: App | null = null;

function initFirebaseAdminApp(): App | null {
  if (app) {
    return app;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountJson) {
    console.warn(
      "FIREBASE_SERVICE_ACCOUNT environment variable is not set. " +
      "Firebase Admin SDK will not be initialized. " +
      "This is expected for local development and preview deployments if you haven't set it up."
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    const apps = getApps();
    const existingApp = apps.find(a => a.name === appName);
    if (existingApp) {
      app = existingApp;
    } else {
      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      }, appName);
    }
    return app;
  } catch (e) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT or initialize Firebase Admin SDK.", e);
    return null;
  }
}

const adminApp = initFirebaseAdminApp();

export function getAdminFirestore(): Firestore | null {
  if (!adminApp) return null;
  return getFirestore(adminApp);
}

export function getAdminAuth(): Auth | null {
  if (!adminApp) return null;
  return getAuth(adminApp);
}
