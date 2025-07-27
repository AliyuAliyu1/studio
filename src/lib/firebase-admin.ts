import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

// This is a mock service account for local development & preview environments
// In a real production environment, you should use a secure way to load your service account key.
const mockServiceAccount = {
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-your-stuff@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-your-stuff%40your-project-id.iam.gserviceaccount.com"
};

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : mockServiceAccount; // Use mock if env var is not set

const getProjectFromServiceAccount = () => {
    if (!serviceAccount) return undefined;
    return serviceAccount.project_id;
}


const appName = "firebase-admin-app";

export function initFirebaseAdminApp(): App {
    const apps = getApps();
    const existingApp = apps.find(app => app.name === appName);
    if (existingApp) {
        return existingApp;
    }

    // When the service account is the mock one, we can't initialize the app
    // This will cause Firestore operations to fail, but it prevents the app from crashing.
    if (serviceAccount === mockServiceAccount) {
        console.warn("Firebase Admin SDK is not initialized. Using mock data. Set FIREBASE_SERVICE_ACCOUNT env var for full functionality.")
        // Return a mock app object to prevent crashes
        return { name: appName, options: {}, auth: () => null, firestore: () => null } as unknown as App;
    }
    
    return initializeApp({
        credential: cert(serviceAccount),
        projectId: getProjectFromServiceAccount(),
    }, appName);
}
