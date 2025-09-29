import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/useTheme";
import Header from "@/components/layout/Header";
import ScrollRestoration from "@/components/layout/ScrollToTop";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import { OptimizedLoader } from '@/components/ui/optimized-loader';
import { lazy, Suspense, useEffect } from "react";
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
const NotFound = lazy(() => import("@/pages/not-found"));

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
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/cookies" component={Cookies} />
          </>
        )}
        
        {currentIsCaseHost && (
          <>
            <Route path="/" component={TextCaseConverterPage} />
            <Route path="/tools" component={Tools} />
            <Route path="/character-counter" component={CharacterCounter} />
            <Route path="/text-case-convert" component={TextCaseConverterPage} />
            <Route path="/text-case-converter" component={TextCaseConverterPage} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog/:slug" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/faq" component={FAQ} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/cookies" component={Cookies} />
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
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <ScrollRestoration /> 
            <Router />
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
