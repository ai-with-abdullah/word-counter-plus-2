import { Link } from "wouter";
import { Heart, Star, Share2, Users, Lightbulb, MessageCircle, Gift, CheckCircle, TrendingUp } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";
import useSEO from '@/hooks/useSEO';

export default function HelpUs() {
  useSEO({
    title: "Help Word Counter Plus - Support & Promote Our Free Tools",
    description: "Help us make Word Counter Plus better! Discover simple ways to support and promote our free text analysis tools. Bookmark, share, provide feedback, and spread the word.",
    keywords: "help word counter plus, support free tools, share word counter, promote text analysis, feedback, feature suggestions, bookmark word counter, spread the word",
    canonical: "https://wordcounterplusapp.com/help-us"
  });

  const helpWays = [
    {
      icon: Star,
      title: "Bookmark Word Counter Plus",
      description: "Save our website for quick and easy access whenever you need text analysis tools.",
      action: "Bookmark Now",
      benefit: "Instant access to all tools",
      color: "text-yellow-500"
    },
    {
      icon: Share2,
      title: "Share on Social Media",
      description: "Help spread the word by sharing Word Counter Plus with your friends, colleagues, and followers.",
      action: "Share Now",
      benefit: "Help others discover our tools",
      color: "text-blue-500"
    },
    {
      icon: MessageCircle,
      title: "Send Us Feedback",
      description: "Share your thoughts, suggestions, and ideas to help us improve our platform.",
      action: "Give Feedback",
      benefit: "Shape future features",
      color: "text-green-500"
    },
    {
      icon: Lightbulb,
      title: "Suggest New Features",
      description: "Have an idea for a new tool or feature? We'd love to hear about it!",
      action: "Suggest Feature",
      benefit: "Influence our roadmap",
      color: "text-purple-500"
    },
    {
      icon: Users,
      title: "Recommend to Others",
      description: "Tell your classmates, coworkers, and community about our free text analysis tools.",
      action: "Tell a Friend",
      benefit: "Grow our community",
      color: "text-pink-500"
    },
    {
      icon: Heart,
      title: "Leave a Review",
      description: "Share your experience with Word Counter Plus to help others trust our platform.",
      action: "Write Review",
      benefit: "Build trust and credibility",
      color: "text-red-500"
    }
  ];

  const impactStats = [
    { icon: Users, value: "1M+", label: "Monthly Users", description: "People using our tools worldwide" },
    { icon: Star, value: "4.8/5", label: "User Rating", description: "Average satisfaction score" },
    { icon: TrendingUp, value: "50+", label: "Tools & Features", description: "Free text analysis capabilities" }
  ];

  const socialLinks = [
    {
      name: "X (Twitter)",
      icon: SiX,
      url: "https://x.com/WordCounter_App",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/profile.php?id=61581983827941",
      color: "hover:text-blue-600"
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/word-counter-plus-app",
      color: "hover:text-blue-700"
    }
  ];

  const benefits = [
    "100% Free Forever - No hidden costs or premium tiers",
    "Privacy First - All processing happens in your browser",
    "No Registration Required - Start using immediately",
    "Regular Updates - New features added frequently",
    "Community Driven - Built based on user feedback",
    "Trusted by Millions - Used by students, writers, and professionals worldwide"
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Help Word Counter Plus",
          "description": "Ways to help and support Word Counter Plus text analysis tools",
          "publisher": {
            "@type": "Organization",
            "name": "Word Counter Plus"
          }
        })
      }} />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="heading-main">
              Help Word Counter Plus
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6" data-testid="text-description">
              Simple ways to help promote and improve Word Counter Plus for the benefit of all users
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Thank you for considering to help out! We've invested significant time and energy into making Word Counter Plus the best free text analysis platform. Your support helps us continue providing these tools to everyone at no cost.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-background rounded-xl p-8 border text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300" data-testid={`stat-${index}`}>
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-help-ways">
              How You Can Help
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Choose any of these simple actions to support Word Counter Plus. Every contribution helps us serve the community better!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpWays.map((way, index) => (
              <div key={index} className="bg-background rounded-xl p-6 border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group" data-testid={`help-way-${index}`}>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <way.icon className={`w-7 h-7 ${way.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{way.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{way.description}</p>
                <div className="flex items-center gap-2 text-xs text-primary mb-4">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">{way.benefit}</span>
                </div>
                {index === 0 ? (
                  <button 
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        // Show bookmark instruction
                        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
                      }
                    }}
                    className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
                    data-testid={`button-${index}`}
                  >
                    {way.action}
                  </button>
                ) : index === 4 ? (
                  <a 
                    href="mailto:?subject=Check%20out%20Word%20Counter%20Plus&body=I%20found%20this%20amazing%20free%20text%20analysis%20tool%3A%20https%3A%2F%2Fwordcounterplusapp.com"
                    className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-block text-center" 
                    data-testid={`button-${index}`}
                  >
                    {way.action}
                  </a>
                ) : index === 5 ? (
                  <Link href="/contact">
                    <button className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300" data-testid={`button-${index}`}>
                      {way.action}
                    </button>
                  </Link>
                ) : index === 1 ? (
                  <button 
                    onClick={() => {
                      const section = document.getElementById('social-share');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300" 
                    data-testid={`button-${index}`}
                  >
                    {way.action}
                  </button>
                ) : (
                  <Link href="/contact">
                    <button className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300" data-testid={`button-${index}`}>
                      {way.action}
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Sharing Section */}
      <section id="social-share" className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Share Word Counter Plus</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Help get the word out about Word Counter Plus on your favorite social media platforms
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 border max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4 flex-wrap justify-center">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={`${social.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-6 py-3 bg-muted rounded-lg hover:shadow-lg transition-all duration-300 ${social.color} group`}
                    data-testid={`social-${index}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-semibold">Share on {social.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="w-full border-t border-border pt-6 mt-2">
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Gift className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Pro Tip:</strong> When sharing, mention which tool helped you the most! Real experiences help others discover the right features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Us */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Your Support Matters</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Word Counter Plus is built on the principle of accessibility for all. Here's what makes us different:
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 border max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg" data-testid={`benefit-${index}`}>
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20 rounded-xl p-10 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-cta">
              Ready to Help?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Your support—whether it's a bookmark, a share, or feedback—helps us continue providing free, accessible text analysis tools to millions of users worldwide. Thank you for being part of our community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    // Show bookmark instruction
                    alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
                  }
                }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2" 
                data-testid="button-bookmark"
              >
                <Star className="w-5 h-5" />
                Bookmark This Page
              </button>
              <Link href="/contact">
                <button className="bg-background text-foreground border-2 border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2" data-testid="button-feedback">
                  <MessageCircle className="w-5 h-5" />
                  Send Feedback
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We truly appreciate your support and contribution to making Word Counter Plus better for everyone. Together, we're building the best free text analysis platform!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
