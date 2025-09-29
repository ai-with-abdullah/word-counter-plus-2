import { TextStats, ReadabilityStats, KeywordAnalysis } from './textAnalysis';

export interface ExportData {
  text: string;
  stats: TextStats;
  readability: ReadabilityStats;
  keywords: KeywordAnalysis;
  timestamp: string;
}

export function exportCSV(data: ExportData): void {
  const csvContent = [
    ['Metric', 'Value'],
    ['Word Count', data.stats.wordCount.toString()],
    ['Character Count', data.stats.charCount.toString()],
    ['Character Count (No Spaces)', data.stats.charNoSpaces.toString()],
    ['Sentence Count', data.stats.sentenceCount.toString()],
    ['Paragraph Count', data.stats.paragraphCount.toString()],
    ['Average Word Length', data.stats.avgWordLength.toString()],
    ['Longest Word', data.stats.longestWord],
    ['Shortest Word', data.stats.shortestWord],
    ['Readability Score', data.readability.score.toString()],
    ['Reading Time (minutes)', data.readability.readingTime.toString()],
    ['Speaking Time (minutes)', data.readability.speakingTime.toString()]
  ].map(row => row.join(',')).join('\n');

  downloadFile(csvContent, 'word-analysis.csv', 'text/csv');
}

export function exportTXT(data: ExportData): void {
  const txtContent = `Word Analysis Report
Generated: ${new Date().toLocaleString()}

=== BASIC STATISTICS ===
Word Count: ${data.stats.wordCount}
Character Count: ${data.stats.charCount}
Character Count (No Spaces): ${data.stats.charNoSpaces}
Sentence Count: ${data.stats.sentenceCount}
Paragraph Count: ${data.stats.paragraphCount}
Average Word Length: ${data.stats.avgWordLength}
Longest Word: ${data.stats.longestWord}
Shortest Word: ${data.stats.shortestWord}

=== READABILITY ANALYSIS ===
Flesch-Kincaid Score: ${data.readability.score}
Estimated Reading Time: ${data.readability.readingTime} minutes
Estimated Speaking Time: ${data.readability.speakingTime} minutes

=== TOP KEYWORDS ===
${data.keywords.single.slice(0, 5).map(k => `${k.keyword}: ${k.count} (${k.percentage}%)`).join('\n')}

=== ORIGINAL TEXT ===
${data.text}`;

  downloadFile(txtContent, 'word-analysis.txt', 'text/plain');
}

export function exportPDF(data: ExportData): void {
  // Import jsPDF اور html2canvas dynamically
  Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ])
    .then(([jsPDFModule, html2canvasModule]) => {
      const jsPDF = jsPDFModule.default;
      const html2canvas = html2canvasModule.default;

      const doc = new jsPDF();

      // Layout settings
      let yPosition = 20;
      const lineHeight = 10;
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Word Analysis Report", margin, yPosition);
      yPosition += lineHeight * 2;

      // Date
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
      yPosition += lineHeight * 2;

      // Basic Statistics
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("BASIC STATISTICS", margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const basicStats = [
        `Word Count: ${data.stats.wordCount}`,
        `Character Count: ${data.stats.charCount}`,
        `Character Count (No Spaces): ${data.stats.charNoSpaces}`,
        `Sentence Count: ${data.stats.sentenceCount}`,
        `Paragraph Count: ${data.stats.paragraphCount}`,
        `Average Word Length: ${data.stats.avgWordLength}`,
        `Longest Word: ${data.stats.longestWord}`,
        `Shortest Word: ${data.stats.shortestWord}`,
      ];

      basicStats.forEach(stat => {
        yPosition += lineHeight;
        doc.text(stat, margin, yPosition);
      });

      yPosition += lineHeight * 2;

      // Readability Analysis
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("READABILITY ANALYSIS", margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const readabilityStats = [
        `Flesch-Kincaid Score: ${data.readability.score}`,
        `Estimated Reading Time: ${data.readability.readingTime} minutes`,
        `Estimated Speaking Time: ${data.readability.speakingTime} minutes`,
      ];

      readabilityStats.forEach(stat => {
        yPosition += lineHeight;
        doc.text(stat, margin, yPosition);
      });

      yPosition += lineHeight * 2;

      // Top Keywords
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("TOP KEYWORDS", margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      data.keywords.single.slice(0, 5).forEach(keyword => {
        yPosition += lineHeight;
        doc.text(`${keyword.keyword}: ${keyword.count} (${keyword.percentage}%)`, margin, yPosition);
      });

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      } else {
        yPosition += lineHeight * 2;
      }

      // Original Text
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("ORIGINAL TEXT", margin, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const textLines = doc.splitTextToSize(
        data.text.substring(0, 2000) + (data.text.length > 2000 ? "..." : ""),
        maxWidth
      );

      textLines.forEach((line: string) => {
        yPosition += lineHeight;
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
      });

      // Save the PDF
      doc.save("word-analysis.pdf");
    })
    .catch(() => {
      alert("Unable to generate PDF. Please try the TXT export option.");
    });
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyResultsToClipboard(stats: TextStats, readability: ReadabilityStats): Promise<void> {
  const results = `Word Count: ${stats.wordCount}
Character Count: ${stats.charCount}
Readability Score: ${readability.score} (${readability.level})
Reading Time: ${readability.readingTime} minutes`;

  try {
    await navigator.clipboard.writeText(results);
  } catch (err) {
    console.log('Copy not supported');
    throw new Error('Copy to clipboard not supported');
  }
}

