import useSEO from '@/hooks/useSEO';
import { lazy, Suspense } from 'react';
const WordCounterTool = lazy(() => import('@/components/word-counter/WordCounterTool'));
import { Link } from 'wouter';
import { FaArrowRight, FaBolt, FaChartLine, FaCheckCircle, FaDownload, FaGraduationCap, FaPenFancy } from 'react-icons/fa';
import RelatedContent, { TOOL_RELATED_CONTENT } from '@/components/common/RelatedContent';
import { getCurrentOrigin } from '@/lib/site';
import { getWordCounterSEO } from '@/lib/seo-config';

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
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Loading Word Counter...</p>
            </div>
          </div>
        }>
          <WordCounterTool />
        </Suspense>
      </main>

      {/* SEO Content Section */}
      <section className="container mx-auto px-8 py-40">
        <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Word Counter Plus?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Word Counter Plus is the most comprehensive <strong>word counter and text analysis tool</strong> available online. 
                  Whether you're a writer, blogger, student, or content creator, our advanced features help you create better content.
                </p>
                <p>
                  Our tool provides real-time analysis including <strong>word count</strong>, <strong>character count</strong>, 
                  <strong>readability scores</strong>, and <strong>keyword density analysis</strong> – all completely free.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <FaBolt className="text-primary text-2xl mb-2" aria-label="Bolt Icon" />
                    <h3 className="font-semibold">Real-time Analysis</h3>
                    <p className="text-sm">Instant results as you type</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <FaDownload className="text-primary text-2xl mb-2" aria-label="Download Icon" />
                    <h3 className="font-semibold">Export Options</h3>
                    <p className="text-sm">PDF, CSV, TXT formats</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Advanced Word Counter:</strong> Count words, characters, sentences, and paragraphs with precision
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Text Case Converter:</strong> Convert text between 12 different case formats including camelCase, snake_case, and more
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Readability Analysis:</strong> Flesch-Kincaid readability scores and reading level assessment
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Keyword Density:</strong> Analyze keyword frequency for SEO optimization
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Export & Share:</strong> Download analysis as PDF, CSV, or TXT files
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Reading Time:</strong> Estimate reading and speaking time for your content
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-primary mr-3 mt-1" aria-label="Check Circle Icon" />
                  <div>
                    <strong>Goal Tracking:</strong> Set word limits and track your progress
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <Link href="/faq">
                  <span className="inline-flex items-center text-red-700 hover:text-red-600 font-medium">
                    Learn More About Our Features
                    <FaArrowRight className="ml-2" aria-hidden="true" />
                  </span>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      
      {/* Use Cases Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Perfect For Every Writer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white dark:bg-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FaPenFancy className="text-primary text-2xl" aria-label="Pen Icon" />
              </div>
              <h3 className="font-semibold mb-2">Content Creators</h3>
              <p className="text-sm text-muted-foreground">
                Optimize blog posts, articles, and social media content with precise word counts and readability analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FaGraduationCap className="text-primary text-2xl" aria-label="Graduation Cap Icon" />
              </div>
              <h3 className="font-semibold mb-2">Students</h3>
              <p className="text-sm text-muted-foreground">
                Meet essay requirements, track assignment progress, and improve academic writing with detailed analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <FaChartLine className="text-primary text-2xl" aria-label="Line Chart Icon" />
              </div>
              <h3 className="font-semibold mb-2">SEO Specialists</h3>
              <p className="text-sm text-muted-foreground">
                Analyze keyword density, optimize content length, and improve search engine rankings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Optimized Blog Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-6">Word Counter Mastery: The Ultimate Guide to Text Analysis and Writing Optimization</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Why Word Count Matters for Writers and Content Creators</h3>
                  <p className="text-muted-foreground mb-4">
                    Word counting is fundamental to effective writing and content creation. Whether you're crafting academic papers, blog posts, marketing copy, or social media content, understanding word count requirements and optimization techniques can significantly impact your success.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-3">Academic Writing Standards</h4>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li><strong>Essays:</strong> 500-5,000 words depending on academic level</li>
                    <li><strong>Research Papers:</strong> 3,000-12,000 words for comprehensive analysis</li>
                    <li><strong>Thesis Papers:</strong> 10,000-80,000 words for doctoral dissertations</li>
                    <li><strong>Journal Articles:</strong> 3,000-8,000 words for peer-reviewed publication</li>
                    <li><strong>Abstracts:</strong> 150-300 words for concise summaries</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground mb-3">Content Marketing Optimization</h4>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li><strong>Blog Posts:</strong> 1,500-2,500 words for SEO performance</li>
                    <li><strong>Landing Pages:</strong> 500-1,000 words for conversion optimization</li>
                    <li><strong>Product Descriptions:</strong> 150-300 words for e-commerce</li>
                    <li><strong>Email Newsletters:</strong> 200-500 words for engagement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Advanced Text Analysis Features</h3>
                  <p className="text-muted-foreground mb-4">
                    Our word counter provides comprehensive text analysis including readability scoring, keyword density analysis, reading time estimation, and writing quality metrics to help you create content that resonates with your audience.
                  </p>

                  <h4 className="text-lg font-semibold text-foreground mb-3">Professional Writing Applications</h4>
                  <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                    <li><strong>Journalism:</strong> Meet article length requirements for publications</li>
                    <li><strong>Technical Writing:</strong> Create concise, comprehensive documentation</li>
                    <li><strong>Creative Writing:</strong> Track progress on novels and short stories</li>
                    <li><strong>Business Communication:</strong> Optimize proposals and reports</li>
                    <li><strong>Grant Writing:</strong> Adhere to strict application guidelines</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-foreground mb-3">SEO and Readability Optimization</h4>
                  <p className="text-muted-foreground mb-4">
                    Monitor Flesch-Kincaid readability scores, average sentence length, and paragraph structure to ensure your content is accessible to your target audience while meeting search engine optimization requirements.
                  </p>

                  <h4 className="text-lg font-semibold text-foreground mb-3">Productivity Tracking</h4>
                  <p className="text-muted-foreground">
                    Set word count goals, track writing progress, and analyze your writing patterns to improve productivity and maintain consistent output for all your writing projects.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <h4 className="text-lg font-semibold text-foreground mb-3">Writing Efficiency Best Practices</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Goal Setting</h5>
                    <p className="text-muted-foreground">Establish daily word count targets based on your project requirements and writing capacity to maintain steady progress.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Quality Control</h5>
                    <p className="text-muted-foreground">Use readability metrics to ensure your content matches your audience's reading level and comprehension abilities.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Content Strategy</h5>
                    <p className="text-muted-foreground">Optimize word count for different content types and platforms to maximize engagement and search visibility.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="text-lg font-semibold text-foreground mb-3">Advanced Features for Professional Writers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Real-time word and character counting</li>
                      <li>Readability scoring with multiple algorithms</li>
                      <li>Keyword density analysis for SEO optimization</li>
                      <li>Reading and speaking time estimation</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Document import from PDF, Word, and text files</li>
                      <li>Export options for analysis reports</li>
                      <li>Goal tracking with progress visualization</li>
                      <li>Mobile-optimized interface for writing on-the-go</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="text-lg font-semibold text-foreground mb-3">Writing Industry Standards</h4>
                <p className="text-muted-foreground text-sm mb-3">
                  Understanding word count expectations across different writing industries helps you deliver content that meets professional standards and client expectations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Fiction Writing</h5>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Short Stories: 1,000-7,500 words</li>
                      <li>Novellas: 17,500-40,000 words</li>
                      <li>Novels: 80,000-120,000 words</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Business Writing</h5>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Press Releases: 300-500 words</li>
                      <li>White Papers: 2,500-5,000 words</li>
                      <li>Case Studies: 1,000-3,000 words</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Related Content Section */}
        <RelatedContent
          title="Explore More Tools & Writing Resources"
          items={TOOL_RELATED_CONTENT['word-counter']}
          maxItems={4}
          className="mt-12"
        />
      </section>
      
      
      {/* Structured data is now handled by the useSEO hook */}
    </>
  );
}
