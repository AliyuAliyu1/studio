
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

// The Zod schema is still useful for defining the output type of our flow function.
const GenerateContentOutputSchema = z.object({
  title: z.string().describe('A concise and descriptive title for the generated content, based on the feedback.'),
  content: z.string().describe('The generated content.'),
});
export type GenerateContentOutput = z.infer<typeof GenerateContentOutputSchema>;

export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  return generateContentFlow(input);
}

// We remove the `output` schema from the prompt definition.
// We will parse the output manually.
const prompt = ai.definePrompt({
  name: 'generateContentPrompt',
  input: {schema: GenerateContentInputSchema},
  prompt: `You are an AI assistant that generates branded content based on customer feedback.

  Your output should be structured as follows:
  1. The first line MUST be the title of the content.
  2. The second line MUST be '---'.
  3. The rest of the output MUST be the content itself.

  {{#if isMicrosite}}
  Generate a beautiful, modern, and slick single-page HTML microsite based on the customer feedback.
  - The title on the first line should be a concise and descriptive title for the microsite.
  - The content (after the '---' separator) must be the full, self-contained HTML for the microsite, wrapped in a single \`<div>\` tag. Do not include \`<html>\` or \`<body>\` tags.
  - Use TailwindCSS for styling. You can use any modern design elements like gradients, drop shadows, etc.
  - Use placeholder images from https://placehold.co where appropriate (e.g., https://placehold.co/600x400.png). Add a 'data-ai-hint' attribute to the image tags with one or two keywords for the image.
  - Incorporate ShadCN UI components by using their HTML structure and classes. For a button, use '<button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Click me</button>'.
  - Use icons from 'lucide-react' by providing inline SVG for them.
  - Add subtle animations and transitions using 'tailwindcss-animate' classes like 'animate-in', 'fade-in', 'slide-in-from-bottom'.
  - The content of the microsite should be based on the customer feedback provided.
  {{/if}}
  
  {{#if isBlogPost}}
    {{#if previousContent}}
    A previous version of the content exists. Refine the following content based on the new customer feedback provided.
    Previous content:
    ---
    {{{previousContent}}}
    ---
    {{else}}
    Generate a new blog post based on the following customer feedback.
    {{/if}}
  {{/if}}

  {{#if isSocialMediaPost}}
     {{#if previousContent}}
    A previous version of the content exists. Refine the following content based on the new customer feedback provided.
    Previous content:
    ---
    {{{previousContent}}}
    ---
    {{else}}
    Generate a new social media post based on the following customer feedback.
    {{/if}}
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
  `,
});

const generateContentFlow = ai.defineFlow(
  {
    name: 'generateContentFlow',
    inputSchema: GenerateContentInputSchema,
    outputSchema: GenerateContentOutputSchema,
  },
  async (input): Promise<GenerateContentOutput> => {
    // Sanitize input and add boolean flags for Handlebars
    const sanitizedInput = {
      ...input,
      isMicrosite: input.contentType === 'microsite',
      isBlogPost: input.contentType === 'blog_post',
      isSocialMediaPost: input.contentType === 'social_media_post',
      logoDataUri: input.logoDataUri || undefined,
      contentTone: input.contentTone || undefined,
      previousContent: input.previousContent || undefined,
    };
    
    // We get the raw text response from the model.
    const response = await prompt(sanitizedInput);
    const rawText = response.text;

    if (!rawText) {
      throw new Error('Failed to generate content. The AI returned an empty response.');
    }

    // Manually parse the title and content from the raw text.
    const parts = rawText.split('\n---\n');
    if (parts.length < 2) {
      console.error("AI output did not contain '---' separator. Full output:", rawText);
      throw new Error("Failed to parse AI output. The content structure was invalid.");
    }

    const title = parts[0].trim();
    const content = parts.slice(1).join('\n---\n').trim();

    return { title, content };
  }
);
