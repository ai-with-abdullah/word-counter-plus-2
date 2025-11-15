import { useState } from 'react';
import useSEO from '@/hooks/useSEO';
import { FileText, ChevronDown, Upload, Download, Chrome } from 'lucide-react';
import { FaChrome, FaFirefox } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useSEO({
    title: "FAQ - Browser Extension & Text Analysis Tools | Word Counter Plus",
    description: "Get answers about Word Counter Plus browser extension for Chrome and Firefox, file upload (TXT, PDF, DOC, DOCX), export formats (PDF, CSV, JSON), and all text analysis features. Free for users worldwide.",
    keywords: "word counter faq, chrome extension, firefox extension, browser extension, upload files, export pdf, text analysis, word count, character counter, readability score",
    canonical: "https://wordcounterplusapp.com/faq"
  });

  const faqs: FAQItem[] = [
    // BROWSER EXTENSION QUESTIONS
    {
      question: "What is the Word Counter Plus browser extension?",
      answer: "Word Counter Plus browser extension lets you analyze any text on any webpage with a simple right-click. Available for Chrome and Firefox, it provides instant word count, character count, sentences, paragraphs, readability scores, reading time, speaking time, keyword density, and advanced statistics. All processing happens locally on your device with complete privacy. Install for free from Chrome Web Store or Firefox Add-ons.",
      category: "Browser Extension"
    },
    {
      question: "Which browsers support the Word Counter Plus extension?",
      answer: "Word Counter Plus is officially available on: (1) Chrome Web Store - for Google Chrome, Brave, Microsoft Edge, Opera, and all Chromium-based browsers, (2) Firefox Add-ons - for Mozilla Firefox and Firefox Developer Edition. The extension works identically on both platforms with the same features and privacy guarantees. Edge Add-ons version coming soon.",
      category: "Browser Extension"
    },
    {
      question: "How do I install the Chrome extension?",
      answer: "Visit the Chrome Web Store at https://chromewebstore.google.com/detail/djjfaiahpklmijflpfmpoamhbjcoimdi or click 'Install from Chrome Web Store' on our Extension page. Click 'Add to Chrome', confirm the installation, and the extension will appear in your toolbar. No account required, completely free. The extension works on Chrome, Brave, Edge, Opera, and all Chromium browsers.",
      category: "Browser Extension"
    },
    {
      question: "How do I install the Firefox extension?",
      answer: "Visit Firefox Add-ons at https://addons.mozilla.org/addon/word-counter-plus-app/ or click 'Install from Firefox Add-ons' on our Extension page. Click 'Add to Firefox', confirm the installation, and you're ready to go. No registration required, 100% free. Works on Firefox desktop and Firefox Developer Edition.",
      category: "Browser Extension"
    },
    {
      question: "How do I use the browser extension?",
      answer: "Using the extension is simple: (1) Highlight any text on any webpage (emails, articles, Google Docs, social media), (2) Right-click on the selected text, (3) Click 'Analyze with Word Counter Plus' from the context menu, (4) View instant analysis in the popup window. You can also click the extension icon in your toolbar to manually paste text for analysis. Works on all websites!",
      category: "Browser Extension"
    },
    {
      question: "What features does the browser extension offer?",
      answer: "The extension provides: Word Count (total words), Character Count (with/without spaces), Sentence Count, Paragraph Count, Line Count, Readability Score (Flesch-Kincaid with difficulty level), Reading Time (at 200 words/minute), Speaking Time (at 130 words/minute), Keyword Density Analysis, Top Keywords with frequency, Unique Word Count, Average Word Length, Longest/Shortest Words, Word Frequency Chart, and Text Complexity Score. All features work offline after installation.",
      category: "Browser Extension"
    },
    {
      question: "Does the browser extension work offline?",
      answer: "Yes! Once installed, the Word Counter Plus extension works 100% offline. All text analysis happens locally in your browser without any internet connection. You can use it on flights, in remote areas, or anywhere without WiFi. No data is ever sent to external servers. Perfect for analyzing sensitive or confidential text with complete privacy.",
      category: "Browser Extension"
    },
    {
      question: "Is the browser extension really free?",
      answer: "Yes! The Word Counter Plus extension is completely free forever with no hidden costs, premium tiers, or paid features. Unlimited text analysis, unlimited use on any website, all features included. No subscription, no trial period, no credit card required. Available free on Chrome Web Store and Firefox Add-ons. We believe in making powerful writing tools accessible to everyone.",
      category: "Browser Extension"
    },
    {
      question: "What permissions does the browser extension require?",
      answer: "The extension requires minimal permissions: (1) Context Menu permission - to add 'Analyze with Word Counter Plus' when you right-click, (2) Storage permission - to save your preferences and remember your last analyzed text. We CANNOT access your passwords, browsing history, personal data, or any pages you don't explicitly select text from. Your privacy and security are our top priorities.",
      category: "Browser Extension"
    },
    {
      question: "Does the extension collect or store my text?",
      answer: "NO! Your text is NEVER collected, stored, or sent to any server. All analysis happens 100% locally in your browser. The extension processes text on your device and immediately discards it when you close the popup. We cannot see, access, or store your content. This is verified in our open approach and privacy policy. Your words stay private, always.",
      category: "Browser Extension"
    },
    {
      question: "Can I use the extension on Google Docs, Gmail, and other sites?",
      answer: "Absolutely! The extension works on ALL websites including: Google Docs, Gmail, Microsoft Office Online, Notion, Medium, WordPress editor, LinkedIn, Facebook, Twitter/X, Reddit, news articles, blog posts, research papers, and any website with text. Just highlight text anywhere and right-click to analyze. Perfect for writers, students, marketers, and professionals working across multiple platforms.",
      category: "Browser Extension"
    },
    {
      question: "What's the difference between the extension and the web app?",
      answer: "Extension: Analyze text anywhere on the web with right-click, no need to copy/paste, works offline after installation, lightweight and fast, perfect for quick analysis while browsing. Web App: More advanced features including file upload (TXT, PDF, DOC, DOCX up to 10MB), export results (PDF, CSV, TXT, JSON), 9 specialized tools (Plagiarism Checker, Resume Checker, SEO Analyzer, etc.), detailed reports. Both are 100% free and complement each other!",
      category: "Browser Extension"
    },

    // FILE UPLOAD & FORMATS (Web App)
    {
      question: "What file formats can I upload on the web app?",
      answer: "You can upload TXT, PDF, DOC, and DOCX files up to 10MB on ALL 9 tools. Supported formats: (1) TXT - Plain text documents, (2) PDF - Portable Document Format, (3) DOC - Microsoft Word documents, (4) DOCX - Modern Word format. Works on: Word Counter, Character Counter, Text Case Converter, Word Frequency Counter, Random Word Generator, Words Per Page Calculator, Plagiarism Checker, Resume/CV Checker, and SEO Content Analyzer. Simply click Upload, select your file, get instant analysis.",
      category: "File Upload"
    },
    {
      question: "What is the maximum file size for uploads?",
      answer: "Maximum file size is 10MB for all formats (TXT, PDF, DOC, DOCX). This handles: short essays (500-1,000 words), standard essays (1,500-5,000 words), research papers (5,000-15,000 words), theses (20,000-80,000 words), resumes (1-2 pages), blog posts (1,000-3,000 words), manuscripts (50,000-100,000+ words), business documents, and more. The 10MB limit applies across all 9 tools. Upload works instantly with no waiting time.",
      category: "File Upload"
    },
    {
      question: "What export formats are available?",
      answer: "Export your analysis in 4 professional formats: (1) PDF - Beautiful reports with all metrics and charts, perfect for sharing or printing, (2) CSV - Spreadsheet format for Excel or Google Sheets data analysis, (3) TXT - Plain text results for simple documentation, (4) JSON - Structured data for developers and integrations. All formats include complete analysis: word count, characters, readability scores, keyword density, and tool-specific metrics. Unlimited exports, completely free.",
      category: "Export & Download"
    },

    // WEB APP TOOLS
    {
      question: "What tools are available on Word Counter Plus?",
      answer: "We offer 9 professional tools: (1) Word Counter - Word count, readability scores, reading time, (2) Character Counter - Characters with/without spaces, social media limits, (3) Text Case Converter - 12 case formats (UPPER, lower, Title, camel, snake, etc.), (4) Word Frequency Counter - Keyword density, top phrases, SEO analysis, (5) Random Word Generator - Generate random words for writing and brainstorming, (6) Words Per Page Calculator - Convert words to pages with custom formatting, (7) Plagiarism Checker - Detect copied content and originality, (8) Resume/CV Checker - ATS optimization and job matching, (9) SEO Content Analyzer - SERP preview and optimization tips. All 100% free!",
      category: "Tools & Features"
    },
    {
      question: "How accurate is the word counter?",
      answer: "Our word counter uses advanced algorithms for 99.9% accuracy across all English variants (US, UK, Canadian, Australian, International). It correctly handles: contractions (don't, can't), hyphenated words (real-time, e-commerce), numbers (2024, $1,000), special characters, symbols, multiple languages, and all text formats. Real-time analysis updates as you type. Trusted by students, writers, and professionals worldwide for precise word counting.",
      category: "Tools & Features"
    },
    {
      question: "What is the Flesch-Kincaid readability score?",
      answer: "Flesch-Kincaid measures text readability based on sentence length and syllable count. Higher scores = easier reading: 90-100 (Very Easy - 5th grade), 80-90 (Easy - 6th grade), 70-80 (Fairly Easy - 7th grade), 60-70 (Standard - 8th-9th grade), 50-60 (Fairly Difficult - High school), 30-50 (Difficult - College), 0-30 (Very Difficult - College graduate). We also provide Gunning Fog Index and Automated Readability Index for comprehensive analysis.",
      category: "Tools & Features"
    },
    {
      question: "How is reading and speaking time calculated?",
      answer: "Reading Time: Calculated at 200 words per minute (average adult reading speed for English). Speaking Time: Calculated at 130 words per minute (standard presentation pace). These are industry-standard rates used by: content planners, educators, presenters, podcasters, video creators, and public speakers. Helps you estimate time for blog posts, speeches, presentations, videos, and audiobooks.",
      category: "Tools & Features"
    },
    {
      question: "How does the Character Counter work for social media?",
      answer: "Real-time character counting with platform-specific limits: Twitter/X (280 characters), Facebook posts (63,206), Instagram captions (2,200), LinkedIn posts (3,000), TikTok captions (300), YouTube descriptions (5,000), Pinterest pins (500), Reddit posts (40,000). Includes: character count with/without spaces, emoji detection and counting, URL handling, hashtag analysis, and visual limit warnings. Perfect for social media managers and content creators.",
      category: "Tools & Features"
    },
    {
      question: "What case formats does the Text Case Converter support?",
      answer: "12 conversion formats: (1) UPPERCASE - ALL CAPITALS, (2) lowercase - all lowercase, (3) Title Case - Every Word Capitalized, (4) Sentence case - First letter capitalized, (5) camelCase - forProgramming, (6) PascalCase - ForClassNames, (7) kebab-case - for-urls, (8) snake_case - for_variables, (9) CONSTANT_CASE - FOR_CONSTANTS, (10) dot.case - for.namespaces, (11) aLtErNaTiNg CaSe - for fun, (12) REVERSE CASE - swaps upper/lower. Perfect for developers, writers, and content creators.",
      category: "Tools & Features"
    },
    {
      question: "How does Word Frequency Counter help with SEO?",
      answer: "Analyzes: (1) Single keywords with count and density percentage, (2) Two-word phrases (bigrams) for natural language, (3) Three-word phrases (trigrams) for long-tail keywords, (4) Stop word filtering (remove 'the', 'a', 'is', etc.), (5) Case sensitivity options, (6) Visual charts (bar chart and pie chart), (7) Keyword density (optimal 1-2% for main keywords), (8) Export to CSV/JSON for reporting. Ideal for content optimization, SEO analysis, and keyword research.",
      category: "SEO & Tools"
    },
    {
      question: "What can I do with the Random Word Generator?",
      answer: "Generate random words with options: (1) Word Count - 1 to 1,000 words, (2) Word Type - Nouns, Verbs, Adjectives, Adverbs, or Mixed, (3) Word Length - Short (3-5 letters), Medium (6-8), Long (9+), (4) Separator - Space, Comma, Newline, or Custom, (5) Case Format - UPPER, lower, Title, Sentence. Download as TXT file. Perfect for: creative writing prompts, brainstorming sessions, password generation, word games, vocabulary building, and writing exercises.",
      category: "Tools & Features"
    },
    {
      question: "How does the Words Per Page Calculator work?",
      answer: "Convert words to pages or pages to words with custom settings: (1) Font Family - Arial, Times New Roman, Calibri, Verdana, Georgia, Courier, (2) Font Size - 8pt to 20pt, (3) Line Spacing - Single, 1.5, Double, (4) Margins - Normal, Narrow, Wide, Custom, (5) Paper Size - Letter/US (8.5×11), A4, Legal. Includes presets for: Academic Essays, Novels, Business Reports. Essential for students meeting word count requirements and authors planning book layouts.",
      category: "Tools & Features"
    },
    {
      question: "How does the Plagiarism Checker work?",
      answer: "Upload TXT, DOC, DOCX, or PDF files for plagiarism detection. Features: (1) Scan Modes - Quick (fast check), Standard (thorough), Deep (comprehensive), (2) Detection - Exact matches, paraphrased content, similar passages, (3) Results - Originality score (0-100%), source URLs, visual highlighting, matched percentages, (4) Report - Detailed plagiarism report with suggestions, downloadable PDF. Used by students, writers, content creators, and professionals for academic integrity and content originality.",
      category: "Tools & Features"
    },
    {
      question: "What does the Resume/CV Checker analyze?",
      answer: "Comprehensive resume analysis: (1) ATS Optimization Score - Applicant Tracking System compatibility, (2) Quantifiable Achievements - Detects numbers, percentages, dollar amounts ($50K, 25%, 100+), (3) Buzzwords & Clichés - Identifies overused phrases to avoid, (4) Action Verbs - Analyzes strong verbs (led, managed, increased, implemented), (5) Skills Detection - Extracts technical and soft skills, (6) Industry Keywords - Matches job descriptions, (7) Salary Estimator - Based on role and experience, (8) Job Title Suggestions. Upload DOCX/DOC/PDF for optimization. Perfect for job seekers and career professionals.",
      category: "Tools & Features"
    },
    {
      question: "How does the SEO Content Analyzer help?",
      answer: "Comprehensive SEO analysis: (1) SERP Preview - See how content appears in Google search results, (2) Meta Tags - Title tag (50-60 chars), meta description (150-160 chars), (3) Social Cards - Twitter card and Facebook Open Graph previews, (4) Keyword Density - Track main keywords (optimal 1-3%), (5) LSI Keywords - Latent Semantic Indexing suggestions, (6) Featured Snippet - Optimization tips for position zero, (7) FAQ Schema - Generate structured data, (8) Competitor Analysis - Compare with top-ranking content. Upload TXT/PDF/DOC/DOCX files. Essential for SEO specialists, marketers, and content creators.",
      category: "SEO & Tools"
    },

    // PRIVACY & SECURITY
    {
      question: "Is my text and data private and secure?",
      answer: "YES! 100% privacy guaranteed: (1) No Server Upload - All text processing happens in your browser locally, (2) No Data Storage - Your content is never stored on our servers, (3) No Tracking - We don't track what you type or analyze, (4) No Registration - No accounts, no email required, no personal data collected, (5) GDPR Compliant - Meets European privacy standards, (6) CCPA Compliant - California privacy protection. Browser extension and web app both process everything locally. Your words are yours, always.",
      category: "Privacy & Security"
    },
    {
      question: "Do you sell or share user data?",
      answer: "Absolutely NOT! We have NO user data to sell because we don't collect it. Your text never leaves your device. We don't: track your typing, store your content, collect email addresses, require registration, use analytics on your text, share data with third parties, or sell information. Our business model is providing free tools, not selling data. Your privacy is non-negotiable and protected by design.",
      category: "Privacy & Security"
    },

    // USAGE & LIMITS
    {
      question: "Are there any usage limits or costs?",
      answer: "NO limits and NO costs! 100% free forever: (1) Unlimited text analysis on all 9 tools, (2) Unlimited file uploads (TXT, PDF, DOC, DOCX up to 10MB each), (3) Unlimited exports (PDF, CSV, TXT, JSON), (4) Unlimited browser extension usage, (5) No registration required, (6) No premium tiers or paid features, (7) No hidden fees or trials. Available free worldwide including US, UK, Canada, Australia, and 200+ countries. We believe powerful writing tools should be accessible to everyone.",
      category: "General"
    },
    {
      question: "Do I need to create an account?",
      answer: "No! No account, no registration, no sign-up required. Just visit the website or install the browser extension and start using all features immediately. No email address, no password, no personal information needed. We value your privacy and want to remove all barriers to access. All features are available instantly without any registration.",
      category: "General"
    },

    // ACADEMIC USE
    {
      question: "Can I use this for academic essays and papers?",
      answer: "Absolutely! Perfect for students and academics: (1) Essay Word Count - Verify you meet requirements (500, 1000, 1500, 2500 words), (2) Readability Level - Ensure appropriate academic complexity, (3) Citation Management - Track reference counts, (4) File Upload - Analyze TXT/DOC/DOCX/PDF drafts, (5) Export Reports - Download PDF for verification, (6) Plagiarism Check - Verify originality before submission. Supports academic standards in US, UK, Canadian, Australian universities and institutions worldwide. Trusted by students for essays, theses, dissertations, and research papers.",
      category: "Academic"
    },
    {
      question: "How do I check word count for college essays?",
      answer: "Upload your essay file (TXT/DOC/DOCX/PDF) or paste text into Word Counter. Get: (1) Exact Word Count - Verify against requirements (Common App: 650 words, UC: 350 words, Supplementals: 150-500 words), (2) Character Count - Some applications use character limits, (3) Readability Score - Aim for 60-70 for college level, (4) Paragraph Structure - Ensure proper organization, (5) Export PDF - Save analysis for records. Real-time counting updates as you edit. Works for all university applications worldwide.",
      category: "Academic"
    },

    // CONTENT CREATION
    {
      question: "Is this tool good for bloggers and content creators?",
      answer: "Excellent for content creators! Features: (1) SEO Optimization - Target 1,500-2,500 words for blog posts, (2) Readability - Aim for 60-70 score for general audience, (3) Keyword Density - Track main keywords at 1-2%, (4) Social Media - Check character limits for sharing, (5) Meta Preview - See SERP and social card appearance, (6) Export Reports - Download analysis as PDF/CSV, (7) Upload Drafts - Analyze TXT/DOC/DOCX files. Perfect for bloggers, journalists, copywriters, marketers, and content teams in US, UK, Canada, Australia, and worldwide.",
      category: "Content Creation"
    },
    {
      question: "How do I optimize blog posts for SEO?",
      answer: "SEO optimization steps: (1) Target Length - Aim for 1,500-2,500 words for ranking, (2) Keyword Density - Main keyword 1-2%, LSI keywords 0.5-1%, (3) Readability - Score 60-70 for accessibility, (4) Meta Description - 150-160 characters with keyword, (5) Title Tag - 50-60 characters, compelling + keyword, (6) Headers - Use H2/H3 with keywords naturally, (7) SERP Preview - Check appearance in search results. Upload content as TXT/PDF/DOC/DOCX, use Word Frequency Counter for keywords, SEO Analyzer for optimization, export report as PDF. Works for all search engines worldwide.",
      category: "SEO & Content"
    },

    // TECHNICAL
    {
      question: "Does the tool work on mobile devices?",
      answer: "Yes! The web app (wordcounterplusapp.com) works perfectly on mobile browsers (iOS Safari, Android Chrome, Firefox Mobile, Samsung Internet). Responsive design adapts to phone and tablet screens. Browser extensions are desktop-only (Chrome and Firefox don't support mobile extensions). For mobile analysis, use our web app - same features, same privacy, same free access. Works offline after loading. Perfect for analyzing text on-the-go.",
      category: "Technical"
    },
    {
      question: "What browsers does the web app support?",
      answer: "Fully compatible with all modern browsers: Google Chrome, Mozilla Firefox, Safari (macOS/iOS), Microsoft Edge, Opera, Brave, Samsung Internet, and all Chromium-based browsers. Works on: Windows, macOS, Linux, iOS, Android, ChromeOS. Requires JavaScript enabled. No plugins or downloads needed for web app. For browser extension, install from Chrome Web Store (Chrome/Edge/Brave/Opera) or Firefox Add-ons (Firefox).",
      category: "Technical"
    },
    {
      question: "Can I use this tool offline?",
      answer: "Browser Extension: YES! Works 100% offline after installation. Web App: Requires internet for initial load, then works offline for analysis (no server upload needed). Once the web page loads, all processing is local. Extension is recommended for guaranteed offline access. Both maintain complete privacy with local processing. Perfect for: flights, remote areas, travel, sensitive documents, and privacy-focused users.",
      category: "Technical"
    },

    // COMPARISON
    {
      question: "What makes Word Counter Plus better than other tools?",
      answer: "Unique advantages: (1) Browser Extension - Chrome AND Firefox with right-click analysis on any website, (2) Complete Privacy - 100% local processing, zero data collection, (3) File Upload - TXT, PDF, DOC, DOCX up to 10MB, (4) Multiple Exports - PDF, CSV, TXT, JSON formats, (5) 9 Professional Tools - From word counting to SEO to plagiarism to resume analysis, (6) Advanced Features - Readability scores, keyword density, ATS optimization, SERP preview, (7) Always Free - No limits, no registration, no hidden costs, (8) Offline Capable - Extension works without internet. Trusted by millions worldwide.",
      category: "General"
    },

    // SPECIFIC USE CASES
    {
      question: "Can I analyze text from Google Docs and Microsoft Word?",
      answer: "Yes! Multiple ways: (1) Browser Extension - Install extension, highlight text in Google Docs/Word Online, right-click, analyze (works in the browser editors), (2) Copy & Paste - Copy text from any Word processor and paste into our web app, (3) File Upload - Upload DOC/DOCX files directly (up to 10MB), (4) Desktop Word - Copy from Word desktop app and paste into web app. All methods provide same comprehensive analysis. Works with: Google Docs, MS Word Online, MS Word Desktop, LibreOffice, Pages, and all text editors.",
      category: "Integration"
    },
    {
      question: "How do I count characters for Twitter/X and Instagram?",
      answer: "Use Character Counter tool: (1) Type or paste your caption/tweet, (2) See real-time character count with/without spaces, (3) Check against limits - Twitter/X: 280 characters, Instagram: 2,200 characters, (4) Emoji Detection - counts emojis correctly, (5) Hashtag Analysis - track hashtag length, (6) URL Handling - accounts for shortened URLs. Color-coded warnings show when approaching limits. Perfect for social media managers optimizing content for Twitter, Instagram, Facebook, LinkedIn, TikTok, YouTube, and all platforms worldwide.",
      category: "Social Media"
    },
    {
      question: "Can I check plagiarism for student papers?",
      answer: "Yes! Upload your paper (TXT/DOC/DOCX/PDF) to Plagiarism Checker: (1) Choose Deep Scan for comprehensive analysis, (2) Get Originality Score - 90%+ is excellent, 80-90% is good, below 80% needs review, (3) See Matched Sources - URLs of similar content found online, (4) Visual Highlighting - See exactly which parts match, (5) Improvement Suggestions - How to increase originality, (6) Download Report - PDF report for records. Helps students verify originality before submission. Not a replacement for university plagiarism systems (Turnitin, SafeAssign) but great for pre-submission checking.",
      category: "Academic"
    },
    {
      question: "How do I optimize my resume for ATS systems?",
      answer: "Use Resume/CV Checker: (1) Upload resume as DOCX, DOC, TXT, or PDF, (2) Get ATS Score - Shows compatibility with Applicant Tracking Systems, (3) Add Quantifiable Results - Include numbers (increased sales 25%, managed $1M budget, led team of 10), (4) Use Action Verbs - Replace weak verbs with strong ones (led, managed, achieved, implemented), (5) Include Keywords - Match job description terms, (6) Remove Buzzwords - Eliminate clichés (team player, hard worker, go-getter), (7) Download Report - Get optimization suggestions. Improves chances with ATS systems used by companies in US, UK, Canada, Australia, and globally.",
      category: "Job Search"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FileText className="w-4 h-4" />
              <span>Get Instant Answers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight" data-testid="heading-faq">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Everything you need to know about <strong className="text-foreground">Word Counter Plus browser extension</strong> for Chrome & Firefox, 
              file upload formats, export options, and all text analysis features. Trusted by users worldwide.
            </p>

            {/* Extension & File Format Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-500 px-4 py-2 rounded-full text-sm font-semibold">
                <FaChrome className="w-4 h-4" />
                <span>Chrome Extension Available</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 px-4 py-2 rounded-full text-sm font-semibold">
                <FaFirefox className="w-4 h-4" />
                <span>Firefox Extension Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Banner */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Chrome className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Browser Extensions</p>
                <p className="font-bold text-foreground">Chrome & Firefox</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upload Formats</p>
                <p className="font-bold text-foreground">TXT, PDF, DOC, DOCX</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Export Formats</p>
                <p className="font-bold text-foreground">PDF, CSV, TXT, JSON</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">File Size</p>
                <p className="font-bold text-foreground">Up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  data-testid={`faq-question-${index}`}
                >
                  <span className="font-semibold text-foreground text-lg pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6 pt-2" data-testid={`faq-answer-${index}`}>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    {faq.category && (
                      <div className="mt-4">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-10 max-w-3xl mx-auto border border-primary/20">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
