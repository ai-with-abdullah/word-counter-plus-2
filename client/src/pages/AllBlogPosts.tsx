import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';
import { blogPosts } from '@/data/blogData';
import { FaArrowRight, FaCalendar } from "@/components/common/Icons";

export default function AllBlogPosts() {
  useSEO({
    title: "All Blog Posts - Complete Archive | Word Counter Plus",
    description: "Browse our complete archive of blog posts covering writing tips, text analysis guides, SEO strategies, and content creation tutorials. Find all articles in one place.",
    keywords: "blog archive, all posts, writing tips, text analysis, SEO guides, content creation, word counter blog",
    canonical: "https://wordcounterplusapp.com/all-posts",
    ogType: 'website'
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="text-all-posts-title">
            All Blog Posts
          </h1>
          <p className="text-muted-foreground">
            Browse our complete archive of {blogPosts.length} articles on writing, text analysis, and content creation.
          </p>
        </header>

        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <article 
              key={`${post.slug}-${index}`}
              className="border-b border-border pb-4 last:border-b-0"
              data-testid={`article-${post.slug}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer" data-testid={`link-post-${index}`}>
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="text-xs" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <nav className="mt-8 flex justify-between items-center">
          <Link href="/blog">
            <span className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
              <FaArrowRight className="mr-2 rotate-180" />
              Back to Blog
            </span>
          </Link>
          <Link href="/">
            <span className="text-primary hover:text-primary/80 font-medium inline-flex items-center">
              Word Counter Tool
              <FaArrowRight className="ml-2" />
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
