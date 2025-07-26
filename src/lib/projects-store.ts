
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Archived';
  contentItems: number;
  lastUpdated: string;
  content: string;
  contentType: string;
}

interface ProjectsState {
  projects: Project[];
  currentProjectId: string | null;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setCurrentProjectId: (id: string | null) => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set) => ({
      projects: [
        {
          id: 'proj_1',
          title: 'Q2 Marketing Campaign Content',
          status: 'Active',
          contentItems: 12,
          lastUpdated: '2024-05-28',
          content: 'Initial content for Q2 marketing.',
          contentType: 'blog_post',
        },
        {
          id: 'proj_2',
          title: 'New Feature Launch Microsite',
          status: 'Completed',
          contentItems: 8,
          lastUpdated: '2024-05-15',
          content: 'Microsite content for new feature.',
          contentType: 'microsite',
        },
      ],
      currentProjectId: null,
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      updateProject: (id, updates) =>
        set((state) => ({
            projects: state.projects.map((p) =>
                p.id === id ? { ...p, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : p
            ),
        })),
      setCurrentProjectId: (id) => set({ currentProjectId: id }),
    }),
    {
      name: 'projects-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
