import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import useSEO from '@/hooks/useSEO';

export default function Comparisons() {
  useSEO({
    title: "Word Counter Plus vs Competitors - Feature Comparison 2025",
    description: "Compare Word Counter Plus with popular alternatives like WordCounter.net, Grammarly, CharacterCountOnline, and more. See why Word Counter Plus offers better features completely free.",
    canonical: "https://wordcounterplusapp.com/comparisons"
  });

  const comparisons = [
    {
      title: "Word Counter Plus vs WordCounter.net",
      description: "See how Word Counter Plus offers plagiarism detection, SEO analysis, and advanced readability features that WordCounter.net doesn't provide.",
      url: "/vs-wordcounter",
      highlights: ["Free plagiarism checker", "No ads", "Advanced readability algorithms"]
    },
    {
      title: "Word Counter Plus vs Grammarly",
      description: "Compare our free plagiarism and readability tools against Grammarly's $30/month premium subscription.",
      url: "/vs-grammarly",
      highlights: ["Free plagiarism detection", "No subscription required", "Privacy-focused"]
    },
    {
      title: "Word Counter Plus vs CharacterCountOnline",
      description: "Discover why Word Counter Plus provides comprehensive text analysis beyond basic character counting.",
      url: "/vs-charactercount",
      highlights: ["All-in-one platform", "Multiple export formats", "Professional features"]
    },
    {
      title: "Word Counter Plus vs WordCountTool.com",
      description: "Find out how Word Counter Plus surpasses WordCountTool with plagiarism detection, SEO tools, and export capabilities.",
      url: "/vs-wordcounttool",
      highlights: ["Plagiarism checker included", "SEO optimization tools", "PDF/CSV/TXT export"]
    }
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" data-testid="text-heading">
          Compare Word Counter Plus with Competitors
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
          See detailed feature comparisons between Word Counter Plus and popular alternatives. Discover why thousands of writers, students, and content creators choose our free, comprehensive text analysis platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {comparisons.map((comparison, index) => (
          <Card key={index} className="hover-elevate" data-testid={`card-comparison-${index}`}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{comparison.title}</CardTitle>
              <CardDescription className="text-sm sm:text-base">{comparison.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {comparison.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link href={comparison.url}>
                <Button className="w-full" data-testid={`button-view-comparison-${index}`}>
                  View Full Comparison
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl" data-testid="text-why-choose">Why Choose Word Counter Plus?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 sm:mb-6">
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">100% Free Forever</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">All premium features including plagiarism detection, SEO analysis, and readability scoring - completely free.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">No Ads or Distractions</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Clean, professional interface without advertisements or premium upsells.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Privacy First</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Your text stays private - all analysis happens in your browser with no data storage.</p>
            </div>
          </div>
          <Link href="/">
            <Button className="w-full sm:w-auto" data-testid="button-try-free">
              Try Word Counter Plus Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
