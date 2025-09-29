import { useState } from 'react';
import useSEO from '@/hooks/useSEO';
import { FaEnvelope, FaPlay, FaChevronDown } from 'react-icons/fa';
import { getCurrentOrigin } from '@/lib/site';


interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  useSEO({
    title: "FAQ - Word Counter Plus Help | Frequently Asked Questions",
    description: "Get answers to common questions about Word Counter Plus tools. Learn about word counting, character analysis, case conversion, privacy, export options, and SEO features.",
    canonical: `${getCurrentOrigin()}/faq`
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs: FAQItem[] = [
    {
      question: "How accurate is the word counter?",
      answer: "Our word counter uses advanced algorithms to accurately count words, characters, sentences, and paragraphs. It handles various text formats and provides real-time analysis as you type. The tool correctly processes different languages, special characters, and formatting."
    },
    {
      question: "What is the Flesch-Kincaid readability score?",
      answer: "The Flesch-Kincaid score measures text readability based on sentence length and syllable count. Higher scores indicate easier readability, with 60-70 being standard and 90-100 being very easy to read. We also provide Gunning Fog Index and Automated Readability Index for comprehensive analysis."
    },
    {
      question: "Is my text stored or shared with anyone?",
      answer: "No, your text is processed entirely in your browser and never sent to our servers. We respect your privacy and don't store or share any of your content. You can use our tool offline once loaded. All analysis happens locally on your device."
    },
    {
      question: "Can I export my analysis results?",
      answer: "Yes! You can export your analysis in multiple formats including PDF, CSV, TXT, and JSON. You can also copy results to clipboard or share them on social media platforms. Export includes all statistics, readability scores, and keyword analysis."
    },
    {
      question: "What features does the keyword density analysis include?",
      answer: "Our keyword density tool analyzes single keywords, two-word phrases, and three-word phrases. It shows frequency counts, percentages, and can highlight keywords in your text for easy visualization. Perfect for SEO content optimization."
    },
    {
      question: "How is the reading time calculated?",
      answer: "Reading time is estimated based on an average reading speed of 200 words per minute. Speaking time uses 130 words per minute. These are industry-standard rates for content planning and presentation preparation."
    },
    {
      question: "Can I use this tool for SEO content optimization?",
      answer: "Absolutely! The keyword density analysis, readability scores, and word count targets make it perfect for SEO content optimization. Aim for 1-2% keyword density for best results. Use readability scores to ensure content is accessible to your target audience."
    },
    {
      question: "Does the tool work offline?",
      answer: "Yes, once the page is loaded, all analysis is performed in your browser without needing an internet connection. Your text never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "What file formats can I upload for analysis?",
      answer: "You can upload various file formats including TXT, DOC, DOCX, PDF, and more. The tool automatically extracts text content and provides comprehensive analysis including word count, character count, and readability metrics."
    },
    {
      question: "How does the Character Counter tool work?",
      answer: "The Character Counter provides detailed character analysis including characters with/without spaces, emoji detection, language detection, typing speed tracking, and social media character limit checking for platforms like Twitter, Facebook, Instagram, and LinkedIn."
    },
    {
      question: "What case conversion options are available in the Text Case Converter?",
      answer: "The Text Case Converter supports multiple formats: uppercase, lowercase, title case, sentence case, camel case, pascal case, snake case, kebab case, alternating case, and inverse case. Perfect for developers, writers, and content creators."
    },
    {
      question: "Can I use these tools for academic writing?",
      answer: "Yes! Our tools are perfect for academic writing. Check word counts for essays, theses, and dissertations. Use readability analysis to ensure appropriate complexity levels. The citation and reference formatting features help maintain academic standards."
    },
    {
      question: "How does the social media character limit feature work?",
      answer: "Our Character Counter includes built-in limits for major platforms: Twitter (280 characters), Facebook posts (63,206 characters), Instagram captions (2,200 characters), LinkedIn posts (3,000 characters), and TikTok captions (300 characters). Get real-time feedback as you type."
    },
    {
      question: "Is there a mobile app available?",
      answer: "While we don't have a dedicated mobile app, our web-based tools are fully responsive and optimized for mobile devices. Access all features from any smartphone or tablet browser with full functionality."
    },
    {
      question: "Can I use these tools for programming and code formatting?",
      answer: "Yes! The Text Case Converter is particularly useful for programming. Convert text to camelCase, PascalCase, snake_case, or kebab-case for variable names, function names, and file naming conventions across different programming languages."
    },
    {
      question: "How accurate is the language detection feature?",
      answer: "Our language detection uses advanced algorithms to identify the primary language of your text. It supports major world languages and provides confidence scores. This helps with international content creation and localization projects."
    },
    {
      question: "Can I track my typing speed with these tools?",
      answer: "Yes! The Character Counter includes a typing speed calculator that measures your words per minute (WPM) and characters per minute. Great for writers looking to improve their productivity and typing efficiency."
    },
    {
      question: "Are there any usage limits or restrictions?",
      answer: "No! All our tools are completely free with no usage limits, registration requirements, or hidden fees. Process unlimited text, upload multiple files, and use all features without restrictions."
    },
    {
      question: "How do I optimize content for different platforms?",
      answer: "Use our platform-specific character limits, optimize keyword density for SEO (1-2%), maintain readability scores appropriate for your audience (60-70 for general content), and use the export features to format content for different channels."
    },
    {
      question: "Can I use these tools for team collaboration?",
      answer: "While our tools are individual-focused for privacy, you can easily share analysis results via export features or copy-paste functionality. The consistent formatting helps maintain team content standards."
    }
  ];

  // JSON-LD for FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to the most common questions about our <strong>word counter and text analysis tool</strong>. 
              Learn how to make the most of our features for content creation and SEO optimization.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg">
                <button 
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex justify-between items-center"
                  data-testid={`faq-question-${index}`}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <FaChevronDown className={`text-muted-foreground transition-transform ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="p-4 pt-0 text-muted-foreground" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Additional SEO Content */}
          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Our comprehensive <strong>word counter tool</strong> is designed to be intuitive, 
              but we're always here to help. Contact us for personalized support with text analysis, SEO optimization, or any other questions.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                <FaEnvelope className="mr-2" aria-label="Envelope Icon" />
                Contact Support
              </a>
              <a href="/" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                <FaPlay className="mr-2" aria-label="Play Icon" />
                Try the Tool
              </a>
            </div>
          </div>
        </div>
        
        {/* FAQ Schema */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
  );
}
