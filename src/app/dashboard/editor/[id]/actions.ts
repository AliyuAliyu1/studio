
"use server";

import { generateContent } from "@/ai/flows/generate-content";
import type { Project } from "@/lib/projects-store";

export async function refineProjectContent(project: Project, newFeedback: string): Promise<{ content?: string; error?: string }> {
    try {
        // In a real app, brandColor and logo would come from user settings in DB
        const brandColor = "#3F51B5"
        const contentTone = "friendly"
        
        const result = await generateContent({
            feedback: newFeedback,
            contentType: project.contentType as any,
            brandColor,
            contentTone,
            previousContent: project.content,
        });

        return { content: result.content };
    } catch(error) {
        console.error("Error refining content:", error);
        return { error: "Failed to refine content due to a server error." };
    }
}
