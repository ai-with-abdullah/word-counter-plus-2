import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaDownload,
  FaChrome,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaClock,
  FaChartBar,
  FaSave,
  FaMousePointer,
  FaFirefox,
  FaEdge,
  FaHourglass,
} from "react-icons/fa";
import { SiOpera } from "react-icons/si";
import useSEO from "@/hooks/useSEO";

export default function Extension() {
  useSEO({
    title: "Browser Extension - Word Counter Plus | Analyze Text Anywhere",
    description:
      "Word Counter Plus browser extension now available for Chrome, Firefox, Edge, Opera, and other browsers. Analyze any text on any webpage instantly with right-click context menu integration.",
    keywords:
      "word counter extension, browser extension, chrome extension, firefox extension, edge extension, opera extension, text analysis, word count plugin, browser plugin",
    canonical: "https://wordcounterplusapp.com/extension",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-background to-red-50/30 dark:from-red-950/20 dark:via-background dark:to-red-950/10 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Now Available on Chrome, Firefox & Edge!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-foreground px-2">
              Analyze Text Anywhere on the Web
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Install our powerful browser extension and analyze any text on any webpage with a simple right-click. Available now for Chrome, Firefox, Edge, Opera, and other browsers!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto mb-6 px-2 sm:px-0">
              {/* Chrome Extension Available */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-5 flex flex-col">
                <div className="flex items-start gap-2 sm:gap-3 text-left mb-4">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base leading-snug">
                      Chrome Extension Published!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Successfully published on Chrome Web Store. Install now for instant text analysis.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-auto text-xs sm:text-sm py-2 sm:py-2.5"
                  data-testid="button-install-chrome-extension"
                >
                  <a
                    href="https://chromewebstore.google.com/detail/djjfaiahpklmijflpfmpoamhbjcoimdi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <FaChrome className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">Install from Chrome Store</span>
                  </a>
                </Button>
              </div>

              {/* Firefox Extension Available */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-5 flex flex-col">
                <div className="flex items-start gap-2 sm:gap-3 text-left mb-4">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base leading-snug">
                      Firefox Extension Published!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Successfully published on Firefox Add-ons. Install now for instant text analysis.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-auto text-xs sm:text-sm py-2 sm:py-2.5"
                  data-testid="button-install-firefox-extension"
                >
                  <a
                    href="https://addons.mozilla.org/addon/word-counter-plus-app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <FaFirefox className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">Install from Firefox Add-ons</span>
                  </a>
                </Button>
              </div>

              {/* Edge Extension Available */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-5 flex flex-col">
                <div className="flex items-start gap-2 sm:gap-3 text-left mb-4">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base leading-snug">
                      Edge Extension Published!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Successfully published on Microsoft Edge Add-ons. Install now for instant text analysis.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-auto text-xs sm:text-sm py-2 sm:py-2.5"
                  data-testid="button-install-edge-extension"
                >
                  <a
                    href="https://microsoftedge.microsoft.com/addons/detail/word-counter-plus/mmiahndaehcmckhclkijlpfjpkbibhhm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <FaEdge className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">Install from Edge Add-ons</span>
                  </a>
                </Button>
              </div>

              {/* Opera Extension Available */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-5 flex flex-col sm:col-span-2 lg:col-span-1">
                <div className="flex items-start gap-2 sm:gap-3 text-left mb-4">
                  <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base leading-snug">
                      Opera Extension Published!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Available via Chrome Web Store. Opera users can install seamlessly.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-auto text-xs sm:text-sm py-2 sm:py-2.5"
                  data-testid="button-install-opera-extension"
                >
                  <a
                    href="https://chromewebstore.google.com/detail/djjfaiahpklmijflpfmpoamhbjcoimdi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <SiOpera className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">Install from Chrome Store</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-foreground"
            data-testid="text-features-heading"
          >
            Powerful Features at Your Fingertips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaMousePointer className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Context Menu Integration
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Right-click any selected text to instantly analyze it. No need
                to copy and paste.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaChartBar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Comprehensive Analysis
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Get word count, character count, sentences, paragraphs, and
                readability scores.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaClock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Reading & Speaking Time
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Estimated time to read or speak the text based on average
                speeds.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Privacy First
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                All processing happens locally on your device. No data is sent
                to servers.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaBolt className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Works Offline
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Lightweight and works completely offline. No internet connection
                required.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FaSave className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-foreground">
                Auto-Save
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Remembers your last analyzed text so you can pick up where you
                left off.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 text-foreground"
            data-testid="text-browser-stores-heading"
          >
            Available on Official Browser Stores
          </h2>
          <p className="text-center text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-4">
            Install Word Counter Plus extension from your browser's official store. Now available for Chrome, Firefox, Microsoft Edge, and all Chromium-based browsers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Chrome Web Store */}
            <Card className="p-4 sm:p-6 hover:shadow-xl transition-all border-primary/20 border-2 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <FaChrome className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  Chrome Web Store
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  For Chrome, Brave, Opera & other Chromium browsers
                </p>
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  <FaCheckCircle className="w-3 h-3" />
                  Available Now!
                </div>
              </div>

              <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4">
                Successfully published • Version 1.0.1
              </div>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-install-chrome"
              >
                <a
                  href="https://chromewebstore.google.com/detail/djjfaiahpklmijflpfmpoamhbjcoimdi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Install Extension
                </a>
              </Button>
            </Card>

            {/* Firefox Add-ons */}
            <Card className="p-4 sm:p-6 hover:shadow-xl transition-all border-primary/20 border-2 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <FaFirefox className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  Firefox Add-ons
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  Official Firefox extension store
                </p>
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  <FaCheckCircle className="w-3 h-3" />
                  Available Now!
                </div>
              </div>

              <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4">
                Successfully published • Version 1.0.1
              </div>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-install-firefox"
              >
                <a
                  href="https://addons.mozilla.org/addon/word-counter-plus-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Install Extension
                </a>
              </Button>
            </Card>

            {/* Microsoft Edge Add-ons */}
            <Card className="p-4 sm:p-6 hover:shadow-xl transition-all border-primary/20 border-2 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
              <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <FaEdge className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                  Edge Add-ons
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                  Microsoft Edge extension store
                </p>
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-500 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  <FaCheckCircle className="w-3 h-3" />
                  Available Now!
                </div>
              </div>

              <div className="text-center text-xs sm:text-sm text-muted-foreground mb-4">
                Successfully published • Version 1.0.1
              </div>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-install-edge"
              >
                <a
                  href="https://microsoftedge.microsoft.com/addons/detail/word-counter-plus/mmiahndaehcmckhclkijlpfjpkbibhhm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Install Extension
                </a>
              </Button>
            </Card>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg">
              ✓ Chrome, Firefox & Edge: Available Now &nbsp;|&nbsp; ✓ Safe and secure &nbsp;|&nbsp; ✓ Privacy-focused
            </p>
          </div>
        </div>
      </section>

      {/* Extension Features Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 text-foreground"
            data-testid="text-extension-features-heading"
          >
            Extension Features
          </h2>
          <p className="text-center text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Explore all the powerful features that will be available in the Word Counter Plus
            browser extension
          </p>

          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            {/* Analyze Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="order-2 lg:order-1 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium">Analyze Tab</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                  Real-Time Text Analysis
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Get instant comprehensive text statistics including word
                  count, character count, sentences, paragraphs, and lines. View
                  readability scores with difficulty levels and estimated
                  reading and speaking times.
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Detailed word and character statistics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Readability analysis with difficulty rating
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Reading and speaking time estimates
                    </span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src={
                    new URL(
                      "/images/extension-analyze-tab.png",
                      import.meta.url,
                    ).href
                  }
                  alt="Extension Analyze Tab showing text analysis features"
                  className="rounded-lg shadow-2xl border border-border w-full max-w-[700px] h-auto"
                  style={{ aspectRatio: "700/400" }}
                  data-testid="img-extension-analyze"
                />
              </div>
            </div>

            {/* Keywords Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="order-1 flex justify-center lg:justify-start">
                <img
                  src={
                    new URL(
                      "/images/extension-keywords-tab.png",
                      import.meta.url,
                    ).href
                  }
                  alt="Extension Keywords Tab showing keyword analysis"
                  className="rounded-lg shadow-2xl border border-border w-full max-w-[400px] h-auto"
                  style={{ aspectRatio: "400/600" }}
                  data-testid="img-extension-keywords"
                />
              </div>
              <div className="order-2 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium">Keywords Tab</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                  Keyword Analysis & Density
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Extract top keywords with frequency counts and check keyword
                  density for SEO optimization. See the most used words in your
                  text at a glance.
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Top keywords with frequency badges
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Keyword density checker tool
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">SEO optimization insights</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advanced Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="order-2 lg:order-1 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium">Advanced Tab</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                  Advanced Statistics
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Dive deeper with advanced metrics including unique word count,
                  longest and shortest words, average sentence length, and
                  visual word frequency charts.
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Unique words and vocabulary analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Word frequency visualization chart
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Duplicate words detection</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src={
                    new URL(
                      "/images/extension-advanced-tab.png",
                      import.meta.url,
                    ).href
                  }
                  alt="Extension Advanced Tab showing advanced statistics"
                  className="rounded-lg shadow-2xl border border-border w-full max-w-[400px] h-auto"
                  style={{ aspectRatio: "400/600" }}
                  data-testid="img-extension-advanced"
                />
              </div>
            </div>

            {/* Tools Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="order-1 flex justify-center lg:justify-start">
                <img
                  src={
                    new URL("/images/extension-tools-tab.png", import.meta.url)
                      .href
                  }
                  alt="Extension Tools Tab showing text transformation tools"
                  className="rounded-lg shadow-2xl border border-border w-full max-w-[400px] h-auto"
                  style={{ aspectRatio: "400/600" }}
                  data-testid="img-extension-tools"
                />
              </div>
              <div className="order-2 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium">Tools Tab</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                  Text Transformation Tools
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Transform your text with powerful tools for case conversion,
                  text cleanup, and manipulation. Perfect for formatting and
                  preparing content.
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Case converters (UPPERCASE, lowercase, Title Case,
                      Sentence case)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Text cleanup (remove spaces, line breaks, trim)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Text manipulation (reverse, sort, remove duplicates)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* History Tab */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div className="order-2 lg:order-1 px-2 sm:px-0">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium">History Tab</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                  Analysis History
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                  Keep track of all your text analyses with automatic history
                  saving. Quickly access previous analyses with timestamps and
                  word counts.
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Automatic analysis history tracking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Timestamp and word count previews
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      Quick access to past analyses
                    </span>
                  </li>
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <img
                  src={
                    new URL(
                      "/images/extension-history-tab.png",
                      import.meta.url,
                    ).href
                  }
                  alt="Extension History Tab showing analysis history"
                  className="rounded-lg shadow-2xl border border-border w-full max-w-[400px] h-auto"
                  style={{ aspectRatio: "400/600" }}
                  data-testid="img-extension-history"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-foreground"
            data-testid="text-usage-heading"
          >
            How to Use (Once Available)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-xl transition-all">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">
                Method 1: Context Menu
              </h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                Quickest way to analyze text on any webpage
              </p>
              <ol className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Select any text on any webpage
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Right-click the selected text
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Click "Analyze with Word Counter Plus"
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    View instant analysis in the popup
                  </span>
                </li>
              </ol>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8 border-border hover:shadow-xl transition-all">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">
                Method 2: Extension Popup
              </h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                Analyze custom text or saved content
              </p>
              <ol className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Click the extension icon in your toolbar
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Paste or type text in the textarea
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Click "Analyze Text" or wait for auto-analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    View detailed results
                  </span>
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-br from-red-50 via-background to-red-50/30 dark:from-red-950/20 dark:via-background dark:to-red-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
            Extension Launching Soon!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            We've submitted our extension to all major browser stores. 
            Check back soon to install it on your browser!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <div className="text-center bg-muted/50 px-4 sm:px-6 py-3 rounded-lg flex-1">
              <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500">
                <FaHourglass className="w-4 h-4" />
                <span className="font-semibold text-sm sm:text-base">Review in Progress</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">3-7 business days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
