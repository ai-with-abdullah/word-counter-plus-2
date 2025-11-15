import useSEO from '@/hooks/useSEO';

export default function Disclaimer() {
  useSEO({
    title: "Disclaimer | Word Counter Plus",
    description: "Important disclaimer for Word Counter Plus word counter and text analysis tool. Learn about service limitations, accuracy notes, and user responsibilities.",
    keywords: "disclaimer, accuracy disclaimer, text analysis limitations, word counter disclaimer, service terms, liability disclaimer",
    canonical: "https://wordcounterplusapp.com/disclaimer",
    ogImage: "/og-image.png",
    ogType: "website"
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Disclaimer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Important information about the limitations and proper use of our <strong>word counter and text analysis tool</strong>. 
            Please read this disclaimer carefully before using Word Counter Plus.
          </p>
        </div>
        <div className="prose prose-gray max-w-none text-muted-foreground space-y-6">
          <p className="mb-4"><strong>Last updated:</strong> January 2025</p>
          
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">General Information</h2>
            <p className="mb-4">
              Word Counter Plus is provided as a free online tool for educational and professional purposes. 
              The information and analysis results provided by this tool are for general guidance only and should not be considered as professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Accuracy of Results</h2>
            <p className="mb-4">
              While we strive to provide accurate word counting and text analysis results, we cannot guarantee 100% accuracy in all cases. The analysis algorithms are based on standard industry practices, but results may vary depending on:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Text formatting and special characters</li>
              <li>Different language structures and conventions</li>
              <li>Varying definitions of words, sentences, and paragraphs</li>
              <li>Complex punctuation and formatting elements</li>
            </ul>
            <p className="mb-4">
              Users should verify results for critical applications and consider multiple sources for important content decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Readability Scores</h2>
            <p className="mb-4">
              Our readability analysis uses established algorithms such as the Flesch-Kincaid formula. However, these scores are estimates and may not reflect the actual readability for all audiences. Factors that may affect accuracy include:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Subject matter complexity</li>
              <li>Target audience expertise level</li>
              <li>Cultural and linguistic variations</li>
              <li>Technical or specialized terminology</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Keyword Density Analysis</h2>
            <p className="mb-4">
              Keyword density calculations are provided for SEO and content optimization purposes. These results should be used as guidelines only and not as definitive SEO recommendations. Search engine algorithms are complex and consider many factors beyond keyword density.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Export Features</h2>
            <p className="mb-4">
              PDF, CSV, and TXT export features are provided for convenience. The formatting and compatibility of exported files may vary across different software applications and versions. Users should verify exported content before using it in critical applications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Browser Compatibility</h2>
            <p className="mb-4">
              Word Counter Plus is designed to work with modern web browsers. Some features may not function properly in older browsers or with disabled JavaScript. For the best experience, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">User Responsibility</h2>
            <p className="mb-4">
              Users are responsible for:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Verifying the appropriateness of content being analyzed</li>
              <li>Ensuring compliance with applicable laws and regulations</li>
              <li>Protecting their own intellectual property and confidential information</li>
              <li>Using the tool in accordance with our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">No Professional Advice</h2>
            <p className="mb-4">
              Word Counter Plus does not provide professional writing, editing, legal, or business advice. The tool is designed to assist with text analysis but should not replace professional consultation when needed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Content</h2>
            <p className="mb-4">
              Users are solely responsible for the content they analyze using our tool. We do not monitor, review, or endorse any content processed through our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Updates and Changes</h2>
            <p className="mb-4">
              We may update our analysis algorithms and features without notice. Results from different versions of the tool may vary. We recommend checking for updates regularly if you rely on our tool for ongoing projects.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Warranty</h2>
            <p className="mb-4">
              Word Counter Plus is provided "as is" without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Information</h2>
            <p className="mb-4">
              If you have questions about this disclaimer or need clarification about our tool's capabilities, please <a href="/contact" className="text-primary hover:text-primary/80">contact us</a> through our contact form.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}