import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import { OptimizedLoader } from '@/components/ui/optimized-loader';
import { lazy, Suspense, useEffect } from "react";

const Header = lazy(() => import("@/components/layout/Header"));
const Footer = lazy(() => import("@/components/layout/Footer"));
const ScrollRestoration = lazy(() => import("@/components/layout/ScrollToTop"));
const Home = lazy(() => import("@/pages/Home"));
import { isMainHost, isCaseHost } from "@/lib/site";

// Lazy load non-critical pages
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Disclaimer = lazy(() => import("@/pages/Disclaimer"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Contact = lazy(() => import("@/pages/Contact"));
const Tools = lazy(() => import("@/pages/Tools"));
const TextCaseConverterPage = lazy(() => import("@/pages/TextCaseConverter"));
const CharacterCounter = lazy(() => import("@/pages/CharacterCounter"));
const WordFrequencyCounter = lazy(() => import("@/pages/WordFrequencyCounter"));
const RandomWordGenerator = lazy(() => import("@/pages/RandomWordGenerator"));
const WordsPerPage = lazy(() => import("@/pages/WordsPerPage"));
const PlagiarismChecker = lazy(() => import("@/pages/PlagiarismChecker"));
const ResumeCVChecker = lazy(() => import("@/pages/ResumeCVChecker"));
const SEOContentAnalyzer = lazy(() => import("@/pages/SEOContentAnalyzer"));
const SpeechToText = lazy(() => import("@/pages/SpeechToText"));
const ReadabilityCalculator = lazy(() => import("@/pages/ReadabilityCalculator"));
const GrammarChecker = lazy(() => import("@/pages/GrammarChecker"));
const TextCompare = lazy(() => import("@/pages/TextCompare"));
const LetterCounter = lazy(() => import("@/pages/LetterCounter"));
const SentenceCounter = lazy(() => import("@/pages/SentenceCounter"));
const ParagraphCounter = lazy(() => import("@/pages/ParagraphCounter"));
const LineCounter = lazy(() => import("@/pages/LineCounter"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Extension = lazy(() => import("@/pages/Extension"));
const HelpUs = lazy(() => import("@/pages/HelpUs"));
const LoadingDemo = lazy(() => import("@/pages/LoadingDemo"));
const Admin = lazy(() => import("@/pages/Admin"));
const Download = lazy(() => import("@/pages/Download"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <OptimizedLoader />
  </div>
);

function Router() {
  const currentIsMainHost = isMainHost();
  const currentIsCaseHost = isCaseHost();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Host-specific routing */}
        {currentIsMainHost && (
          <>
            <Route path="/" component={Home} />
            <Route path="/text-case-convert" component={TextCaseConverterPage} />
            <Route path="/text-case-converter" component={TextCaseConverterPage} />
            <Route path="/tools" component={Tools} />
            <Route path="/character-counter" component={CharacterCounter} />
            <Route path="/word-frequency-counter" component={WordFrequencyCounter} />
            <Route path="/random-word-generator" component={RandomWordGenerator} />
            <Route path="/words-per-page" component={WordsPerPage} />
            <Route path="/plagiarism-checker" component={PlagiarismChecker} />
            <Route path="/resume-cv-checker" component={ResumeCVChecker} />
            <Route path="/seo-content-analyzer" component={SEOContentAnalyzer} />
            <Route path="/speech-to-text" component={SpeechToText} />
            <Route path="/readability-calculator" component={ReadabilityCalculator} />
            <Route path="/grammar-checker" component={GrammarChecker} />
            <Route path="/text-compare" component={TextCompare} />
            <Route path="/letter-counter" component={LetterCounter} />
            <Route path="/sentence-counter" component={SentenceCounter} />
            <Route path="/paragraph-counter" component={ParagraphCounter} />
            <Route path="/line-counter" component={LineCounter} />
            <Route path="/extension" component={Extension} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/help-us" component={HelpUs} />
            <Route path="/loading-demo" component={LoadingDemo} />
            <Route path="/admin" component={Admin} />
            <Route path="/download" component={Download} />
          </>
        )}
        
        {currentIsCaseHost && (
          <>
            <Route path="/" component={TextCaseConverterPage} />
            <Route path="/tools" component={Tools} />
            <Route path="/character-counter" component={CharacterCounter} />
            <Route path="/word-frequency-counter" component={WordFrequencyCounter} />
            <Route path="/random-word-generator" component={RandomWordGenerator} />
            <Route path="/words-per-page" component={WordsPerPage} />
            <Route path="/plagiarism-checker" component={PlagiarismChecker} />
            <Route path="/resume-cv-checker" component={ResumeCVChecker} />
            <Route path="/seo-content-analyzer" component={SEOContentAnalyzer} />
            <Route path="/speech-to-text" component={SpeechToText} />
            <Route path="/readability-calculator" component={ReadabilityCalculator} />
            <Route path="/grammar-checker" component={GrammarChecker} />
            <Route path="/text-compare" component={TextCompare} />
            <Route path="/letter-counter" component={LetterCounter} />
            <Route path="/sentence-counter" component={SentenceCounter} />
            <Route path="/paragraph-counter" component={ParagraphCounter} />
            <Route path="/line-counter" component={LineCounter} />
            <Route path="/text-case-convert" component={TextCaseConverterPage} />
            <Route path="/text-case-converter" component={TextCaseConverterPage} />
            <Route path="/extension" component={Extension} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/help-us" component={HelpUs} />
            <Route path="/loading-demo" component={LoadingDemo} />
            <Route path="/admin" component={Admin} />
            <Route path="/download" component={Download} />
          </>
        )}
        
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function BackwardCompatibilityHandler() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('tool') === 'case') {
        // Clean the URL and navigate using wouter
        const newUrl = new URL(window.location.href);
        newUrl.search = '';
        window.history.replaceState({}, '', newUrl.toString());
        
        // Navigate using wouter to trigger SPA routing
        setLocation('/text-case-convert');
      }
    }
  }, [setLocation]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BackwardCompatibilityHandler />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <OptimizedLoader />
            </div>
          }>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <ScrollRestoration /> 
              <Router />
              <Footer />
            </div>
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
