// Export blog data to JSON for sitemap generation
import { blogPosts } from './client/src/data/blogData.ts';
import { writeFileSync } from 'fs';

const blogData = blogPosts.map(post => ({
  slug: post.slug,
  publishDate: post.publishDate
}));

writeFileSync('blog-data.json', JSON.stringify(blogData, null, 2));
console.log(`Exported ${blogData.length} blog posts to blog-data.json`);
