
"use server"

import { 
    getProjects as getProjectsFromDb, 
    addProject as addProjectToDb, 
    updateProject as updateProjectInDb, 
    deleteProject as deleteProjectFromDb 
} from "./firestore";
import type { ProjectData } from "./firestore";

// This file contains server actions that can be called from client components.
// They safely wrap our database functions.

export async function getProjects() {
    return await getProjectsFromDb();
}

export async function addProject(projectData: ProjectData) {
    return await addProjectToDb(projectData);
}

export async function updateProject(id: string, updates: Partial<ProjectData>) {
    return await updateProjectInDb(id, updates);
}

export async function deleteProject(id: string) {
    return await deleteProjectFromDb(id);
}
