
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { suggestNumber, type SuggestNumberOutput } from '@/ai/flows/ai-suggest-number';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Bot, Hash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const FormSchema = z.object({
  demographics: z.string().min(10, {
    message: 'Please describe your target demographics in at least 10 characters.',
  }),
  geographicalPreferences: z.string().min(2, {
    message: 'Please enter at least one geographical preference (e.g., area code, city, or region).',
  }),
});

export function AiSuggesterForm() {
  const [result, setResult] = useState<SuggestNumberOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      demographics: '',
      geographicalPreferences: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await suggestNumber(data);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get suggestions from AI. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
            <CardTitle>Describe Your Needs</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="demographics"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Target Demographics</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Young professionals in tech startups, families in suburban areas, etc."
                        className="min-h-[100px]"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        Who are you trying to reach?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="geographicalPreferences"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Geographical Preferences</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Area code 415, New York City, Pacific Northwest"
                        className="min-h-[100px]"
                        {...field}
                        />
                    </FormControl>
                    <FormDescription>
                        Where should the number appear to be from?
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? 'Generating...' : 'Get Suggestions'}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Suggestions</CardTitle>
          <CardDescription>
            Our AI will generate suggestions based on your input.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
               <Skeleton className="h-8 w-1/2" />
               <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          )}
          {!isLoading && result && (
             <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Hash className="h-4 w-4 text-primary" />Suggested Numbers</h3>
                  <div className="space-y-2">
                    {result.suggestedNumbers.map((num) => (
                      <div key={num} className="p-3 bg-muted rounded-md font-mono text-sm">{num}</div>
                    ))}
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI Reasoning</h3>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{result.reasoning}</p>
                </div>
            </div>
          )}
          {!isLoading && !result && (
            <div className="text-center text-muted-foreground py-10">
                <Sparkles className="mx-auto h-12 w-12" />
                <p className="mt-2">Your suggestions will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
