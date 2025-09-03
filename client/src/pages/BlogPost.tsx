import { useRoute } from 'wouter';
import { blogPosts, type BlogPost } from './Blog';
import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  
  const post = blogPosts.find((p: BlogPost) => p.slug === slug);
  
  if (!post) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <span className="text-primary hover:text-primary/80 font-medium">
              ← Back to Blog
            </span>
          </Link>
        </div>
      </main>
    );
  }

  useSEO({
    title: `${post.title} | Word Counter Plus Blog`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, writing tips, content creation, word counter, text analysis`,
    canonical: `https://wordcounterplus.com/blog/${post.slug}`,
    ogType: "article"
  });

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `https://wordcounterplus.com/blog/${post.slug}`,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": "Word Counter Plus",
      "url": "https://wordcounterplus.com"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Word Counter Plus",
      "url": "https://wordcounterplus.com"
    },
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(' ').length,
    "timeRequired": post.readTime
  };

  // Convert markdown-style content to HTML-like JSX
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
        elements.push(<br key={key++} />);
        continue;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={key++} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-2xl font-bold text-foreground mt-6 mb-3">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-xl font-semibold text-foreground mt-4 mb-2">
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // Handle list items
        const listItems = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('- ')) {
          listItems.push(
            <li key={key++} className="mb-2">
              {lines[j].trim().substring(2)}
            </li>
          );
          j++;
        }
        elements.push(
          <ul key={key++} className="list-disc ml-6 mb-4 text-muted-foreground">
            {listItems}
          </ul>
        );
        i = j - 1;
      } else if (line.match(/^\d+\. /)) {
        // Handle numbered lists
        const listItems = [];
        let j = i;
        while (j < lines.length && lines[j].trim().match(/^\d+\. /)) {
          listItems.push(
            <li key={key++} className="mb-2">
              {lines[j].trim().replace(/^\d+\. /, '')}
            </li>
          );
          j++;
        }
        elements.push(
          <ol key={key++} className="list-decimal ml-6 mb-4 text-muted-foreground">
            {listItems}
          </ol>
        );
        i = j - 1;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={key++} className="font-semibold text-foreground mb-4">
            {line.substring(2, line.length - 2)}
          </p>
        );
      } else {
        // Regular paragraph
        const processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        elements.push(
          <p 
            key={key++} 
            className="text-muted-foreground mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    }

    return elements;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link href="/blog">
            <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <i className="fas fa-arrow-left mr-2" aria-label="Left arrow Icon"></i>
              Back to Blog
            </span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <i className="fas fa-calendar mr-2" aria-label="Calendar Icon"></i>
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <i className="fas fa-calendar mr-2" aria-label="Calendar Icon"></i>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed">
            {post.excerpt}
          </div>
          
          <div className="border-l-4 border-primary/20 pl-6 mb-8">
            <div className="content-body">
              {renderContent(post.content)}
            </div>
          </div>
        </article>

        {/* Related Posts CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
            Want to Analyze Your Own Writing?
          </h2>
          <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
            Use Word Counter Plus to check your content's readability, keyword density, and overall quality. 
            Get instant feedback to improve your writing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <span className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold">
            <i className="fas fa-calendar mr-2" aria-label="Calendar Icon"></i>
                Try Word Counter Plus
              </span>
            </Link>
            <Link href="/blog">
              <span className="inline-flex items-center border border-border px-6 py-3 rounded-lg hover:bg-muted/50 transition-colors font-semibold">
                <i className="fas fa-book mr-2" aria-label="Book Icon"></i>
                Read More Articles
              </span>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/blog">
            <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <i className="fas fa-arrow-left mr-2" aria-label="left arrow Icon"></i>
              All Blog Posts
            </span>
          </Link>
          
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  });
                }
              }}
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <i className="fas fa-share mr-2" aria-label="Share Icon"></i>
              Share
            </button>
          </div>
        </nav>
      </div>

      {/* JSON-LD Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </main>
  );
}