import { Link } from "wouter";
import { Target, Users, Award, Zap, Shield, Globe } from "lucide-react";
import useSEO from '@/hooks/useSEO';

export default function About() {
  useSEO({
    title: "About Us | Word Counter Plus - Professional Text Analysis Tool",
    description: "Learn about Word Counter Plus, the leading online word counter and text analysis platform. Discover our mission, features, and commitment to helping writers and content creators.",
    keywords: "about word counter plus, text analysis company, word counting tool team, writing tools about, content analysis platform",
    canonical: "https://wordcounterplusapp.com/about"
  });

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          About Word Counter Plus
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We're passionate about empowering writers, content creators, and professionals with 
          powerful text analysis tools that make writing more effective and efficient.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-16">
        
        {/* Our Story */}
        <section className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
            <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
              <p className="text-lg leading-relaxed">
                Word Counter Plus was born from a simple idea: every writer deserves access to professional-grade 
                text analysis tools without the complexity or cost barriers. Whether you're a student working on an essay, 
                a blogger crafting the perfect post, or a professional writer meeting strict guidelines, we believe 
                you should have the tools to succeed.
              </p>
              <p className="text-lg leading-relaxed">
                What started as a basic word counting tool has evolved into a comprehensive text analysis platform 
                that helps millions of users worldwide improve their writing, meet requirements, and create more 
                engaging content.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To democratize access to powerful writing tools and help every writer achieve their best work. 
              We believe that great writing shouldn't be limited by access to expensive software or complex platforms.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Accessibility First</h3>
                  <p className="text-muted-foreground">Free, fast, and easy-to-use tools for everyone</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Privacy Focused</h3>
                  <p className="text-muted-foreground">All text processing happens in your browser - we never see your content</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Lightning Fast</h3>
                  <p className="text-muted-foreground">Real-time analysis with instant results as you type</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Why Choose Us?</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">100% Browser-based processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Advanced readability analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Comprehensive keyword density tools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Export to PDF, CSV, and TXT</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Mobile-responsive design</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Dark mode support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Analysis</h3>
              <p className="text-muted-foreground">
                Get instant word counts, character counts, and readability scores as you type.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Metrics</h3>
              <p className="text-muted-foreground">
                Flesch-Kincaid readability scores, keyword density analysis, and detailed statistics.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Export Options</h3>
              <p className="text-muted-foreground">
                Export your analysis results to PDF, CSV, or TXT formats for easy sharing.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Privacy First</h3>
              <p className="text-muted-foreground">
                Your text never leaves your browser. All processing is done locally on your device.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">For Everyone</h3>
              <p className="text-muted-foreground">
                Perfect for students, writers, bloggers, marketers, and content creators.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Goal Tracking</h3>
              <p className="text-muted-foreground">
                Set word limits and track your progress with visual indicators and alerts.
              </p>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We're more than just a tool - we're a community of writers helping writers. 
              Whether you need help with a feature or want to share your success story, we're here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Get in Touch
                </button>
              </Link>
              <Link href="/faq">
                <button className="border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/50 transition-colors">
                  View FAQ
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/5 rounded-lg p-8 text-center border border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Improve Your Writing?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Try our powerful word counter and text analysis tools today. It's completely free!
          </p>
          <Link href="/">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
              Start Analyzing Your Text
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
}