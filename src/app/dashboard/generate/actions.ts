"use server"

import { analyzeFeedback, AnalyzeFeedbackOutput as AFOutput } from "@/ai/flows/analyze-feedback"
import { generateContent, GenerateContentOutput as GCOutput } from "@/ai/flows/generate-content"

export type AnalyzeFeedbackOutput = AFOutput
export type GenerateContentOutput = GCOutput & { contentType: string };

export async function generateAndAnalyze(
  feedback: string,
  contentType: "blog_post" | "social_media_post" | "microsite"
): Promise<{ analysis: AnalyzeFeedbackOutput; content: GenerateContentOutput }> {
  try {
    // In a real app, brandColor and logo would come from user settings in DB
    const brandColor = "#3F51B5"
    const contentTone = "friendly"

    // Run AI calls in parallel for efficiency
    const [analysisResult, contentResult] = await Promise.all([
      analyzeFeedback({ feedback }),
      generateContent({
        feedback,
        contentType,
        brandColor,
        contentTone,
      }),
    ])

    return { 
        analysis: analysisResult, 
        content: { ...contentResult, contentType }
    }
  } catch (error) {
    console.error("Error in generateAndAnalyze:", error)
    // Provide a more user-friendly error message
    throw new Error("Failed to generate content due to a server error. Please try again later.")
  }
}
