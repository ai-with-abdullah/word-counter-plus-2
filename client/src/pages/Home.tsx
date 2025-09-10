import useSEO from '@/hooks/useSEO';
import { lazy, Suspense } from 'react';
const WordCounterTool = lazy(() => import('@/components/word-counter/WordCounterTool'));
import { Link } from 'wouter';
import { FaArrowRight, FaBolt, FaChartLine, FaCheckCircle, FaDownload, FaGraduationCap, FaPenFancy } from 'react-icons/fa';

export default function Home() {
  useSEO({
    title: "Free Word Counter, Character Counter & Text Counter - Word Counter Plus",
    description: "Free online word counter, character counter, and text counter tool. Count words, characters, paragraphs, sentences instantly. Best text analysis tool with readability scores, keyword density, and export options for writers, students, and content creators.",
    keywords: "word counter, character counter, text counter, count words, count characters, free word counter, online word counter, text analysis, word count tool, character count tool, text count tool, paragraph counter, sentence counter, readability score, keyword density, SEO tool, writing tool, content analysis, text statistics, word frequency, character frequency, text counter online, free character counter, count text, word counter online free, character counter online, text counter free, writing analysis, document word count, essay word counter, blog word counter, social media character counter, twitter character counter, facebook character counter, instagram character counter, letter counter, symbol counter, space counter, line counter, page counter, text length checker, word limit checker, character limit checker, text editor, writing assistant, content writing tool, copywriting tool, academic writing, student writing tool, author tool, blogger tool, journalist tool, content creator tool, marketing tool, digital marketing tool, social media tool, email marketing tool, content marketing tool, writing productivity, text processing, document analysis, manuscript analysis, thesis word count, dissertation word count, research paper word count, article word count, story word count, novel word count, book word count, script word count, screenplay word count, poetry word count, lyrics word count, speech word count, presentation word count, report word count, proposal word count, resume word count, cover letter word count, press release word count, website content analysis, web copy analysis, ad copy analysis, product description analysis, meta description counter, title tag counter, heading counter, alt text counter, caption counter, subtitle counter, translation word count, proofreading tool, editing tool, revision tool, draft analysis, final copy analysis, word tracker, character tracker, text tracker, writing goal tracker, daily word count, weekly word count, monthly word count, yearly word count, writing progress, writing metrics, writing statistics, text metrics, content metrics, word density, character density, text density, vocabulary analysis, language analysis, linguistic analysis, readability analysis, flesch reading ease, flesch kincaid grade level, gunning fog index, automated readability index, coleman liau index, simple measure of gobbledygook, reading time calculator, speaking time calculator, typing time calculator",
    canonical: "https://wordcounterplusapp.com/",
    ogType: "website"
  });

  // ✅ Review / AggregateRating schema for ⭐ stars
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://wordcounterplusapp.com/#product",
    "name": "Word Counter Plus",
    "url": "https://wordcounterplusapp.com/",
    "description": "Free online word counter, character counter, and text analysis tool with readability scores, keyword density, and export options.",
    "brand": {
      "@type": "Brand",
      "name": "Word Counter Plus"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "128"
    }
  };

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
      <section className="container mx-auto px-4 py-12">
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

      {/* ✅ Inject Review Schema for Stars */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </>
  );
}
