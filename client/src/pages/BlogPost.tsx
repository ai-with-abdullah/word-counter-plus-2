import { useRoute } from 'wouter';
import { blogPosts, type BlogPost, getRelatedPosts } from '@/data/blogData';
import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';
import {
  FaArrowLeft,
  FaBook,
  FaCalendar,
  FaShare,
  FaWhatsapp,
  FaFacebook,
  FaReddit,
  FaEnvelope,
  FaLink,
  FaLinkedin
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // ✅ X (Twitter) icon
import { useState } from 'react';

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  const [showShareModal, setShowShareModal] = useState(false);

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

  useSEO({
    title: `${post.title} | Word Counter Plus Blog`,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, writing tips, content creation, word counter, text analysis`,
    canonical: `https://wordcounterplusapp.com/blog/${post.slug}`,
    ogType: 'article',
    ogImage: post.image || '/og-image.png',
    twitterCard: 'summary_large_image',
    author: 'Word Counter Plus Team',
    siteName: 'Word Counter Plus'
  });

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://wordcounterplusapp.com/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    image: post.image ? `https://wordcounterplusapp.com${post.image}` : 'https://wordcounterplusapp.com/og-image.png',
    author: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: 'https://wordcounterplusapp.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wordcounterplusapp.com/word-counter-plus-logo.png'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Word Counter Plus',
      url: 'https://wordcounterplusapp.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://wordcounterplusapp.com/word-counter-plus-logo.png'
      }
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.split(' ').length,
    timeRequired: post.readTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wordcounterplusapp.com/blog/${post.slug}`
    }
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
            <img
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
                        <img
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
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
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
        </div>

        {/* Navigation */}
        <nav className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href={returnUrl}>
            <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
              <FaArrowLeft className="mr-2" aria-label="Left arrow Icon" />
              All Blog Posts
            </span>
          </Link>

          <div className="flex gap-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <FaShare className="mr-2" aria-label="Share Icon" />
              Share
            </button>
          </div>
        </nav>
      </div>

      {/* Enhanced Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl p-6 w-full max-w-md border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Share this article</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                ✕
              </button>
            </div>

            {/* Post Preview */}
            <div className="mb-6 p-3 bg-muted/50 rounded-lg border border-border">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-20 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-semibold text-foreground text-sm mb-1">{post.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img 
                    src="/word-counter-plus-logo.png" 
                    alt="Word Counter Plus" 
                    className="w-4 h-4 rounded-sm"
                  />
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                    Word Counter Plus
                  </span>
                </div>
                <span className="text-xs">{post.readTime}</span>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFacebook size={20} />
                <span className="font-medium">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${post.title}\n\n${post.excerpt.substring(0, 120)}...\n\n🔗 Read more:`
                )}&url=${encodeURIComponent(window.location.href)}&via=wordcounterplusapp`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FaXTwitter size={20} />
                <span className="font-medium">Twitter</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <FaLinkedin size={20} />
                <span className="font-medium">LinkedIn</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`📚 *${post.title}*\n\n${post.excerpt}\n\n🔗 Read the full article:\n${window.location.href}\n\n✨ Shared from Word Counter Plus`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp size={20} />
                <span className="font-medium">WhatsApp</span>
              </a>

              <a
                href={`https://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FaReddit size={20} />
                <span className="font-medium">Reddit</span>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `📚 ${post.title} | Word Counter Plus`
                )}&body=${encodeURIComponent(
                  `Hi there!\n\nI thought you might find this article interesting:\n\n` +
                  `"${post.title}"\n\n` +
                  `${post.excerpt}\n\n` +
                  `📖 Read the full article here:\n${window.location.href}\n\n` +
                  `—\n` +
                  `This article was shared from Word Counter Plus, the comprehensive text analysis and writing tool.\n` +
                  `Visit: https://wordcounterplusapp.com\n\n` +
                  `Best regards!`
                )}`}
                className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaEnvelope size={20} />
                <span className="font-medium">Email</span>
              </a>
            </div>

            {/* Copy Link */}
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="w-full flex items-center justify-center gap-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-foreground"
              >
                <FaLink />
                <span className="font-medium">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </main>
  );
}
