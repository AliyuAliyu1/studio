// src/ai/flows/analyze-feedback.ts
'use server';
/**
 * @fileOverview A flow for analyzing customer feedback to extract themes, sentiment, and key insights.
 *
 * - analyzeFeedback - A function that handles the feedback analysis process.
 * - AnalyzeFeedbackInput - The input type for the analyzeFeedback function.
 * - AnalyzeFeedbackOutput - The return type for the analyzeFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFeedbackInputSchema = z.object({
  feedback: z
    .string()
    .describe('The customer feedback text to be analyzed.'),
});
export type AnalyzeFeedbackInput = z.infer<typeof AnalyzeFeedbackInputSchema>;

const AnalyzeFeedbackOutputSchema = z.object({
  themes: z.array(z.string()).describe('Key themes identified in the feedback.'),
  sentiment: z.string().describe('Overall sentiment of the feedback (positive, negative, neutral).'),
  insights: z.string().describe('Key insights extracted from the feedback.'),
});
export type AnalyzeFeedbackOutput = z.infer<typeof AnalyzeFeedbackOutputSchema>;

export async function analyzeFeedback(input: AnalyzeFeedbackInput): Promise<AnalyzeFeedbackOutput> {
  return analyzeFeedbackFlow(input);
}

const analyzeFeedbackPrompt = ai.definePrompt({
  name: 'analyzeFeedbackPrompt',
  input: {schema: AnalyzeFeedbackInputSchema},
  output: {schema: AnalyzeFeedbackOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing customer feedback.

  Analyze the following feedback to extract key themes, sentiment, and insights.

  Feedback: {{{feedback}}}

  Output the themes as a simple array of strings.
  Determine the overall sentiment of the feedback (positive, negative, or neutral).
  Extract key insights from the feedback that would be valuable to the business.
  `,
});

const analyzeFeedbackFlow = ai.defineFlow(
  {
    name: 'analyzeFeedbackFlow',
    inputSchema: AnalyzeFeedbackInputSchema,
    outputSchema: AnalyzeFeedbackOutputSchema,
  },
  async input => {
    const {output} = await analyzeFeedbackPrompt(input);
    return output!;
  }
);
