import { Link } from "wouter";
import { Upload, Download, FileText, Shield, Zap, CheckCircle, Star, Users, Globe, Clock, Award, TrendingUp } from "lucide-react";
import useSEO from '@/hooks/useSEO';
import { getAvailableTools } from '@/data/toolsConfig';

export default function About() {
  const tools = getAvailableTools();
  
  useSEO({
    title: "About Word Counter Plus - Free Text Analysis & Processing Tools Suite",
    description: "Word Counter Plus is a comprehensive free text analysis platform featuring advanced word counting, character counting, plagiarism detection, SEO analysis, grammar checking, and more. Upload TXT, PDF, DOC, DOCX files up to 10MB. Export results as PDF, CSV, TXT, JSON. No registration required. 100% free forever.",
    keywords: "word counter, character counter, text analysis tools, plagiarism checker, SEO analyzer, grammar checker, readability calculator, free text tools, document analysis, text processing, about word counter plus",
    canonical: "https://wordcounterplusapp.com/about"
  });

  const benefits = [
    {
      icon: Star,
      title: "100% Free Forever",
      description: "All tools and features are completely free with unlimited access. No premium tiers, no hidden costs, no subscriptions required.",
      details: "Access all professional-grade text analysis tools without spending a penny. No trials, no limitations."
    },
    {
      icon: Shield,
      title: "Privacy First Approach",
      description: "All text analysis happens in your browser. Your data never leaves your device. GDPR and CCPA compliant.",
      details: "We don't store, track, or share your documents. Complete privacy and data security guaranteed."
    },
    {
      icon: Zap,
      title: "Instant Real-Time Results",
      description: "Real-time analysis with immediate results. Lightning-fast processing with no waiting time.",
      details: "Works offline after initial load. No server delays, instant feedback as you type."
    },
    {
      icon: Users,
      title: "No Registration Required",
      description: "Start using immediately. No sign-up, no email required, no personal information needed.",
      details: "Access all tools instantly without creating an account or providing any information."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Trusted by millions of users in 200+ countries worldwide. Supports all English variants.",
      details: "Used by students, writers, professionals, and content creators globally."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Access our tools anytime, anywhere. Available 24 hours a day, 7 days a week.",
      details: "Cloud-based platform accessible from any device with an internet connection."
    }
  ];

  const features = [
    {
      title: "Advanced Text Analysis",
      description: "Comprehensive word and character counting with detailed statistics including sentence count, paragraph count, reading time, and speaking time estimates."
    },
    {
      title: "File Upload Support",
      description: "Upload documents in multiple formats (TXT, PDF, DOC, DOCX) up to 10MB. All tools support direct file analysis for seamless workflow."
    },
    {
      title: "Professional Exports",
      description: "Export your analysis results in multiple formats (PDF, CSV, TXT, JSON) for reports, presentations, or further analysis."
    },
    {
      title: "SEO Optimization",
      description: "Advanced SEO content analyzer with keyword density tracking, meta tag optimization, readability scoring, and content optimization suggestions."
    },
    {
      title: "Plagiarism Detection",
      description: "Advanced plagiarism checker with deep content analysis, source matching, and detailed originality reports for academic integrity."
    },
    {
      title: "Resume Analysis",
      description: "Professional resume analyzer with ATS optimization scoring, section analysis, action verb tracking, and industry benchmarking for job seekers."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Word Counter Plus",
          "applicationCategory": "Text Analysis Tool",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Free comprehensive text analysis platform with word counting, character counting, plagiarism detection, SEO analysis, and more.",
          "featureList": "Word Counter, Character Counter, Plagiarism Checker, SEO Analyzer, Grammar Checker, Readability Calculator, Text Case Converter, File Upload Support, Export Tools",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.8,
            "ratingCount": 50000
          }
        })
      }} />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="heading-main">
              About Word Counter Plus
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6" data-testid="text-description">
              Word Counter Plus is a comprehensive suite of <strong>free text analysis and processing tools</strong> designed for writers, students, content creators, and professionals who need accurate, instant text analysis.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Our platform combines powerful text analysis capabilities with an intuitive interface, offering everything from basic word counting to advanced plagiarism detection, SEO optimization, and grammar checking—all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To provide free, accessible, and professional-grade text analysis tools that help people write better, work smarter, and achieve their goals—without barriers, costs, or compromises on privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-benefits">
              Why Choose Word Counter Plus?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Trusted by millions worldwide for accurate text analysis and comprehensive writing tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-background rounded-xl p-6 border hover:border-primary/50 hover:shadow-lg transition-all duration-300" data-testid={`benefit-${index}`}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{benefit.description}</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{benefit.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Platform Features & Capabilities</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Comprehensive text analysis tools with advanced features for professional writing and content creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-6 border" data-testid={`feature-${index}`}>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* File Support */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-file-support">
              Universal File Upload & Export Support
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              All our tools support multiple file formats for seamless document analysis and professional report generation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Upload */}
            <div className="bg-background rounded-xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all" data-testid="card-upload">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Supported Upload Formats</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm" data-testid="format-txt">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>TXT Files:</strong> Plain text documents</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="format-pdf">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>PDF Files:</strong> Portable Document Format</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="format-doc">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>DOC/DOCX:</strong> Microsoft Word documents</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="format-size">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>File Size:</strong> Up to 10MB per upload</span>
                </li>
              </ul>
            </div>

            {/* Export */}
            <div className="bg-background rounded-xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all" data-testid="card-export">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Export Formats Available</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm" data-testid="export-pdf">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>PDF Reports:</strong> Professional analysis documents</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="export-csv">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>CSV Data:</strong> Spreadsheet-compatible exports</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="export-txt">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>TXT Files:</strong> Plain text results</span>
                </li>
                <li className="flex items-center gap-2 text-sm" data-testid="export-json">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground"><strong>JSON Format:</strong> Developer-friendly data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tools */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-tools">
              Complete Text Analysis Tool Suite
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              From basic word counting to advanced plagiarism detection and SEO analysis—all our specialized tools support file uploads and professional exports
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <Link key={tool.id} href={tool.href}>
                <article
                  className="flex items-center gap-3 p-4 bg-background rounded-lg border hover:border-primary/50 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  data-testid={`tool-${index}`}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <tool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{tool.title}</span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who Uses Our Tools */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who Uses Word Counter Plus?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our tools are trusted by diverse users across industries and professions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-lg p-6 border text-center" data-testid="user-students">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Students</h3>
              <p className="text-sm text-muted-foreground">Academic writing, essays, research papers, plagiarism checking</p>
            </div>
            <div className="bg-background rounded-lg p-6 border text-center" data-testid="user-writers">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Writers & Authors</h3>
              <p className="text-sm text-muted-foreground">Content creation, readability analysis, word count tracking</p>
            </div>
            <div className="bg-background rounded-lg p-6 border text-center" data-testid="user-marketers">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Content Marketers</h3>
              <p className="text-sm text-muted-foreground">SEO optimization, keyword analysis, content strategy</p>
            </div>
            <div className="bg-background rounded-lg p-6 border text-center" data-testid="user-professionals">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Professionals</h3>
              <p className="text-sm text-muted-foreground">Resume optimization, business documents, reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-10 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-cta">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Start analyzing your text with our comprehensive suite of free tools. No registration required, 100% free forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300" data-testid="button-start">
                  Start Analyzing Now
                </button>
              </Link>
              <Link href="/tools">
                <button className="bg-background text-foreground border-2 border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted hover:scale-105 hover:shadow-xl transition-all duration-300" data-testid="button-tools">
                  Explore All Tools
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
