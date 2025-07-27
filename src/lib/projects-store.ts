
'use client';

import { create } from 'zustand';
import { getProjects, addProject, deleteProject, updateProject } from '@/lib/firebase/actions';
import type { Project, ProjectData } from '@/lib/firebase/firestore';


interface ProjectsState {
  projects: Project[];
  currentProjectId: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (projectData: ProjectData) => Promise<string>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, updates: Partial<ProjectData>) => Promise<void>;
  setCurrentProjectId: (id: string | null) => void;
  getProjectById: (id: string) => Project | undefined;
}

export const useProjectsStore = create<ProjectsState>()(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      fetchProjects: async () => {
        try {
            const projects = await getProjects();
            set({ projects });
        } catch (error) {
            console.error("Failed to fetch projects for store:", error);
        }
      },
      addProject: async (projectData) => {
        const newProjectId = await addProject(projectData);
        await get().fetchProjects(); // Refresh the list
        return newProjectId;
      },
      deleteProject: async (id) => {
        await deleteProject(id);
        await get().fetchProjects(); // Refresh the list
      },
      updateProject: async (id, updates) => {
        await updateProject(id, updates);
        await get().fetchProjects(); // Refresh the list
      },
      setCurrentProjectId: (id) => set({ currentProjectId: id }),
      getProjectById: (id: string) => {
        return get().projects.find(p => p.id === id);
      }
    })
);
