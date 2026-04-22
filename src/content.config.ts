import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
  }),
});

const ajuda = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ajuda' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, ajuda };
