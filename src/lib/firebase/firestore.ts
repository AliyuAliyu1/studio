import { initFirebaseAdminApp } from "@/lib/firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const app = initFirebaseAdminApp();
// The app might be a mock object if the service account is not set.
// In that case, db will be null, and we'll handle it in the functions.
const db = app.name !== '[DEFAULT]' ? getFirestore(app) : null;

export const PROJECTS_COLLECTION = 'projects';
export const MICROSITES_COLLECTION = 'microsites';


export interface ProjectData {
    title: string;
    status: 'Active' | 'Completed' | 'Archived';
    contentItems: number;
    content: string;
    contentType: string;
}

export interface Project extends ProjectData {
  id: string;
  lastUpdated: string;
}

export interface Microsite {
    id: string;
    title: string;
    slug: string;
    html: string;
    brandColor: string;
    logoURL?: string;
    createdAt: string;
}


// --- Project Functions ---

export async function getProjects(): Promise<Project[]> {
    if (!db) {
        console.warn("Firestore is not initialized. Returning empty projects array.");
        return [];
    }
    try {
        const snapshot = await db.collection(PROJECTS_COLLECTION).orderBy('lastUpdated', 'desc').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            const lastUpdatedTimestamp = data.lastUpdated;
            const lastUpdated = lastUpdatedTimestamp?.toDate ? lastUpdatedTimestamp.toDate() : new Date(lastUpdatedTimestamp);

            return {
                id: doc.id,
                ...data,
                lastUpdated: lastUpdated.toISOString().split('T')[0],
            } as Project;
        });
    } catch (error) {
        console.error("Error getting projects:", error);
        throw new Error("Failed to fetch projects from Firestore.");
    }
}


export async function addProject(projectData: ProjectData): Promise<string> {
     if (!db) {
        console.warn("Firestore is not initialized. Cannot add project.");
        return "mock-project-id";
    }
    try {
        const docRef = await db.collection(PROJECTS_COLLECTION).add({
            ...projectData,
            lastUpdated: FieldValue.serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding project:", error);
        throw new Error("Failed to add project to Firestore.");
    }
}

export async function updateProject(id: string, updates: Partial<ProjectData>): Promise<void> {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot update project.");
        return;
    }
    try {
        const docRef = db.collection(PROJECTS_COLLECTION).doc(id);
        await docRef.update({
            ...updates,
            lastUpdated: FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error(`Error updating project ${id}:`, error);
        throw new Error("Failed to update project in Firestore.");
    }
}

export async function deleteProject(id: string): Promise<void> {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot delete project.");
        return;
    }
    try {
        await db.collection(PROJECTS_COLLECTION).doc(id).delete();
    } catch (error) {
        console.error(`Error deleting project ${id}:`, error);
        throw new Error("Failed to delete project from Firestore.");
    }
}

// --- Microsite Functions ---

export async function addMicrosite(data: Omit<Microsite, 'id' | 'createdAt'>): Promise<string> {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot add microsite.");
        return "mock-microsite-id";
    }
    try {
        const docRef = await db.collection(MICROSITES_COLLECTION).add({
            ...data,
            createdAt: FieldValue.serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding microsite:", error);
        throw new Error("Failed to add microsite to Firestore.");
    }
}

export async function getMicrositeBySlug(slug: string): Promise<Microsite | null> {
    if (!db) {
        console.warn("Firestore is not initialized. Cannot get microsite.");
        return null;
    }
    try {
        const snapshot = await db.collection(MICROSITES_COLLECTION).where('slug', '==', slug).limit(1).get();
        if (snapshot.empty) {
            return null;
        }
        const doc = snapshot.docs[0];
        const data = doc.data();
        const createdAtTimestamp = data.createdAt;
        const createdAt = createdAtTimestamp?.toDate ? createdAtTimestamp.toDate() : new Date(createdAtTimestamp);

        return {
            id: doc.id,
            ...data,
            createdAt: createdAt.toISOString(),
        } as Microsite;

    } catch (error) {
        console.error(`Error getting microsite by slug ${slug}:`, error);
        throw new Error("Failed to fetch microsite from Firestore.");
    }
}
