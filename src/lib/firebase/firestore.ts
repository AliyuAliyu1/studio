
import { initFirebaseAdminApp } from "@/lib/firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Initialize Firebase Admin App
const app = initFirebaseAdminApp();
const db = getFirestore(app);

const PROJECTS_COLLECTION = 'projects';

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

export async function getProjects(): Promise<Project[]> {
    try {
        const snapshot = await db.collection(PROJECTS_COLLECTION).orderBy('lastUpdated', 'desc').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                lastUpdated: data.lastUpdated.toDate().toISOString().split('T')[0],
            } as Project;
        });
    } catch (error) {
        console.error("Error getting projects:", error);
        throw new Error("Failed to fetch projects from Firestore.");
    }
}


export async function addProject(projectData: ProjectData): Promise<string> {
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
    try {
        await db.collection(PROJECTS_COLLECTION).doc(id).delete();
    } catch (error) {
        console.error(`Error deleting project ${id}:`, error);
        throw new Error("Failed to delete project from Firestore.");
    }
}
