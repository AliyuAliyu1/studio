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
  title: z.string().describe('A concise and descriptive title for the generated content, based on the feedback.'),
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

  First, create a concise and descriptive title for the content based on the provided feedback.

  {{#if previousContent}}
  A previous version of the content exists. Refine the following content based on the new customer feedback provided.
  Previous content:
  ---
  {{{previousContent}}}
  ---
  {{else}}
  Generate new content based on the following customer feedback.
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

  {{#if (eq contentType "microsite")}}
  Generate a beautiful, modern, and slick single-page HTML microsite.
  - The page should be fully self-contained HTML.
  - Use TailwindCSS for styling. You can use any modern design elements like gradients, drop shadows, etc.
  - Use placeholder images from https://placehold.co where appropriate (e.g., https://placehold.co/600x400.png). Add a 'data-ai-hint' attribute to the image tags with one or two keywords for the image.
  - Incorporate ShadCN UI components by using their HTML structure and classes. For example, for a button, use '<button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Click me</button>'.
  - Use icons from 'lucide-react' by providing inline SVG for them.
  - Add subtle animations and transitions using 'tailwindcss-animate' classes like 'animate-in', 'fade-in', 'slide-in-from-bottom'.
  - The content of the microsite should be based on the customer feedback provided.
  - The output should be ONLY the HTML content for the microsite.
  {{else if (eq contentType "blog_post")}}
  Generate a new blog post based on the customer feedback.
  Your final output should be only the new, refined content, prefixed with the generated title.
  {{else if (eq contentType "social_media_post")}}
  Generate a new social media post based on the customer feedback.
  Your final output should be only the new, refined content, prefixed with the generated title.
  {{/if}}
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
