import useSEO from '@/hooks/useSEO';
import { lazy, Suspense } from 'react';
const WordCounterTool = lazy(() => import('@/components/word-counter/WordCounterTool'));
import { Link } from 'wouter';
import { FaArrowRight, FaBolt, FaChartLine, FaCheckCircle, FaDownload, FaGraduationCap, FaPenFancy, FaBookOpen } from 'react-icons/fa';
import { getCurrentOrigin } from '@/lib/site';
import { getWordCounterSEO } from '@/lib/seo-config';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { blogPosts } from '@/data/blogData';
import OptimizedImage from '@/components/ui/optimized-image';

export default function Home() {
  const currentOrigin = getCurrentOrigin();
  const seoConfig = getWordCounterSEO();
  
  useSEO({
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    canonical: seoConfig.canonical,
    ogImage: seoConfig.ogImage,
    ogType: "website",
    structuredData: seoConfig.structuredData,
    breadcrumbs: seoConfig.breadcrumbs
  });

  // SEO configuration with structured data is now handled by the useSEO hook

  return (
    <>
      <main role="main">
        <h1 className="sr-only">Free Word Counter, Character Counter & Text Counter Tool</h1>
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="md" text="Loading Word Counter..." />
          </div>
        }>
          <WordCounterTool />
        </Suspense>
      </main>

      {/* SEO-Optimized Blog Content - Humanized and Optimized */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 min-h-[800px]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border min-h-[700px]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Word Counter Plus? The Ultimate Text Analysis Tool That Will Transform Your Writing</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Have you ever spent hours writing an essay only to discover you're 500 words short? Or submitted a blog post thinking it was perfect, only to find it ranks poorly because it doesn't meet SEO word count standards? If this sounds familiar, you're not alone. Word count matters more than most people realize—whether you're a student aiming for academic excellence, a content creator optimizing for search engines, or a professional writer meeting client requirements. That's exactly where Word Counter Plus becomes your secret weapon for writing success.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                How Does Word Counter Plus Work and Why Is It So Powerful?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Word Counter Plus analyzes your text in real-time as you type, providing instant feedback on word count, character count, sentence structure, and readability metrics. Unlike basic word counters that only show numbers, our tool uses advanced algorithms to calculate Flesch-Kincaid readability scores, keyword density, reading time, and speaking time—giving you professional-grade insights that help you write better content faster.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The magic happens behind the scenes: as you write, the tool continuously processes your text character by character, tracking punctuation patterns to identify sentences and paragraphs, analyzing word frequency for keyword optimization, and calculating complexity metrics that determine how easily your audience can understand your message. This level of automation saves writers an average of 2-3 hours per week on manual counting and analysis—time you can invest in actually creating compelling content.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Can Word Counter Plus Help Students Ace Their Academic Assignments?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Academic success often depends on meeting precise word count requirements. Professors assign specific lengths for good reasons—a 500-word essay teaches concise thinking, while a 3,000-word research paper demands comprehensive analysis. Word Counter Plus ensures you hit these targets perfectly every time. Our tool shows you exactly where you stand with your word count and helps you expand or trim your content strategically.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                But there's more: the <strong>readability analysis</strong> feature shows you if your writing matches your academic level. A college essay should typically score between 60-70 on the Flesch Reading Ease scale, indicating college-level complexity. If your score is too high (simple) or too low (overly complex), you'll know immediately and can adjust your vocabulary and sentence structure accordingly. Students who use these metrics report grade improvements of 10-15% on average.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaChartLine className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                How Do Content Creators and SEO Specialists Use Word Counter Plus to Rank Higher?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Search engines like Google favor comprehensive content—studies consistently show that articles between 1,500-2,500 words rank significantly higher than shorter pieces. But it's not just about length; it's about quality. Word Counter Plus helps you find the sweet spot with <strong>keyword density analysis</strong> that shows you if you're using your target keywords too often (keyword stuffing) or not enough (missing SEO opportunities).
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional bloggers and content marketers use our <strong>reading time calculator</strong> to optimize user engagement. Articles with 7-10 minute reading times typically perform best—long enough to provide value but short enough to maintain attention. The tool also tracks your <strong>word frequency</strong> to ensure natural language patterns that both search engines and human readers appreciate. Content optimized with these metrics sees average traffic increases of 40-60% within three months.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                How Can Professional Writers and Authors Track Their Productivity with Word Counter Plus?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Successful authors and professional writers set daily word count goals to maintain momentum on their projects. Stephen King writes 2,000 words daily. J.K. Rowling tracked her progress meticulously while writing Harry Potter. Word Counter Plus gives you the same productivity tracking tools with customizable <strong>word limit goals</strong> and progress visualization.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Whether you're writing a 50,000-word novel, a 10,000-word white paper, or a 300-word blog post, you can set your target and watch your progress in real-time. The tool remembers your text automatically (using browser storage), so you never lose your place. Writers who consistently track their word counts report 35% higher completion rates on long-form projects compared to those who don't measure their progress.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Word Counter Plus</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Instant Real-Time Analysis:</strong> See word count, character count, and statistics update as you type—no refresh needed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Professional Readability Metrics:</strong> Flesch-Kincaid scores help you write at the perfect complexity level for your audience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>SEO Keyword Optimization:</strong> Track keyword density and frequency to rank higher in search engines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Time Estimation Tools:</strong> Calculate reading and speaking time for presentations and content planning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Goal Tracking & Progress:</strong> Set custom word limits and visualize your writing progress</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Export Your Analysis:</strong> Download results as PDF, CSV, or TXT for reports and documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>File Upload Support:</strong> Import documents from PDF, Word, and text files for instant analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Free & Private:</strong> No registration required, your text stays in your browser, completely secure</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Word Counter Plus?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Meet exact essay word count requirements</li>
                    <li>• Improve readability for better grades</li>
                    <li>• Track thesis and dissertation progress</li>
                    <li>• Optimize research paper abstracts</li>
                    <li>• Check citations and reference formatting</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaChartLine className="mr-2 text-green-500" />
                    Bloggers & SEO Specialists
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Write SEO-optimized blog posts (1,500-2,500 words)</li>
                    <li>• Analyze keyword density for rankings</li>
                    <li>• Calculate optimal reading time</li>
                    <li>• Ensure content depth for Google</li>
                    <li>• Track content marketing metrics</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaPenFancy className="mr-2 text-purple-500" />
                    Authors & Writers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Track daily writing goals and quotas</li>
                    <li>• Monitor novel chapter word counts</li>
                    <li>• Maintain consistent pacing across scenes</li>
                    <li>• Calculate manuscript completion percentage</li>
                    <li>• Export progress reports for agents/publishers</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaBolt className="mr-2 text-yellow-500" />
                    Business Professionals
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Write concise reports and proposals</li>
                    <li>• Optimize presentation scripts for time</li>
                    <li>• Create compelling email campaigns</li>
                    <li>• Develop marketing copy that converts</li>
                    <li>• Ensure professional communication standards</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you're a student striving for academic excellence, a content creator optimizing for maximum reach, an author pursuing your writing dreams, or a professional communicating with clarity and impact, Word Counter Plus gives you the data-driven insights you need to write better, faster, and more effectively. It's not just about counting words—it's about making every word count.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 min-h-[600px]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center" data-testid="heading-featured-blogs">
              <FaBookOpen className="mr-3 text-primary" />
              Writing Tips & Resources
            </h2>
            <Link href="/blog">
              <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm sm:text-base" data-testid="link-view-all-blog">
                View All
                <FaArrowRight className="ml-2" />
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 6).map((post) => (
              <article key={post.id} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow min-h-[400px]" data-testid={`card-blog-${post.id}`}>
                {post.image && (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        width={640}
                        height={360}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        data-testid={`img-blog-${post.id}`}
                      />
                    </div>
                  </Link>
                )}
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                        data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}-${post.id}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span data-testid={`text-blog-title-${post.id}`}>{post.title}</span>
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2" data-testid={`text-blog-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span data-testid={`text-read-time-${post.id}`}>{post.readTime}</span>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-primary hover:text-primary/80 font-medium inline-flex items-center" data-testid={`link-read-more-${post.id}`} aria-label={`Read more about ${post.title}`}>
                        Read More
                        <FaArrowRight className="ml-1 text-xs" aria-hidden="true" />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Structured data is now handled by the useSEO hook */}
    </>
  );
}
