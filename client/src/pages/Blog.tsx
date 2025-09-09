import useSEO from '@/hooks/useSEO';
import { Link } from 'wouter';
import { FaPlay, FaCalendar, FaClock, FaArrowRight } from "@/components/common/Icons";
import { blogPosts, BlogPost } from '@/data/blogData';

export type { BlogPost };

export default function Blog() {
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden"
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
                    {post.tags.map((tag: string) => (
                      <span 
                        key={tag}
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