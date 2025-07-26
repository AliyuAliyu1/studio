
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
  addProject: (project: Project) => void;
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
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
    }),
    {
      name: 'projects-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
