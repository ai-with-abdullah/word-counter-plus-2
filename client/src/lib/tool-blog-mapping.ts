import { getToolConfig, isDevelopment } from './site';

// Tool information for mapping
export interface ToolInfo {
  id: string;
  title: string;
  href: string;
  isExternal: boolean;
  keywords: string[]; // Keywords to match against blog content
}

// Get all available tools with mapping information
export function getAllTools(): ToolInfo[] {
  const toolConfig = getToolConfig();

  return [
    {
      id: 'word-counter',
      title: 'Word Counter',
      href: toolConfig.wordCounterUrl,
      isExternal: !isDevelopment() && !toolConfig.isMainDomain,
      keywords: ['word count', 'text analysis', 'readability', 'writing', 'content', 'word frequency', 'keyword density']
    },
    {
      id: 'character-counter',
      title: 'Character Counter',
      href: '/character-counter',
      isExternal: false,
      keywords: ['character count', 'character limit', 'social media', 'twitter', 'facebook', 'instagram']
    },
    {
      id: 'text-case-converter',
      title: 'Text Case Converter',
      href: toolConfig.textCaseUrl,
      isExternal: !isDevelopment() && !toolConfig.isMainDomain,
      keywords: ['text case', 'uppercase', 'lowercase', 'title case', 'camel case', 'formatting']
    }
  ];
}

// Find the most relevant tool for a blog post
export function getRelatedTool(blogTitle: string, blogContent: string, blogTags: string[]): ToolInfo | null {
  const tools = getAllTools();
  const searchText = `${blogTitle} ${blogContent} ${blogTags.join(' ')}`.toLowerCase();
  
  let bestMatch: ToolInfo | null = null;
  let bestScore = 0;

  for (const tool of tools) {
    let score = 0;
    
    // Check how many keywords match
    for (const keyword of tool.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        // Give higher weight to exact matches and title matches
        if (blogTitle.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        } else if (blogTags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 2;
        } else {
          score += 1;
        }
      }
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = tool;
    }
  }
  
  // Only return a match if we have a reasonable confidence level
  return bestScore >= 2 ? bestMatch : null;
}

// Find all tools related to a blog post (for showing multiple options)
export function getAllRelatedTools(blogTitle: string, blogContent: string, blogTags: string[], limit: number = 3): ToolInfo[] {
  const tools = getAllTools();
  const searchText = `${blogTitle} ${blogContent} ${blogTags.join(' ')}`.toLowerCase();
  
  const toolScores = tools.map(tool => {
    let score = 0;
    
    for (const keyword of tool.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        if (blogTitle.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        } else if (blogTags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 2;
        } else {
          score += 1;
        }
      }
    }
    
    return { tool, score };
  });
  
  return toolScores
    .filter(item => item.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.tool);
}

// Get related blogs for a specific tool
export function getRelatedBlogsForTool(toolHref: string, blogPosts: any[], limit: number = 6): any[] {
  const tool = getAllTools().find(t => t.href === toolHref);
  if (!tool) return [];
  
  const relatedBlogs = blogPosts.map(blog => {
    let score = 0;
    const searchText = `${blog.title} ${blog.content} ${blog.tags.join(' ')}`.toLowerCase();
    
    for (const keyword of tool.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        if (blog.title.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        } else if (blog.tags.some((tag: string) => tag.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 2;
        } else {
          score += 1;
        }
      }
    }
    
    return { blog, score };
  });
  
  return relatedBlogs
    .filter(item => item.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.blog);
}

// Internal linking suggestions for content
export interface InternalLink {
  text: string;
  url: string;
  type: 'tool' | 'blog';
  relevance: number;
}

export function generateInternalLinks(content: string, currentUrl: string, blogPosts: any[]): InternalLink[] {
  const links: InternalLink[] = [];
  const tools = getAllTools();
  const contentLower = content.toLowerCase();
  
  // Find tool-related links
  tools.forEach(tool => {
    if (tool.href === currentUrl) return; // Don't link to current page
    
    let relevance = 0;
    let foundKeywords: string[] = [];
    
    tool.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (contentLower.includes(keywordLower)) {
        relevance += contentLower.split(keywordLower).length - 1;
        foundKeywords.push(keyword);
      }
    });
    
    if (relevance > 0) {
      links.push({
        text: tool.title,
        url: tool.href,
        type: 'tool',
        relevance
      });
    }
  });
  
  // Find blog-related links
  blogPosts.forEach(blog => {
    if (blog.slug === currentUrl.replace('/blog/', '')) return; // Don't link to current blog
    
    let relevance = 0;
    
    // Check title keywords
    const blogTitleWords = blog.title.toLowerCase().split(' ');
    const contentWords = contentLower.split(' ');
    
    blogTitleWords.forEach((word: string) => {
      if (word.length > 3 && contentWords.includes(word)) {
        relevance += 2;
      }
    });
    
    // Check tags
    blog.tags.forEach((tag: string) => {
      if (contentLower.includes(tag.toLowerCase())) {
        relevance += 3;
      }
    });
    
    if (relevance > 2) { // Only suggest highly relevant blogs
      links.push({
        text: blog.title,
        url: `/blog/${blog.slug}`,
        type: 'blog',
        relevance
      });
    }
  });
  
  // Sort by relevance and return top suggestions
  return links
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 8); // Maximum 8 internal links
}

// Find blog posts related to a specific tool
export function getBlogPostsForTool(toolId: string, allBlogPosts: any[], limit: number = 3): any[] {
  const tool = getAllTools().find(t => t.id === toolId);
  if (!tool) return [];
  
  const relatedPosts = allBlogPosts.map(post => {
    const searchText = `${post.title} ${post.content} ${post.tags.join(' ')}`.toLowerCase();
    let score = 0;
    
    for (const keyword of tool.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        if (post.title.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        } else if (post.tags.some((tag: string) => tag.toLowerCase().includes(keyword.toLowerCase()))) {
          score += 2;
        } else {
          score += 1;
        }
      }
    }
    
    return { post, score };
  });
  
  return relatedPosts
    .filter(item => item.score >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}