import useSEO from '@/hooks/useSEO';

export default function Cookies() {
  useSEO({
    title: "Cookie Policy | Word Counter Plus",
    description: "Learn about our cookie policy for Word Counter Plus. We only use essential cookies for functionality and analytics. Understand how we handle cookies and your privacy.",
    keywords: "cookie policy, cookies usage, data tracking, privacy cookies, website cookies, analytics cookies, essential cookies",
    canonical: "https://wordcounterplusapp.com/cookies",
    ogImage: "/og-image.png",
    ogType: "website"
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This policy explains how <strong>Word Counter Plus</strong> uses cookies and similar technologies 
            to enhance your experience on our text analysis platform.
          </p>
        </div>
        
        <div className="prose prose-gray max-w-none text-muted-foreground space-y-6">
          <p className="mb-4"><strong>Last updated:</strong> September 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              analyzing how you use our word counter and text analysis tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Cookies</h2>
            <p className="mb-4">Word Counter Plus uses cookies for the following purposes:</p>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
            <p className="mb-4">These cookies are necessary for the website to function properly:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Theme Preferences:</strong> Remember your dark/light mode selection</li>
              <li><strong>Text Auto-Save:</strong> Temporarily store your text to prevent data loss</li>
              <li><strong>Settings:</strong> Remember your word limit preferences and tool configurations</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Cookies</h3>
            <p className="mb-4">We use third-party analytics services to understand website usage:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and website performance</li>
              <li><strong>Usage Statistics:</strong> Helps us improve our text analysis features</li>
              <li><strong>Performance Monitoring:</strong> Identifies technical issues and loading times</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-2">Advertising Cookies</h3>
            <p className="mb-4">When applicable, we may use advertising services:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Google AdSense:</strong> May set cookies to display relevant advertisements</li>
              <li><strong>Ad Personalization:</strong> Helps show content relevant to your interests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Session Cookies</h4>
                <p>Temporary cookies that expire when you close your browser. Used for essential functionality.</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Persistent Cookies</h4>
                <p>Remain on your device for a set period. Used to remember your preferences across visits.</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Third-Party Cookies</h4>
                <p>Set by external services like Google Analytics and advertising partners.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Managing Your Cookie Preferences</h2>
            <p className="mb-4">You have several options to manage cookies:</p>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">Browser Settings</h3>
            <p className="mb-4">Most browsers allow you to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>View and delete cookies</li>
              <li>Block all cookies or only third-party cookies</li>
              <li>Notify you when cookies are set</li>
              <li>Create exceptions for specific websites</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mb-2">Third-Party Opt-Out</h3>
            <p className="mb-4">You can opt out of specific third-party services:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Google Analytics:</strong> Use the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Google Ads:</strong> Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">Google Ad Settings</a> to control personalization</li>
            </ul>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Blocking essential cookies may affect the functionality of our word counter tool, 
                including the inability to save your preferences or automatically restore your text.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Protection and Privacy</h2>
            <p className="mb-4">
              While we use cookies for analytics and functionality, your actual text content is never stored in cookies 
              or transmitted to our servers. All text analysis happens locally in your browser. 
              Learn more in our <a href="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this cookie policy from time to time to reflect changes in our practices or applicable laws. 
              Any changes will be posted on this page with an updated date. We encourage you to review this policy 
              periodically to stay informed about how we use cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our cookie policy or how we handle cookies on Word Counter Plus, 
              please <a href="/contact" className="text-primary hover:text-primary/80">contact us</a> through our contact form. 
              We're here to help clarify any concerns about your privacy and cookie preferences.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}