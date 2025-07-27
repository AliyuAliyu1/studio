import { initializeApp, getApps, App, cert } from 'firebase-admin/app';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

// This is a temporary solution to make it work in preview environments.
// In a real app, you would have a more robust way to handle this.
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

    if (!serviceAccount) {
        // In a real application, you'd want to handle this more gracefully.
        // For instance, you might not initialize the admin app at all if the
        // service account isn't available, and disable features that need it.
        throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set. Cannot initialize Firebase Admin SDK.");
    }
    
    return initializeApp({
        credential: cert(serviceAccount),
        projectId: getProjectFromServiceAccount(),
    }, appName);
}
