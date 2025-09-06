import { useState } from 'react';
import useSEO from '@/hooks/useSEO';
import { FaEnvelope, FaPlay, FaChevronDown } from 'react-icons/fa';


interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  useSEO({
    title: "FAQ - Frequently Asked Questions | Word Counter Plus",
    description: "Find answers to common questions about Word Counter Plus word counter tool. Learn about features, privacy, export options, readability scores, and SEO optimization.",
    keywords: "FAQ, word counter questions, text analysis help, readability score explanation, keyword density FAQ, export formats, privacy questions",
    canonical: "https://wordcounterplusapp.com/faq"
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
      answer: "Our word counter uses advanced algorithms to accurately count words, characters, sentences, and paragraphs. It handles various text formats and provides real-time analysis as you type."
    },
    {
      question: "What is the Flesch-Kincaid readability score?",
      answer: "The Flesch-Kincaid score measures text readability based on sentence length and syllable count. Higher scores indicate easier readability, with 60-70 being standard and 90-100 being very easy to read."
    },
    {
      question: "Is my text stored or shared with anyone?",
      answer: "No, your text is processed entirely in your browser and never sent to our servers. We respect your privacy and don't store or share any of your content. You can use our tool offline once loaded."
    },
    {
      question: "Can I export my analysis results?",
      answer: "Yes! You can export your analysis in multiple formats including PDF, CSV, and TXT. You can also copy results to clipboard or share them on social media platforms."
    },
    {
      question: "What features does the keyword density analysis include?",
      answer: "Our keyword density tool analyzes single keywords, two-word phrases, and three-word phrases. It shows frequency counts, percentages, and can highlight keywords in your text for easy visualization."
    },
    {
      question: "How is the reading time calculated?",
      answer: "Reading time is estimated based on an average reading speed of 200 words per minute. Speaking time uses 130 words per minute. These are industry-standard rates for content planning."
    },
    {
      question: "Can I use this tool for SEO content optimization?",
      answer: "Absolutely! The keyword density analysis, readability scores, and word count targets make it perfect for SEO content optimization. Aim for 1-2% keyword density for best results."
    },
    {
      question: "Does the tool work offline?",
      answer: "Yes, once the page is loaded, all analysis is performed in your browser without needing an internet connection. Your text never leaves your device."
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
