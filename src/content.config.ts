import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    category: z.string(),
    number: z.string(),
    readingTime: z.string(),
    image: z.enum(['material', 'whisperer', 'character', 'mellow', 'phone']),
    showInBlog: z.boolean().default(true),
    showInWork: z.boolean().default(false),
    workCategories: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
