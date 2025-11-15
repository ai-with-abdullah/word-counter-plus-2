import useSEO from '@/hooks/useSEO';

export default function Terms() {
  useSEO({
    title: "Terms of Service | Word Counter Plus",
    description: "Read the terms of service for Word Counter Plus website and browser extension. Learn about acceptable use, service availability, and user rights for our text analysis platform.",
    keywords: "terms of service, terms and conditions, user agreement, word counter terms, text analysis terms, acceptable use policy, extension terms",
    canonical: "https://wordcounterplusapp.com/terms",
    ogImage: "/og-image.png",
    ogType: "website"
  });


  return (
    <main className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our <strong>word counter and text analysis tool</strong>. 
              By using Word Counter Plus (website or browser extension), you agree to these terms of service.
            </p>
          </div>
          <div className="prose prose-gray max-w-none text-muted-foreground space-y-6">
            <p className="mb-4"><strong>Last updated:</strong> October 16, 2025</p>
            
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
              <p className="mb-4">By accessing and using Word Counter Plus (including our website and browser extension), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.</p>
            </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Services Provided</h2>
            <p className="mb-4">Word Counter Plus offers two main services:</p>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Web Application:</strong> A browser-based text analysis tool accessible at wordcounterplusapp.com</li>
              <li><strong>Browser Extension:</strong> A Chrome extension that allows you to analyze text on any webpage through context menus</li>
            </ul>
            <p className="mb-4">Both services are provided free of charge for personal and commercial use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Use of Service</h2>
            <p className="mb-4">You may use our <strong>word counter and text analysis tool</strong> to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Analyze text for word count, character count, readability, and keyword density</li>
              <li>Transform text (uppercase, lowercase, title case, etc.)</li>
              <li>Export analysis results for your projects</li>
              <li>Save analysis history locally on your device (extension only)</li>
              <li>Share results on social media platforms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Browser Extension Terms</h2>
            <p className="mb-4">When using our browser extension:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>You grant permission for the extension to access selected text on webpages when you explicitly trigger the analysis</li>
              <li>The extension will store your last 10 text analyses locally in your browser for history purposes</li>
              <li>You can remove all extension data by uninstalling the extension or clearing browser storage</li>
              <li>The extension requires "contextMenus" and "storage" permissions to function properly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Acceptable Use</h2>
            <p className="mb-4">You agree not to use this service to:</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Process illegal, harmful, or inappropriate content</li>
              <li>Attempt to reverse engineer or extract our algorithms</li>
              <li>Overload our systems with automated requests</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Accuracy Disclaimer</h2>
            <p className="mb-4">While we strive for accuracy, we make no warranties about the precision of our analysis results. Results should be verified for critical applications. Readability scores and keyword analysis are estimates based on standard algorithms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Privacy and Data</h2>
            <p className="mb-4">Your text content is processed entirely in your browser and is never transmitted to our servers. We do not store, log, or have access to your content. Learn more in our <a href="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Service Availability</h2>
            <p className="mb-4">We aim to provide uninterrupted service but cannot guarantee 100% uptime. The service is provided "as is" without warranties of any kind.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p className="mb-4">In no event shall Word Counter Plus be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Intellectual Property</h2>
            <p className="mb-4">The Word Counter Plus tool, interface, and algorithms are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our code without permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Modifications</h2>
            <p className="mb-4">We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the service constitutes acceptance of modified terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Governing Law</h2>
            <p className="mb-4">These terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Information</h2>
            <p className="mb-4">For questions about these terms, please <a href="/contact" className="text-primary hover:text-primary/80">contact us</a> through our contact form.</p>
          </section>
        </div>
        </div>
      </main>
  );
}
