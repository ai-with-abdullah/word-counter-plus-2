import { Link } from 'wouter';
import { FaTools, FaBlog, FaArrowRight } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  type: 'tool' | 'blog';
  category?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  maxItems?: number;
  className?: string;
}

export default function RelatedContent({ 
  title = "Related Content", 
  items, 
  maxItems = 4,
  className = ""
}: RelatedContentProps) {
  const displayItems = items.slice(0, maxItems);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className={`bg-card/50 rounded-lg p-6 border border-border ${className}`}>
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <FaArrowRight className="text-primary text-lg" />
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                {item.type === 'tool' ? (
                  <FaTools className="text-primary text-sm" />
                ) : (
                  <FaBlog className="text-primary text-sm" />
                )}
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  {item.type === 'tool' ? 'Tool' : 'Article'}
                  {item.category && ` • ${item.category}`}
                </span>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                <Link href={item.href} data-testid={`link-related-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span>{item.title}</span>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </CardDescription>
              <Link href={item.href}>
                <span 
                  className="inline-flex items-center p-0 h-auto text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
                  data-testid={`link-related-${item.title.toLowerCase().replace(/\s+/g, '-')}-cta`}
                >
                  {item.type === 'tool' ? 'Try Tool' : 'Read Article'}
                  <FaArrowRight className="ml-2 text-xs" />
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Predefined related content mappings
export const TOOL_RELATED_CONTENT: Record<string, RelatedItem[]> = {
  'word-counter': [
    {
      title: 'Random Word Generator',
      description: 'Generate random words for creative writing, brainstorming, and word games with customizable options.',
      href: '/random-word-generator',
      type: 'tool',
      category: 'Writing Tools'
    },
    {
      title: 'Words Per Page Calculator',
      description: 'Convert words to pages and pages to words with accurate formatting calculations for any document.',
      href: '/words-per-page',
      type: 'tool',
      category: 'Writing Tools'
    },
    {
      title: 'How to Improve Your Writing Readability Score',
      description: 'Learn proven techniques to make your content more readable using our word counter analysis.',
      href: '/blog/improve-writing-readability-score',
      type: 'blog',
      category: 'Writing Tips'
    },
    {
      title: 'SEO Content Writing: The Ultimate Guide',
      description: 'Master SEO content writing with word count targets and keyword density analysis.',
      href: '/blog/seo-content-writing-ultimate-guide',
      type: 'blog',
      category: 'SEO'
    }
  ],
  'random-word-generator': [
    {
      title: 'Word Counter',
      description: 'Count words, characters, and analyze text with advanced readability scoring.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Words Per Page Calculator',
      description: 'Calculate how many pages your word count translates to with custom formatting.',
      href: '/words-per-page',
      type: 'tool',
      category: 'Writing Tools'
    },
    {
      title: 'Character Counter',
      description: 'Count characters with and without spaces for social media and content writing.',
      href: '/character-counter',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Word Frequency Counter',
      description: 'Analyze word frequency and keyword density for SEO optimization.',
      href: '/word-frequency-counter',
      type: 'tool',
      category: 'SEO Tools'
    }
  ],
  'words-per-page': [
    {
      title: 'Word Counter',
      description: 'Analyze your text with real-time word count, character count, and readability scores.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Random Word Generator',
      description: 'Generate random words for writing prompts and creative inspiration.',
      href: '/random-word-generator',
      type: 'tool',
      category: 'Writing Tools'
    },
    {
      title: 'Character Counter',
      description: 'Count characters precisely for essays, articles, and social media posts.',
      href: '/character-counter',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Text Case Converter',
      description: 'Convert text between different case formats for professional documents.',
      href: '/text-case-converter',
      type: 'tool',
      category: 'Text Formatting'
    }
  ],
  'character-counter': [
    {
      title: 'Writing Mistakes That Kill Your Content',
      description: 'Avoid common writing mistakes and optimize character usage for better impact.',
      href: '/blog/writing-mistakes-kill-content',
      type: 'blog',
      category: 'Writing Tips'
    },
    {
      title: 'Content Planning: How to Create a Winning Strategy',
      description: 'Plan your content with optimal character counts for different platforms.',
      href: '/blog/content-planning-winning-strategy',
      type: 'blog',
      category: 'Content Strategy'
    },
    {
      title: 'Word Counter',
      description: 'Advanced word counting with readability scores and text analysis.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    }
  ],
  'text-case-converter': [
    {
      title: 'Essential Grammar Rules Every Writer Should Know',
      description: 'Master grammar and text formatting for professional writing.',
      href: '/blog/essential-grammar-rules-writers',
      type: 'blog',
      category: 'Grammar'
    },
    {
      title: 'Academic Writing: A Complete Guide for Students',
      description: 'Learn proper text formatting and case conventions for academic work.',
      href: '/blog/academic-writing-complete-guide',
      type: 'blog',
      category: 'Academic Writing'
    },
    {
      title: 'Word Counter',
      description: 'Analyze your formatted text with comprehensive word count statistics.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    }
  ]
};

// Blog post related content mapping
export const BLOG_RELATED_CONTENT: Record<string, RelatedItem[]> = {
  'improve-writing-readability-score': [
    {
      title: 'Word Counter',
      description: 'Check your readability score in real-time with our advanced text analysis tool.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'SEO Content Writing: The Ultimate Guide',
      description: 'Combine readability optimization with SEO best practices.',
      href: '/blog/seo-content-writing-ultimate-guide',
      type: 'blog',
      category: 'SEO'
    }
  ],
  'seo-content-writing-ultimate-guide': [
    {
      title: 'Word Counter',
      description: 'Monitor keyword density and optimize content length for SEO.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Keyword Density: How to Optimize Without Overstuffing',
      description: 'Master keyword optimization with data-driven analysis.',
      href: '/blog/keyword-density-optimize-without-overstuffing',
      type: 'blog',
      category: 'SEO'
    }
  ],
  'writing-mistakes-kill-content': [
    {
      title: 'Word Counter',
      description: 'Analyze and fix common writing mistakes with real-time feedback.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Essential Grammar Rules Every Writer Should Know',
      description: 'Avoid grammar mistakes that damage your credibility.',
      href: '/blog/essential-grammar-rules-writers',
      type: 'blog',
      category: 'Grammar'
    }
  ],
  'content-planning-winning-strategy': [
    {
      title: 'Word Counter',
      description: 'Plan content with optimal word counts and readability scores.',
      href: '/',
      type: 'tool',
      category: 'Text Analysis'
    },
    {
      title: 'Character Counter',
      description: 'Optimize content for social media character limits.',
      href: '/character-counter',
      type: 'tool',
      category: 'Text Analysis'
    }
  ]
};