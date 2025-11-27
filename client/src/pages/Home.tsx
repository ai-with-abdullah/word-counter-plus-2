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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Word Counter Plus: The Complete Free Online Word Counter & Text Analysis Platform</h2>
            
            <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Looking for a reliable <strong>free word counter</strong> that does more than just count words? Word Counter Plus is the ultimate <strong>online word counter</strong> and text analysis platform trusted by over 500,000 writers, students, bloggers, and professionals worldwide. Whether you need to count words for an essay, check your <strong>character counter</strong> limits for social media, convert <Link href="/words-per-page" className="text-primary hover:underline">words to pages</Link>, use <Link href="/speech-to-text" className="text-primary hover:underline">speech to text</Link> for faster writing, or <Link href="/text-compare" className="text-primary hover:underline">compare two texts</Link> for differences—we've built every <strong>word count tool</strong> you'll ever need, completely free.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaBolt className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
                What Makes Word Counter Plus the Best Free Word Counter Online?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Unlike basic word counters that only display numbers, Word Counter Plus provides <strong>real-time text analysis</strong> with professional-grade metrics. As you type, our advanced algorithms instantly calculate word count, <Link href="/character-counter" className="text-primary hover:underline">character count</Link> (with and without spaces), sentence count, paragraph count, reading time, speaking time, and readability scores. This makes it the most comprehensive <strong>free word counter</strong> available online—no registration, no ads, no limitations.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Our platform goes beyond simple counting. Need to check your <strong>meta description character count</strong> for SEO? We've got you covered. Want to generate ideas with our <Link href="/random-word-generator" className="text-primary hover:underline">random word generator</Link>? It's built right in. From the <strong>character counter tool</strong> for Twitter's 280-character limit to the <Link href="/words-per-page" className="text-primary hover:underline">words per page estimator</Link> for academic papers, Word Counter Plus is your all-in-one writing companion. Writers report saving 2-3 hours weekly using our automated analysis features.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaCheckCircle className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                How Students Use Our Word Count Tool for Academic Excellence
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Academic success depends on meeting precise requirements. A 500-word essay demands concise thinking, while a 3,000-word research paper requires comprehensive analysis. Our <strong>word counter plus</strong> tool ensures you hit these targets perfectly. But we don't stop at counting—our readability analysis shows if your writing matches your academic level (college essays should score 60-70 on the Flesch Reading Ease scale). Students using these metrics report 10-15% grade improvements on average.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Need to convert your word count to pages? Our <Link href="/words-per-page" className="text-primary hover:underline">words to pages</Link> calculator instantly shows how many pages your essay will be with customizable font, spacing, and margin settings. Writing a thesis or dissertation? Track your progress chapter by chapter. The <strong>online word counter</strong> remembers your text automatically, so you never lose your work mid-session.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaChartLine className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
                SEO Content Optimization: Keyword Density & Meta Description Character Counter
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Content creators and SEO specialists rely on Word Counter Plus for competitive rankings. Google favors comprehensive content—articles between 1,500-2,500 words consistently outrank shorter pieces. Our <strong>word count tool</strong> includes keyword density analysis to help you avoid keyword stuffing while maximizing SEO impact. The <strong>meta description character count</strong> feature ensures your snippets stay within Google's 155-160 character limit for optimal click-through rates.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Professional bloggers use our reading time calculator (articles with 7-10 minute read times perform best) and word frequency analysis for natural language patterns. Combined with our <Link href="/seo-content-analyzer" className="text-primary hover:underline">SEO Content Analyzer</Link>, you'll have everything needed to create content that ranks. Users report 40-60% traffic increases within three months of optimizing with these metrics.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
                <FaPenFancy className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                Speech to Text & Text Compare: Advanced Writing Tools
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Word Counter Plus includes powerful tools beyond basic counting. Our <Link href="/speech-to-text" className="text-primary hover:underline">speech to text</Link> feature lets you dictate content hands-free—perfect for authors, journalists, and anyone who thinks faster than they type. The <Link href="/text-compare" className="text-primary hover:underline">text compare tool</Link> highlights differences between two documents instantly, ideal for editors, lawyers, and students checking revisions.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Need creative inspiration? Our <Link href="/random-word-generator" className="text-primary hover:underline">random word generator</Link> helps writers break through blocks with customizable word lists. For authors tracking daily goals (Stephen King writes 2,000 words daily!), set custom word limits and watch progress in real-time. Writers who consistently track word counts report 35% higher project completion rates.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Complete Feature List: Everything Included Free</h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Real-Time Word Counter:</strong> Instant word, character, sentence, and paragraph counting as you type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Character Counter Tool:</strong> Count characters with/without spaces for social media limits (Twitter, Instagram, LinkedIn)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Words to Pages Calculator:</strong> <Link href="/words-per-page" className="text-primary hover:underline">Convert word count to page count</Link> with custom formatting options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Speech to Text:</strong> <Link href="/speech-to-text" className="text-primary hover:underline">Dictate content hands-free</Link> with accurate transcription</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Text Compare Tool:</strong> <Link href="/text-compare" className="text-primary hover:underline">Find differences between two texts</Link> instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Meta Description Counter:</strong> Optimize SEO snippets within Google's character limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Random Word Generator:</strong> <Link href="/random-word-generator" className="text-primary hover:underline">Generate creative prompts</Link> for writing inspiration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>Readability Analysis:</strong> Flesch-Kincaid scores, reading time, and speaking time estimates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>File Upload & Export:</strong> Import PDF, Word, TXT files and export analysis as PDF, CSV, or TXT</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary flex-shrink-0">✓</span>
                    <span><strong>100% Free & Private:</strong> No registration, no ads, no data collection—your text stays in your browser</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Who Uses Word Counter Plus? Real-World Applications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-500" />
                    Students & Academics
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Meet exact essay word count requirements</li>
                    <li>• Use <Link href="/words-per-page" className="text-primary hover:underline">words to pages</Link> for paper planning</li>
                    <li>• Track thesis and dissertation progress</li>
                    <li>• Improve readability for better grades</li>
                    <li>• Check abstract character limits</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaChartLine className="mr-2 text-green-500" />
                    Bloggers & SEO Specialists
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Optimize SEO content (1,500-2,500 words)</li>
                    <li>• Check meta description character count</li>
                    <li>• Analyze keyword density for rankings</li>
                    <li>• Calculate optimal reading time</li>
                    <li>• <Link href="/text-compare" className="text-primary hover:underline">Compare content versions</Link></li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaPenFancy className="mr-2 text-purple-500" />
                    Authors & Writers
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Track daily writing goals and quotas</li>
                    <li>• Use <Link href="/speech-to-text" className="text-primary hover:underline">speech to text</Link> for faster drafts</li>
                    <li>• Monitor chapter word counts</li>
                    <li>• <Link href="/random-word-generator" className="text-primary hover:underline">Generate writing prompts</Link></li>
                    <li>• Export progress for publishers</li>
                  </ul>
                </div>
                <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                    <FaBolt className="mr-2 text-yellow-500" />
                    Business & Marketing
                  </h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Write concise reports and proposals</li>
                    <li>• Check character counter for social posts</li>
                    <li>• Optimize email subject lines</li>
                    <li>• Create compelling ad copy</li>
                    <li>• Ensure brand voice consistency</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
                Whether you need a simple <strong>free word counter</strong>, a powerful <strong>character counter tool</strong>, a <Link href="/words-per-page" className="text-primary hover:underline">words to pages calculator</Link>, <Link href="/speech-to-text" className="text-primary hover:underline">speech to text</Link> transcription, or a <Link href="/text-compare" className="text-primary hover:underline">text compare tool</Link>—Word Counter Plus delivers everything in one platform. Join 500,000+ users who trust our <strong>online word counter</strong> for accurate, instant, and completely free text analysis. Start typing above and experience why we're the most comprehensive <strong>word count tool</strong> available online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparisons Section */}
      <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why Choose Word Counter Plus?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto">
              See how Word Counter Plus compares to popular alternatives. We offer all premium features completely free - no subscriptions, no ads, no limitations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold mb-1">100% Free Forever</h3>
              <p className="text-xs text-muted-foreground">All features included</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold mb-1">No Advertisements</h3>
              <p className="text-xs text-muted-foreground">Clean, distraction-free</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Privacy Focused</h3>
              <p className="text-xs text-muted-foreground">No data storage</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <FaCheckCircle className="text-green-500 text-2xl mx-auto mb-2" />
              <h3 className="font-semibold mb-1">All-in-One Platform</h3>
              <p className="text-xs text-muted-foreground">15+ tools included</p>
            </div>
          </div>
          <div className="text-center">
            <Link href="/comparisons">
              <span className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 font-medium transition-colors" data-testid="button-view-comparisons">
                Compare with Competitors
                <FaArrowRight className="ml-2" />
              </span>
            </Link>
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
