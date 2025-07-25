"use server"

import { getAuth } from "firebase-admin/auth";
import { initFirebaseAdminApp } from "@/lib/firebase-admin";

// Note: This is a simplified login for demonstration.
// In a real app, you would verify the user's password using a client-side SDK
// like Firebase Authentication for web, and then get the ID token to verify on the server.
// Directly handling passwords on the server is not a standard practice with Firebase Auth.
export async function login(data: { email: string; password: string }) {
  try {
    // This is a mock implementation to allow access.
    // A real implementation would involve validating credentials against Firebase Auth.
    // Since we can't easily validate passwords with the Admin SDK without custom tokens,
    // we'll just check if a user with that email exists.
    const app = initFirebaseAdminApp();
    const auth = getAuth(app);

    // This check is just to simulate a lookup.
    await auth.getUserByEmail(data.email);

    if (data.password.length < 6) {
        return { error: 'Password must be at least 6 characters.' };
    }
    
    // In a real flow, you'd create a session cookie here.
    // For this demo, we just return success.
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
       return { error: 'No user found with this email.' };
    }
    if (error.code === 'auth/invalid-credential') {
      return { error: 'Invalid credentials. Please try again.' };
    }
    // For other Firebase errors or general errors
    return { error: 'An unexpected error occurred during login.' };
  }
}
