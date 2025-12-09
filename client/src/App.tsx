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

// Comparison pages
const Comparisons = lazy(() => import("@/pages/Comparisons"));
const VsWordCounter = lazy(() => import("@/pages/comparisons/VsWordCounter"));
const VsCharacterCount = lazy(() => import("@/pages/comparisons/VsCharacterCount"));
const VsGrammarly = lazy(() => import("@/pages/comparisons/VsGrammarly"));
const VsWordCountTool = lazy(() => import("@/pages/comparisons/VsWordCountTool"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <OptimizedLoader />
  </div>
);

function Router() {
  const currentIsMainHost = isMainHost();
  const currentIsCaseHost = isCaseHost();

  const mainRoutes = [
    { path: "/", component: Home },
    { path: "/text-case-convert", component: TextCaseConverterPage },
    { path: "/text-case-converter", component: TextCaseConverterPage },
    { path: "/tools", component: Tools },
    { path: "/character-counter", component: CharacterCounter },
    { path: "/word-frequency-counter", component: WordFrequencyCounter },
    { path: "/random-word-generator", component: RandomWordGenerator },
    { path: "/words-per-page", component: WordsPerPage },
    { path: "/plagiarism-checker", component: PlagiarismChecker },
    { path: "/resume-cv-checker", component: ResumeCVChecker },
    { path: "/seo-content-analyzer", component: SEOContentAnalyzer },
    { path: "/speech-to-text", component: SpeechToText },
    { path: "/readability-calculator", component: ReadabilityCalculator },
    { path: "/grammar-checker", component: GrammarChecker },
    { path: "/text-compare", component: TextCompare },
    { path: "/letter-counter", component: LetterCounter },
    { path: "/sentence-counter", component: SentenceCounter },
    { path: "/paragraph-counter", component: ParagraphCounter },
    { path: "/line-counter", component: LineCounter },
    { path: "/extension", component: Extension },
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    { path: "/blog/:slug", component: BlogPost },
    { path: "/blog", component: Blog },
    { path: "/faq", component: FAQ },
    { path: "/privacy", component: Privacy },
    { path: "/terms", component: Terms },
    { path: "/disclaimer", component: Disclaimer },
    { path: "/cookies", component: Cookies },
    { path: "/help-us", component: HelpUs },
    { path: "/loading-demo", component: LoadingDemo },
    { path: "/admin", component: Admin },
    { path: "/download", component: Download },
    { path: "/comparisons", component: Comparisons },
    { path: "/vs-wordcounter", component: VsWordCounter },
    { path: "/vs-charactercount", component: VsCharacterCount },
    { path: "/vs-grammarly", component: VsGrammarly },
    { path: "/vs-wordcounttool", component: VsWordCountTool },
  ];

  const caseRoutes = [
    { path: "/", component: TextCaseConverterPage },
    { path: "/tools", component: Tools },
    { path: "/character-counter", component: CharacterCounter },
    { path: "/word-frequency-counter", component: WordFrequencyCounter },
    { path: "/random-word-generator", component: RandomWordGenerator },
    { path: "/words-per-page", component: WordsPerPage },
    { path: "/plagiarism-checker", component: PlagiarismChecker },
    { path: "/resume-cv-checker", component: ResumeCVChecker },
    { path: "/seo-content-analyzer", component: SEOContentAnalyzer },
    { path: "/speech-to-text", component: SpeechToText },
    { path: "/readability-calculator", component: ReadabilityCalculator },
    { path: "/grammar-checker", component: GrammarChecker },
    { path: "/text-compare", component: TextCompare },
    { path: "/letter-counter", component: LetterCounter },
    { path: "/sentence-counter", component: SentenceCounter },
    { path: "/paragraph-counter", component: ParagraphCounter },
    { path: "/line-counter", component: LineCounter },
    { path: "/text-case-convert", component: TextCaseConverterPage },
    { path: "/text-case-converter", component: TextCaseConverterPage },
    { path: "/extension", component: Extension },
    { path: "/about", component: About },
    { path: "/contact", component: Contact },
    { path: "/blog/:slug", component: BlogPost },
    { path: "/blog", component: Blog },
    { path: "/faq", component: FAQ },
    { path: "/privacy", component: Privacy },
    { path: "/terms", component: Terms },
    { path: "/disclaimer", component: Disclaimer },
    { path: "/cookies", component: Cookies },
    { path: "/help-us", component: HelpUs },
    { path: "/loading-demo", component: LoadingDemo },
    { path: "/admin", component: Admin },
    { path: "/download", component: Download },
  ];

  const routes = currentIsMainHost ? mainRoutes : (currentIsCaseHost ? caseRoutes : mainRoutes);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} />
        ))}
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
