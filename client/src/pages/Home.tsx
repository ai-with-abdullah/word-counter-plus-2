import useSEO from '@/hooks/useSEO';
import WordCounterTool from '@/components/word-counter/WordCounterTool';
import { Link } from 'wouter';

export default function Home() {
  useSEO({
    title: "Word Counter Plus - Free Advanced Word Counter & Text Analysis Tool",
    description: "Professional word counter and text analysis tool with real-time statistics, readability scores, keyword density analysis, and export options. Free online tool for writers, bloggers, students, and content creators.",
    keywords: "word counter, character counter, text analysis, readability score, keyword density, SEO tool, writing tool, content analysis, paragraph counter, sentence counter, reading time calculator, writing assistant, text statistics",
    canonical: "https://wordcounterplus.com/",
    ogType: "website"
  });

  // JSON-LD for FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is the word count?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our word counter is extremely accurate and follows industry-standard counting methods. It counts words, characters, sentences, and paragraphs in real-time as you type."
        }
      },
      {
        "@type": "Question",
        "name": "Is the text analysis tool free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Word Counter Plus is completely free to use. You can analyze unlimited text, export results, and access all features without any cost or registration."
        }
      },
      {
        "@type": "Question",
        "name": "What export formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can export your text analysis results in multiple formats including PDF, CSV, and TXT. This makes it easy to save and share your analysis."
        }
      }
    ]
  };

  return (
    <>
      {/* Main Content */}
      <WordCounterTool />
      
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
                    <i className="fas fa-bolt text-primary text-2xl mb-2"></i>
                    <h3 className="font-semibold">Real-time Analysis</h3>
                    <p className="text-sm">Instant results as you type</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <i className="fas fa-download text-primary text-2xl mb-2"></i>
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
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Advanced Word Counter:</strong> Count words, characters, sentences, and paragraphs with precision
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Readability Analysis:</strong> Flesch-Kincaid readability scores and reading level assessment
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Keyword Density:</strong> Analyze keyword frequency for SEO optimization
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Export & Share:</strong> Download analysis as PDF, CSV, or TXT files
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Reading Time:</strong> Estimate reading and speaking time for your content
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                  <div>
                    <strong>Goal Tracking:</strong> Set word limits and track your progress
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <Link href="/faq">
                  <span className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                    Learn More About Our Features
                    <i className="fas fa-arrow-right ml-2"></i>
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
                <i className="fas fa-pen-fancy text-primary text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Content Creators</h3>
              <p className="text-sm text-muted-foreground">
                Optimize blog posts, articles, and social media content with precise word counts and readability analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-graduation-cap text-primary text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Students</h3>
              <p className="text-sm text-muted-foreground">
                Meet essay requirements, track assignment progress, and improve academic writing with detailed analysis.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white dark:bg-card rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <i className="fas fa-chart-line text-primary text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">SEO Specialists</h3>
              <p className="text-sm text-muted-foreground">
                Analyze keyword density, optimize content length, and improve search engine rankings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
