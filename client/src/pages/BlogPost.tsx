import { useRoute } from 'wouter';
import { blogPosts, type BlogPost, getRelatedPosts } from '@/data/blogData';
import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';
import { getRelatedTool } from '@/lib/tool-blog-mapping';
import OptimizedImage from '@/components/ui/optimized-image';
import { getCurrentOrigin } from '@/lib/site';
import {
  FaArrowLeft,
  FaBook,
  FaCalendar,
  FaCog
} from 'react-icons/fa';

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug;

  // Get the "from" parameter to know which page to return to
  const getReturnPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const from = urlParams.get('from');
    if (from && from.startsWith('page-')) {
      const pageNum = from.replace('page-', '');
      return pageNum === '1' ? '/blog' : `/blog?page=${pageNum}`;
    }
    return '/blog';
  };

  const returnUrl = getReturnPage();
  const post = blogPosts.find((p: BlogPost) => p.slug === slug);

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href={returnUrl}>
            <span className="text-primary hover:text-primary/80 font-medium">
              ← Back to Blog
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const baseUrl = getCurrentOrigin();

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    image: post.image ? `${baseUrl}${post.image}` : `${baseUrl}/og-image.png`,
    author: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/word-counter-plus-logo.png`
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/word-counter-plus-logo.png`
      }
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(' ').length,
    timeRequired: post.readTime.replace(/(\d+)\s*min\s*read/, 'PT$1M'),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog/${post.slug}`
      }
    ]
  };

  const fullImageUrl = post.image 
    ? `${baseUrl}${post.image}` 
    : `${baseUrl}/og-image.png`;

  useSEO({
    title: `${post.title} | Word Counter Plus Blog`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, writing tips, content creation, word counter, text analysis`,
    canonical: `${baseUrl}/blog/${post.slug}`,
    ogType: 'article',
    ogImage: fullImageUrl,
    twitterCard: 'summary_large_image',
    author: 'Word Counter Plus Team',
    siteName: 'Word Counter Plus',
    structuredData: jsonLdSchema
  });

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
          const itemText = lines[j].trim().substring(2)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          listItems.push(
            <li key={key++} className="mb-2" dangerouslySetInnerHTML={{ __html: itemText }} />
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
          const itemText = lines[j].trim().replace(/^\d+\. /, '')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          listItems.push(
            <li key={key++} className="mb-2" dangerouslySetInnerHTML={{ __html: itemText }} />
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
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">$1</a>')
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
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-muted-foreground">
            <li>
              <Link href="/">
                <span className="hover:text-primary transition-colors">Home</span>
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link href="/blog">
                <span className="hover:text-primary transition-colors">Blog</span>
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Back to Blog */}
        <div className="mb-8">
          <Link href={returnUrl}>
            <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <FaArrowLeft className="mr-2" aria-label="Left arrow Icon" />
              Back to Blog
            </span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
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
            <FaCalendar className="mr-2" aria-label="Calendar Icon" />
            <span>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="mx-2">•</span>
            <FaCalendar className="mr-2" aria-label="Calendar Icon" />
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed">
            {post.excerpt}
          </div>

          <div className="border-l-4 border-primary/20 pl-6 mb-8">
            <div className="content-body">{renderContent(post.content)}</div>
          </div>
        </article>


        {/* Related Posts */}
        {(() => {
          const relatedPosts = getRelatedPosts(post.slug, 3);
          return relatedPosts.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-card rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
                    {relatedPost.image && (
                      <div className="aspect-video mb-3">
                        <OptimizedImage
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover rounded"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {relatedPost.tags.slice(0, 2).map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <span>{relatedPost.title}</span>
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* CTA Section */}
        {(() => {
          const relatedTool = getRelatedTool(post.title, post.content, post.tags);
          
          return (
            <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
              {relatedTool ? (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                    Ready to Put This Into Practice?
                  </h2>
                  <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Use our {relatedTool.title} to apply what you've learned from this article. 
                    Get instant results and improve your content quality.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {relatedTool.isExternal ? (
                      <a 
                        href={relatedTool.href}
                        className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold"
                        data-testid={`button-use-tool-${relatedTool.id}`}
                      >
                        <FaCog className="mr-2" aria-label="Tool Icon" />
                        Use {relatedTool.title}
                      </a>
                    ) : (
                      <Link href={relatedTool.href}>
                        <span 
                          className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold"
                          data-testid={`button-use-tool-${relatedTool.id}`}
                        >
                          <FaCog className="mr-2" aria-label="Tool Icon" />
                          Use {relatedTool.title}
                        </span>
                      </Link>
                    )}
                    <Link href="/tools">
                      <span className="inline-flex items-center border border-border px-6 py-3 rounded-lg hover:bg-muted/50 transition-colors font-semibold">
                        <FaCalendar className="mr-2" aria-label="Calendar Icon" />
                        All Tools
                      </span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                    Want to Analyze Your Own Writing?
                  </h2>
                  <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                    Use Word Counter Plus to check your content's readability, keyword density, and overall
                    quality. Get instant feedback to improve your writing.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <span className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold">
                        <FaCalendar className="mr-2" aria-label="Calendar Icon" />
                        Try Word Counter Plus
                      </span>
                    </Link>
                    <Link href={returnUrl}>
                      <span className="inline-flex items-center border border-border px-6 py-3 rounded-lg hover:bg-muted/50 transition-colors font-semibold">
                        <FaBook className="mr-2" aria-label="Book Icon" />
                        Read More Articles
                      </span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* Navigation */}
        <nav className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href={returnUrl}>
            <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <FaArrowLeft className="mr-2" aria-label="Left arrow Icon" />
              All Blog Posts
            </span>
          </Link>

        </nav>
      </div>


      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
