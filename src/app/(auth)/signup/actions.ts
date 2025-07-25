"use server"

import { getAuth } from "firebase-admin/auth";
import { initFirebaseAdminApp } from "@/lib/firebase-admin";

export async function signup(data: { fullName: string; email: string; password: string; }) {
  try {
    const app = initFirebaseAdminApp();
    const auth = getAuth(app);
    
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.fullName,
    });
    
    return { uid: userRecord.uid };
  } catch (error: any) {
    // Firebase Admin SDK errors have a code property
    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-exists':
          return { error: 'This email address is already in use.' };
        case 'auth/invalid-password':
          return { error: 'The password must be at least 6 characters long.' };
        default:
          return { error: 'An unexpected error occurred during sign-up.' };
      }
    }
    return { error: 'An unknown error occurred.' };
  }
}
