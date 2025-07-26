'use server';
/**
 * @fileOverview An AI content generation flow.
 *
 * - generateContent - A function that handles the content generation process.
 * - GenerateContentInput - The input type for the generateContent function.
 * - GenerateContentOutput - The return type for the generateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentInputSchema = z.object({
  feedback: z.string().describe('The customer feedback to generate content from.'),
  contentType: z.enum(['blog_post', 'social_media_post', 'microsite']).describe('The type of content to generate.'),
  brandColor: z.string().describe('The brand color to use in the content.'),
  logoDataUri: z.string().describe("The logo of the brand, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'.").optional(),
  contentTone: z.string().describe('The tone of the content (friendly, formal, concise).').optional(),
  previousContent: z.string().describe('Previously generated content for this project, to be refined.').optional(),
});
export type GenerateContentInput = z.infer<typeof GenerateContentInputSchema>;

const GenerateContentOutputSchema = z.object({
  content: z.string().describe('The generated content.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  return generateContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: {schema: GenerateContentInputSchema},
  output: {schema: GenerateContentOutputSchema},
  prompt: `You are an AI assistant that generates branded content based on customer feedback.

  {{#if previousContent}}
  A previous version of the content exists. Refine the following content based on the new customer feedback provided.
  Previous content:
  ---
  {{{previousContent}}}
  ---
  {{else}}
  Generate a new {{contentType}} based on the following customer feedback.
  {{/if}}

  Customer Feedback:
  {{feedback}}

  Use the following brand color: {{brandColor}}

  {{#if logoDataUri}}
  Use the following logo: {{media url=logoDataUri}}
  {{/if}}

  {{#if contentTone}}
  Use the following content tone: {{contentTone}}
  {{/if}}

  Your final output should be only the new, refined content.
  `,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
