import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';
import { FaPlay, FaCalendar, FaClock, FaArrowRight, FaArrowLeft } from "@/components/common/Icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts, BlogPost } from '@/data/blogData';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export type { BlogPost };

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const { currentPosts, totalPages, startIndex, endIndex } = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const endIdx = startIdx + POSTS_PER_PAGE;
    const current = blogPosts.slice(startIdx, endIdx);
    const total = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    
    return {
      currentPosts: current,
      totalPages: total,
      startIndex: startIdx + 1,
      endIndex: Math.min(endIdx, blogPosts.length)
    };
  }, [currentPage]);

  useSEO({
    title: "Blog - Writing Tips & Text Analysis Guides | Word Counter Plus",
    description: "Discover expert writing tips, text analysis guides, and content creation strategies. Learn how to improve your writing with our comprehensive blog articles and tutorials.",
    keywords: "writing tips, text analysis, content creation, SEO writing, blog posts, writing guides, readability tips, keyword optimization, content strategy, writing tutorials",
    canonical: "https://wordcounterplusapp.com/blog",
    ogType: 'article',
  });

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Word Counter Plus Blog",
    "description": "Expert writing tips, text analysis guides, and content creation strategies",
    "url": "https://wordcounterplusapp.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Word Counter Plus",
      "url": "https://wordcounterplusapp.com"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://wordcounterplusapp.com/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Organization",
        "name": "Word Counter Plus"
      },
      "keywords": post.tags.join(", ")
    }))
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Writing Tips & Content Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover expert writing tips, SEO strategies, and content creation guides to improve your writing skills. 
            Learn how to create engaging, readable content that ranks well in search engines.
          </p>
        </div>

        {/* Blog Posts Stats */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing {startIndex}-{endIndex} of {blogPosts.length} articles
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentPosts.map((post, index) => (
            <article 
              key={`${post.id}-${index}`}
              className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden"
              data-testid={`blog-post-${post.id}`}
            >
              {/* Featured Image */}
              {post.image && (
                <div className="aspect-video">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag: string, tagIndex: number) => (
                      <span 
                        key={`${tag}-${tagIndex}`}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span>{post.title}</span>
                    </Link>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FaCalendar className="mr-2" aria-label="Calendar Icon" />
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}</span>
                    <span className="mx-2">•</span>
                    <FaClock className="mr-2" aria-label="Clock Icon" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                      Read More
                      <FaArrowRight className="ml-2" aria-label="Right Arrow Icon" />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Responsive Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12">
            {/* Mobile Pagination */}
            <div className="flex sm:hidden items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
                data-testid="button-prev-page-mobile"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
                data-testid="button-next-page-mobile"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center justify-center gap-4">
              {/* Previous Button */}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {/* Smart Page Numbers */}
              <div className="flex items-center gap-1">
                {(() => {
                  const getPageNumbers = () => {
                    const delta = 2; // Number of pages to show on each side of current page
                    const range = [];
                    const rangeWithDots = [];

                    // Always show first page
                    range.push(1);

                    // Calculate start and end of middle range
                    const start = Math.max(2, currentPage - delta);
                    const end = Math.min(totalPages - 1, currentPage + delta);

                    // Add dots after first page if needed
                    if (start > 2) {
                      rangeWithDots.push(1);
                      rangeWithDots.push('...');
                    } else {
                      rangeWithDots.push(1);
                    }

                    // Add middle range
                    for (let i = start; i <= end; i++) {
                      if (i !== 1 && i !== totalPages) {
                        rangeWithDots.push(i);
                      }
                    }

                    // Add dots before last page if needed
                    if (end < totalPages - 1) {
                      rangeWithDots.push('...');
                      rangeWithDots.push(totalPages);
                    } else if (totalPages > 1) {
                      rangeWithDots.push(totalPages);
                    }

                    // Remove duplicates and clean up
                    return Array.from(new Set(rangeWithDots));
                  };

                  return getPageNumbers().map((page, index) => {
                    if (page === '...') {
                      return (
                        <span key={`dots-${index}`} className="px-2 text-muted-foreground">
                          ...
                        </span>
                      );
                    }

                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page as number)}
                        className="w-10 h-10"
                        data-testid={`button-page-${page}`}
                      >
                        {page}
                      </Button>
                    );
                  });
                })()}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Improve Your Writing?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Put these tips into practice with our advanced word counter and text analysis tool. 
            Get real-time feedback on readability, keyword density, and content quality.
          </p>
          <Link href="/">
            <span className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors font-semibold">
              <FaPlay className="mr-2" aria-label="Play Icon" />
              Try Word Counter Plus
            </span>
          </Link>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </main>
  );
}