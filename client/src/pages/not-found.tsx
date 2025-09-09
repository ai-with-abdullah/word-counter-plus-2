import { Link } from "wouter";
import { Home, Search, ArrowLeft, LifeBuoy } from "lucide-react";
import useSEO from '@/hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: "Page Not Found | Word Counter Plus",
    description: "The page you're looking for doesn't exist. Return to Word Counter Plus to continue using our powerful text analysis tools.",
    keywords: "404, page not found, word counter, text analysis tool",
    canonical: "https://wordcounterplusapp.com/404"
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-card rounded-xl p-8 md:p-12 shadow-lg border border-border">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none select-none">
              404
            </h1>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sorry, we couldn't find the page you're looking for. The page may have been moved, 
                deleted, or you may have entered an incorrect URL.
              </p>
            </div>

            {/* Search Suggestion */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
                <Search className="w-5 h-5" />
                <span className="font-medium">Looking for something specific?</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Try our <Link href="/" className="text-primary hover:text-primary/80 font-medium">word counter tool</Link> or 
                check out our <Link href="/faq" className="text-primary hover:text-primary/80 font-medium">frequently asked questions</Link>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/">
                <button className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto">
                  <Home className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              </Link>

              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center space-x-2 bg-muted text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>

              <Link href="/contact">
                <button className="flex items-center justify-center space-x-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/50 transition-colors w-full sm:w-auto">
                  <LifeBuoy className="w-5 h-5" />
                  <span>Get Help</span>
                </button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Or try these popular pages:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/" className="text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1 rounded-full transition-colors">
                  Word Counter
                </Link>
                <Link href="/blog" className="text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1 rounded-full transition-colors">
                  Blog
                </Link>
                <Link href="/faq" className="text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1 rounded-full transition-colors">
                  FAQ
                </Link>
                <Link href="/privacy" className="text-sm text-primary hover:text-primary/80 bg-primary/10 px-3 py-1 rounded-full transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}