// Generate blog index for server-side sitemap
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Programmatic topics from generateAdditionalPosts() function
const programmaticTopics = [
  "Grant Writing: Securing Funding for Projects",
  "Newsletter Writing: Building Subscriber Relationships", 
  "Blog SEO: Optimizing Content for Search",
  "Screenwriting: Crafting Compelling Scripts",
  "Resume Writing: Landing Your Dream Job",
  "Press Release Writing: Getting Media Attention",
  "Website Copy: Converting Visitors to Customers",
  "Proposal Writing: Winning Business Deals",
  "Product Description Writing: Selling with Words",
  "Editorial Writing: Expressing Opinions Effectively",
  "Travel Writing: Capturing Experiences in Words",
  "Food Writing: Making Readers Taste Your Words",
  "Review Writing: Honest and Helpful Critiques",
  "Interview Writing: Capturing Authentic Voices",
  "Memoir Writing: Telling Your Life Story",
  "Children's Book Writing: Engaging Young Readers",
  "Poetry Writing: Expressing Emotions Through Verse",
  "Ghostwriting: Writing in Someone Else's Voice",
  "Web Content Strategy: Planning Digital Presence",
  "Content Curation: Finding and Sharing Quality Content",
  "Writing for Mobile: Optimizing for Small Screens",
  "Voice and Tone: Developing Brand Personality",
  "Writing Headlines That Get Clicks",
  "Content Calendar Planning: Organizing Your Strategy",
  "Writing for Different Generations",
  "International Writing: Cultural Considerations",
  "Legal Writing: Clear and Precise Documentation",
  "Medical Writing: Communicating Health Information",
  "Scientific Writing: Presenting Research Clearly",
  "Financial Writing: Explaining Complex Concepts",
  "Real Estate Writing: Property Descriptions That Sell",
  "Non-Profit Writing: Inspiring Action for Causes",
  "Event Writing: Promoting and Documenting Gatherings",
  "Sports Writing: Capturing Athletic Excellence",
  "Fashion Writing: Describing Style and Trends"
];

// Convert topic to slug using same logic as blogData.ts
function topicToSlug(topic) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractBlogSlugs() {
  const allSlugs = [];
  
  // Read main blogData.ts file
  const blogDataPath = path.join(__dirname, '../client/src/data/blogData.ts');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');
  
  // Extract slugs from main file
  const mainSlugs = blogDataContent.match(/slug:\s*["']([^"']+)["'],?/g);
  if (mainSlugs) {
    mainSlugs.forEach(match => {
      const slug = match.match(/["']([^"']+)["']/)?.[1];
      if (slug) allSlugs.push(slug);
    });
  }
  
  // Also read individual blog files in blogs/ directory
  const blogsDir = path.join(__dirname, '../client/src/data/blogs');
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.ts'));
  
  for (const file of files) {
    const filePath = path.join(blogsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    const slugMatches = content.match(/slug:\s*["']([^"']+)["'],?/g);
    if (slugMatches) {
      slugMatches.forEach(match => {
        const slug = match.match(/["']([^"']+)["']/)?.[1];
        if (slug) allSlugs.push(slug);
      });
    }
  }
  
  // Add programmatically generated slugs (generateAdditionalPosts(18, 35))
  programmaticTopics.forEach(topic => {
    allSlugs.push(topicToSlug(topic));
  });
  
  // Remove duplicates
  const uniqueSlugs = [...new Set(allSlugs)];
  
  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, '../shared');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write JSON file
  const outputPath = path.join(outputDir, 'blog-index.json');
  fs.writeFileSync(outputPath, JSON.stringify({ slugs: uniqueSlugs }, null, 2));
  
  console.log(`Generated blog index with ${uniqueSlugs.length} blog posts`);
  return uniqueSlugs.length;
}

// Run
try {
  const count = extractBlogSlugs();
  process.exit(count > 0 ? 0 : 1);
} catch (error) {
  console.error('Error generating blog index:', error);
  process.exit(1);
}
