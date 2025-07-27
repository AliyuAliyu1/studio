
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getProjects, addProject as addProjectToFirestore, deleteProject as deleteProjectFromFirestore, updateProject as updateProjectInFirestore } from '@/lib/firebase/firestore';
import type { Project, ProjectData } from '@/lib/firebase/firestore';


interface ProjectsState {
  projects: Project[];
  currentProjectId: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (projectData: ProjectData) => Promise<string>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  setCurrentProjectId: (id: string | null) => void;
  getProjectById: (id: string) => Project | undefined;
}

export const useProjectsStore = create<ProjectsState>()(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      fetchProjects: async () => {
        const projects = await getProjects();
        set({ projects });
      },
      addProject: async (projectData) => {
        const newProjectId = await addProjectToFirestore(projectData);
        await get().fetchProjects(); // Refresh the list
        return newProjectId;
      },
      deleteProject: async (id) => {
        await deleteProjectFromFirestore(id);
        await get().fetchProjects(); // Refresh the list
      },
      updateProject: async (id, updates) => {
        await updateProjectInFirestore(id, updates);
        await get().fetchProjects(); // Refresh the list
      },
      setCurrentProjectId: (id) => set({ currentProjectId: id }),
      getProjectById: (id: string) => {
        return get().projects.find(p => p.id === id);
      }
    })
);
