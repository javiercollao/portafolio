import type { CollectionEntry } from 'astro:content';

export const categorySlug = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const workCategoriesFor = (post: CollectionEntry<'blog'>) => {
  const categories = post.data.workCategories?.length
    ? post.data.workCategories
    : [post.data.category];
  return [...new Set(categories.map(category => category.trim()).filter(Boolean))];
};
