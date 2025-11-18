import ComparisonTemplate from './ComparisonTemplate';

export default function VsGrammarly() {
  return (
    <ComparisonTemplate
      competitorName="Grammarly"
      competitorUrl="https://www.grammarly.com"
      metaTitle="Word Counter Plus vs Grammarly - Free Alternative Comparison 2025"
      metaDescription="Compare Word Counter Plus vs Grammarly word counter features. Find out which tool offers better value for word counting, plagiarism detection, and text analysis."
      canonical="https://wordcounterplusapp.com/vs-grammarly"
      heading="Word Counter Plus vs Grammarly Word Counter"
      introduction="Grammarly is primarily a grammar checking tool with word counting as a secondary feature. Word Counter Plus is purpose-built for comprehensive text analysis with word counting, plagiarism detection, readability scoring, and SEO optimization - all completely free."
      features={[
        { name: "Real-time Word Count", us: true, competitor: true },
        { name: "Character Count", us: true, competitor: true },
        { name: "Basic Grammar Check", us: true, competitor: "Free (Limited)" },
        { name: "Advanced Grammar Check", us: false, competitor: "Premium Only" },
        { name: "Plagiarism Checker", us: "Free", competitor: "Premium Only ($30/mo)" },
        { name: "Readability Score", us: "Free (Multiple algorithms)", competitor: "Premium Only" },
        { name: "SEO Content Analysis", us: true, competitor: false },
        { name: "Keyword Density", us: true, competitor: false },
        { name: "Word Frequency Counter", us: true, competitor: false },
        { name: "Export to PDF/CSV/TXT", us: true, competitor: "Limited" },
        { name: "No Account Required", us: true, competitor: false },
        { name: "Privacy (No Data Storage)", us: true, competitor: "Stores Your Data" },
        { name: "Dark Mode", us: true, competitor: true },
        { name: "Cost for Full Features", us: "Free", competitor: "$30/month" }
      ]}
      pricing={{
        us: "100% Free - All features forever",
        competitor: "Free (basic) / $12/mo (Premium) / $30/mo (Business with plagiarism)"
      }}
      pros={{
        us: [
          "Completely free plagiarism checker",
          "Free readability analysis",
          "SEO optimization tools included",
          "No account registration needed",
          "Your data stays private",
          "All features free forever",
          "Purpose-built for text analysis"
        ],
        competitor: [
          "Advanced grammar checking (Premium)",
          "Browser extension available",
          "Large user base and integration with many platforms",
          "AI writing suggestions (Premium)"
        ]
      }}
      cons={{
        us: [
          "Grammar checking not as advanced as Grammarly Premium"
        ],
        competitor: [
          "Plagiarism checker requires $30/month subscription",
          "Readability features behind paywall",
          "Stores your text data on their servers",
          "Free version very limited",
          "Word counter is a secondary feature",
          "No SEO analysis tools"
        ]
      }}
      conclusion="If you primarily need word counting, plagiarism detection, and text analysis, Word Counter Plus offers these features completely free. Grammarly excels at grammar correction but charges $30/month for plagiarism checking alone. For students and writers on a budget who need comprehensive text analysis tools, Word Counter Plus is the smarter choice."
    />
  );
}
