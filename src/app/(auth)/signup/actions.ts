
"use server"

import { getAdminAuth } from "@/lib/firebase-admin";

export async function signup(data: { fullName: string; email: string; password: string; }) {
  const auth = getAdminAuth();
  if (!auth) {
      console.warn("Auth is not initialized. Returning mock user for signup.");
      // In a real app, you might want to throw an error or handle this differently.
      // For local dev/preview, we can return a mock UID to allow the flow to continue.
      return { uid: `mock-uid-${Date.now()}` };
  }

  try {
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
          return { error: `An unexpected Firebase error occurred: ${error.code}` };
      }
    }
    return { error: 'An unknown error occurred during sign-up.' };
  }
}
