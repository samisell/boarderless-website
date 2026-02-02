// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview AI-powered number suggestion flow.
 *
 * This flow uses an LLM to suggest relevant virtual phone numbers based on user-provided demographics and geographical preferences.
 * It exports:
 *   - suggestNumber: The main function to trigger the number suggestion flow.
 *   - SuggestNumberInput: The input type for the suggestNumber function.
 *   - SuggestNumberOutput: The output type for the suggestNumber function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestNumberInputSchema = z.object({
  demographics: z.string().describe('Target demographics for the phone number.'),
  geographicalPreferences: z.string().describe('Geographical preferences for the phone number (e.g., area codes, regions).'),
});

export type SuggestNumberInput = z.infer<typeof SuggestNumberInputSchema>;

const SuggestNumberOutputSchema = z.object({
  suggestedNumbers: z.array(z.string()).describe('An array of suggested virtual phone numbers.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested numbers.'),
});

export type SuggestNumberOutput = z.infer<typeof SuggestNumberOutputSchema>;

export async function suggestNumber(input: SuggestNumberInput): Promise<SuggestNumberOutput> {
  return suggestNumberFlow(input);
}

const suggestNumberPrompt = ai.definePrompt({
  name: 'suggestNumberPrompt',
  input: {schema: SuggestNumberInputSchema},
  output: {schema: SuggestNumberOutputSchema},
  prompt: `You are an AI assistant helping users find suitable virtual phone numbers. Consider the target demographics and geographical preferences provided by the user. Suggest a list of virtual phone numbers that align with these preferences. Explain your reasoning for the suggestions.

Target Demographics: {{{demographics}}}
Geographical Preferences: {{{geographicalPreferences}}}

Output the suggested numbers and your reasoning in the format specified by the output schema.`,
});

const suggestNumberFlow = ai.defineFlow(
  {
    name: 'suggestNumberFlow',
    inputSchema: SuggestNumberInputSchema,
    outputSchema: SuggestNumberOutputSchema,
  },
  async input => {
    const {output} = await suggestNumberPrompt(input);
    return output!;
  }
);
