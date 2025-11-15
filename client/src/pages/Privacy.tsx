import useSEO from '@/hooks/useSEO';

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | Word Counter Plus",
    description: "Learn about Word Counter Plus privacy policy for our website and browser extension. Your text data is processed locally and never stored on our servers. Complete privacy protection.",
    keywords: "privacy policy, data protection, text privacy, local processing, no data storage, browser based tool, extension privacy",
    canonical: "https://wordcounterplusapp.com/privacy",
    ogImage: "/og-image.png",
    ogType: "website"
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about how Word Counter Plus protects your privacy. Your text data is processed locally and never stored on our servers for our <strong>word counter and text analysis tool</strong>.
          </p>
        </div>
        <div className="prose prose-gray max-w-none text-muted-foreground space-y-6">
          <p className="mb-4"><strong>Last updated:</strong> October 16, 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Overview</h2>
            <p className="mb-4">Word Counter Plus is available both as a web application and as a browser extension. This privacy policy applies to both services. We are committed to protecting your privacy and ensuring your text content remains completely private.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <p className="mb-4">We do not collect, store, or process any of your text content on our servers. All analysis is performed locally in your browser or extension using JavaScript. Your content never leaves your device.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Browser Extension Privacy</h2>
            <p className="mb-4">Our browser extension enhances your text analysis experience with additional features:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Text Selection:</strong> When you right-click selected text and choose "Analyze with Word Counter Plus," the text is processed locally within the extension</li>
              <li><strong>Local History:</strong> The extension saves your last 10 analyzed texts in Chrome's local storage on your device for your convenience</li>
              <li><strong>No Server Communication:</strong> The extension never sends your text content to any external servers</li>
              <li><strong>Permissions:</strong> We only request the minimum permissions needed (context menus and local storage)</li>
            </ul>
            <p className="mb-4">All extension data is stored locally on your device and can be removed by uninstalling the extension or clearing your browser data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Website Local Storage</h2>
            <p className="mb-4">On our website, we use browser local storage to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Save your dark/light mode preference</li>
              <li>Auto-save your text to prevent data loss</li>
              <li>Remember your word limit settings</li>
            </ul>
            <p className="mb-4">This data is stored only on your device and can be cleared at any time through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Services</h2>
            <p className="mb-4">This website may use the following third-party services:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Google Analytics:</strong> For understanding website usage and improving our service</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
              <li><strong>Google Fonts:</strong> For loading custom fonts</li>
            </ul>
            <p className="mb-4">These services have their own privacy policies and may collect anonymous usage data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
            <p className="mb-4">We do not set any first-party cookies. Third-party services mentioned above may set their own cookies as per their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
            <p className="mb-4">Since we don't collect or store your content, there's no risk of your text being compromised. All processing happens in your browser's secure environment.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Children's Privacy</h2>
            <p className="mb-4">Our service is suitable for all ages. We don't knowingly collect personal information from children or anyone else.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
            <p className="mb-4">We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p className="mb-4">If you have any questions about this privacy policy, please <a href="/contact" className="text-primary hover:text-primary/80">contact us</a> through our contact form.</p>
          </section>
        </div>
        </div>
      </main>
  );
}
