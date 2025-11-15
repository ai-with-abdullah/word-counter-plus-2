import { TextStats, ReadabilityStats, KeywordAnalysis } from './textAnalysis';
import { prepareDownload } from './downloadHelper';

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

  prepareDownload({
    content: csvContent,
    filename: 'word-analysis.csv',
    fileType: 'csv',
    mimeType: 'text/csv'
  });
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

  prepareDownload({
    content: txtContent,
    filename: 'word-analysis.txt',
    fileType: 'txt',
    mimeType: 'text/plain'
  });
}

export function exportPDF(data: ExportData): void {
  Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ])
    .then(async ([jsPDFModule, html2canvasModule]) => {
      const jsPDF = jsPDFModule.default;
      const html2canvas = html2canvasModule.default;

      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      const brandColor = { r: 220, g: 38, b: 38 };
      const lightGray = { r: 248, g: 248, b: 248 };
      const darkGray = { r: 60, g: 60, b: 60 };
      const borderGray = { r: 230, g: 230, b: 230 };
      
      const logoImg = new Image();
      logoImg.src = '/word-counter-plus-logo.png';
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });
      
      const addHeader = (pageNum: number) => {
        doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
        doc.rect(0, 0, pageWidth, 30, 'F');
        
        doc.setFillColor(255, 255, 255);
        doc.circle(margin + 7, 15, 7, 'F');
        
        try {
          doc.addImage(logoImg, 'PNG', margin + 3, 11, 8, 8);
        } catch (e) {
          console.log('Logo not loaded');
        }
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Word Counter Plus", margin + 17, 18.5);
        
        if (pageNum > 1) {
          doc.setFontSize(10);
          doc.text(`Page ${pageNum}`, pageWidth - margin, 18.5, { align: 'right' });
        }
      };
      
      const addFooter = (pageNum: number) => {
        const footerY = pageHeight - 15;
        doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setLineWidth(1);
        doc.line(margin, footerY, pageWidth - margin, footerY);
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text("www.wordcounterplusapp.com", margin, footerY + 8);
        doc.text(`Page ${pageNum}`, pageWidth - margin, footerY + 8, { align: 'right' });
      };

      let yPosition = 40;
      const lineHeight = 7;
      let pageNum = 1;
      
      addHeader(pageNum);
      
      doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
      doc.roundedRect(margin - 3, yPosition - 8, maxWidth + 6, 20, 3, 3, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("WORD COUNTER ANALYSIS REPORT", pageWidth / 2, yPosition + 2, { align: 'center' });
      
      yPosition += 20;
      
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.setLineWidth(0.5);
      
      const addSection = (title: string, items: string[], twoColumn = false) => {
        if (yPosition > pageHeight - 50) {
          addFooter(pageNum);
          doc.addPage();
          pageNum++;
          addHeader(pageNum);
          yPosition = 40;
        }
        
        doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
        doc.roundedRect(margin - 3, yPosition, maxWidth + 6, 12, 2, 2, 'F');
        
        doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setLineWidth(0.8);
        doc.line(margin - 3, yPosition + 12, pageWidth - margin + 3, yPosition + 12);
        
        doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, margin + 2, yPosition + 8);
        yPosition += 18;
        
        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        if (twoColumn) {
          const colWidth = (maxWidth - 15) / 2;
          let rowCount = 0;
          items.forEach((item, index) => {
            const col = index % 2;
            const xPos = margin + (col * (colWidth + 15));
            
            if (col === 0 && index > 0) {
              yPosition += lineHeight + 2;
              rowCount++;
            }
            
            if (yPosition > pageHeight - 50) {
              addFooter(pageNum);
              doc.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            const bgY = yPosition - 5;
            if (rowCount % 2 === 0) {
              doc.setFillColor(252, 252, 252);
              doc.rect(margin - 3, bgY, maxWidth + 6, lineHeight + 2, 'F');
            }
            
            doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
            doc.setFontSize(8);
            doc.text("●", xPos, yPosition);
            
            doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
            doc.setFontSize(10);
            doc.text(item, xPos + 4, yPosition);
          });
          yPosition += lineHeight + 8;
        } else {
          items.forEach((item, index) => {
            if (yPosition > pageHeight - 50) {
              addFooter(pageNum);
              doc.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            if (index % 2 === 0) {
              doc.setFillColor(252, 252, 252);
              doc.rect(margin - 3, yPosition - 5, maxWidth + 6, lineHeight + 2, 'F');
            }
            
            doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
            doc.setFontSize(8);
            doc.text("●", margin + 2, yPosition);
            
            doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
            doc.setFontSize(10);
            doc.text(item, margin + 6, yPosition);
            yPosition += lineHeight + 2;
          });
          yPosition += 5;
        }
      };
      
      const basicStats = [
        `Words: ${data.stats.wordCount}`,
        `Characters (with spaces): ${data.stats.charCount}`,
        `Characters (without spaces): ${data.stats.charNoSpaces}`,
        `Sentences: ${data.stats.sentenceCount}`,
        `Paragraphs: ${data.stats.paragraphCount}`,
        `Lines: ${data.text.split('\n').length}`,
        `Pages (est.): ${Math.ceil(data.stats.wordCount / 250) || 1}`,
        `Average Word Length: ${data.stats.avgWordLength} characters`,
      ];
      addSection("STATISTICS", basicStats, true);
      
      const readabilityStats = [
        `Reading Time: ${data.readability.readingTime} min`,
        `Speaking Time: ${data.readability.speakingTime} min`,
        `Average Sentence Length: ${Math.round(data.stats.wordCount / (data.stats.sentenceCount || 1))} words`,
        `Longest Word: ${data.stats.longestWord}`,
        `Shortest Word: ${data.stats.shortestWord}`,
      ];
      addSection("READING METRICS", readabilityStats);
      
      const readabilityScore = [
        `Flesch Reading Ease: ${data.readability.score} (${data.readability.level})`,
      ];
      addSection("READABILITY SCORES", readabilityScore);
      
      const keywords = data.keywords.single.slice(0, 10).map((k, i) => 
        `${i + 1}. ${k.keyword} (${k.count} times)`
      );
      if (keywords.length > 0) {
        addSection("TOP KEYWORDS", keywords);
      }
      
      if (yPosition > pageHeight - 90) {
        addFooter(pageNum);
        doc.addPage();
        pageNum++;
        addHeader(pageNum);
        yPosition = 50;
      }
      
      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      doc.roundedRect(margin - 3, yPosition, maxWidth + 6, 12, 2, 2, 'F');
      
      doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
      doc.setLineWidth(0.8);
      doc.line(margin - 3, yPosition + 12, pageWidth - margin + 3, yPosition + 12);
      
      doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("ORIGINAL TEXT", margin + 2, yPosition + 8);
      yPosition += 20;
      
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.setLineWidth(0.5);
      
      const textBoxStartY = yPosition;
      const textLines = doc.splitTextToSize(data.text, maxWidth - 8);
      const textBoxHeight = Math.min(textLines.length * 5 + 10, pageHeight - yPosition - 35);
      
      doc.roundedRect(margin - 3, textBoxStartY - 5, maxWidth + 6, textBoxHeight, 2, 2, 'FD');
      
      doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      textLines.forEach((line: string) => {
        if (yPosition > pageHeight - 40) {
          addFooter(pageNum);
          doc.addPage();
          pageNum++;
          addHeader(pageNum);
          yPosition = 40;
          
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
          doc.roundedRect(margin - 3, yPosition - 5, maxWidth + 6, pageHeight - yPosition - 30, 2, 2, 'FD');
        }
        doc.text(line, margin + 2, yPosition);
        yPosition += 5;
      });
      
      addFooter(pageNum);
      
      doc.save("word-counter-analysis.pdf");
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

export interface TextCompareData {
  text1: string;
  text2: string;
  additions: number;
  deletions: number;
  changes: number;
  similarity: number;
  chars1: number;
  chars2: number;
  words1: number;
  words2: number;
  diffResult: Array<{
    type: 'equal' | 'insert' | 'delete' | 'replace';
    value: string;
    oldValue?: string;
    newValue?: string;
  }>;
}

export function exportTextCompare(data: TextCompareData): void {
  const txtContent = `Text Comparison Report
Generated: ${new Date().toLocaleString()}

COMPARISON SUMMARY:
Similarity Score: ${data.similarity}%
Total Changes: ${data.additions + data.deletions + data.changes}
Additions: ${data.additions}
Deletions: ${data.deletions}
Replacements: ${data.changes}
Matching Segments: ${data.diffResult.filter(r => r.type === 'equal').length}

TEXT STATISTICS:
Original Words: ${data.words1}
Original Characters: ${data.chars1}
Modified Words: ${data.words2}
Modified Characters: ${data.chars2}
Word Difference: ${data.words2 - data.words1 >= 0 ? '+' : ''}${data.words2 - data.words1}
Character Difference: ${data.chars2 - data.chars1 >= 0 ? '+' : ''}${data.chars2 - data.chars1}

DETAILED COMPARISON:
${data.diffResult.map(diff => {
  if (diff.type === 'equal') return diff.value;
  if (diff.type === 'insert') return `+ ${diff.value}`;
  if (diff.type === 'delete') return `- ${diff.value}`;
  if (diff.type === 'replace') return `~ ${diff.oldValue} → ${diff.newValue}`;
  return '';
}).join('')}`;

  prepareDownload({
    content: txtContent,
    filename: 'text-comparison.pdf',
    fileType: 'pdf',
    mimeType: 'application/pdf',
    sourceToolId: 'text-compare'
  });
}

export function exportTextComparePDF(data: TextCompareData): void {
  Promise.all([
    import("jspdf"),
  ])
    .then(async ([jsPDFModule]) => {
      const jsPDF = jsPDFModule.default;

      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      
      const brandColor = { r: 220, g: 38, b: 38 };
      const lightGray = { r: 248, g: 248, b: 248 };
      const darkGray = { r: 60, g: 60, b: 60 };
      const borderGray = { r: 230, g: 230, b: 230 };
      const greenColor = { r: 34, g: 197, b: 94 };
      const redColor = { r: 239, g: 68, b: 68 };
      const yellowColor = { r: 234, g: 179, b: 8 };
      
      const logoImg = new Image();
      logoImg.src = '/word-counter-plus-logo.png';
      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });
      
      const addHeader = (pageNum: number) => {
        doc.setFillColor(brandColor.r, brandColor.g, brandColor.b);
        doc.rect(0, 0, pageWidth, 30, 'F');
        
        doc.setFillColor(255, 255, 255);
        doc.circle(margin + 7, 15, 7, 'F');
        
        try {
          doc.addImage(logoImg, 'PNG', margin + 3, 11, 8, 8);
        } catch (e) {
          console.log('Logo not loaded');
        }
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Word Counter Plus", margin + 17, 18.5);
        
        if (pageNum > 1) {
          doc.setFontSize(10);
          doc.text(`Page ${pageNum}`, pageWidth - margin, 18.5, { align: 'right' });
        }
      };
      
      const addFooter = (pageNum: number) => {
        const footerY = pageHeight - 15;
        doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setLineWidth(1);
        doc.line(margin, footerY, pageWidth - margin, footerY);
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.text("www.wordcounterplusapp.com", margin, footerY + 8);
        doc.text(`Page ${pageNum}`, pageWidth - margin, footerY + 8, { align: 'right' });
      };

      let yPosition = 40;
      const lineHeight = 7;
      let pageNum = 1;
      
      addHeader(pageNum);
      
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const timestamp = new Date().toLocaleString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      doc.text(`Generated: ${timestamp}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
      
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.setLineWidth(0.5);
      
      const addSection = (title: string, items: string[], twoColumn = false) => {
        if (yPosition > pageHeight - 50) {
          addFooter(pageNum);
          doc.addPage();
          pageNum++;
          addHeader(pageNum);
          yPosition = 40;
        }
        
        doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
        doc.roundedRect(margin - 3, yPosition, maxWidth + 6, 12, 2, 2, 'F');
        
        doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setLineWidth(0.8);
        doc.line(margin - 3, yPosition + 12, pageWidth - margin + 3, yPosition + 12);
        
        doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, margin + 2, yPosition + 8);
        yPosition += 18;
        
        doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        if (twoColumn) {
          const colWidth = (maxWidth - 15) / 2;
          let rowCount = 0;
          items.forEach((item, index) => {
            const col = index % 2;
            const xPos = margin + (col * (colWidth + 15));
            
            if (col === 0 && index > 0) {
              yPosition += lineHeight + 2;
              rowCount++;
            }
            
            if (yPosition > pageHeight - 50) {
              addFooter(pageNum);
              doc.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            const bgY = yPosition - 5;
            if (rowCount % 2 === 0) {
              doc.setFillColor(252, 252, 252);
              doc.rect(margin - 3, bgY, maxWidth + 6, lineHeight + 2, 'F');
            }
            
            doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
            doc.setFontSize(8);
            doc.text("●", xPos, yPosition);
            
            doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
            doc.setFontSize(10);
            doc.text(item, xPos + 4, yPosition);
          });
          yPosition += lineHeight + 8;
        } else {
          items.forEach((item, index) => {
            if (yPosition > pageHeight - 50) {
              addFooter(pageNum);
              doc.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            if (index % 2 === 0) {
              doc.setFillColor(252, 252, 252);
              doc.rect(margin - 3, yPosition - 5, maxWidth + 6, lineHeight + 2, 'F');
            }
            
            doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
            doc.setFontSize(8);
            doc.text("●", margin + 2, yPosition);
            
            doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
            doc.setFontSize(10);
            doc.text(item, margin + 6, yPosition);
            yPosition += lineHeight + 2;
          });
          yPosition += 5;
        }
      };
      
      const comparisonStats = [
        `Similarity Score: ${data.similarity}%`,
        `Total Changes: ${data.additions + data.deletions + data.changes}`,
        `Additions: ${data.additions}`,
        `Deletions: ${data.deletions}`,
        `Replacements: ${data.changes}`,
        `Matching Segments: ${data.diffResult.filter(r => r.type === 'equal').length}`,
      ];
      addSection("COMPARISON SUMMARY", comparisonStats, true);
      
      const textStats = [
        `Original Words: ${data.words1}`,
        `Original Characters: ${data.chars1}`,
        `Modified Words: ${data.words2}`,
        `Modified Characters: ${data.chars2}`,
        `Word Difference: ${data.words2 - data.words1 >= 0 ? '+' : ''}${data.words2 - data.words1}`,
        `Character Difference: ${data.chars2 - data.chars1 >= 0 ? '+' : ''}${data.chars2 - data.chars1}`,
      ];
      addSection("TEXT STATISTICS", textStats, true);
      
      if (yPosition > pageHeight - 90) {
        addFooter(pageNum);
        doc.addPage();
        pageNum++;
        addHeader(pageNum);
        yPosition = 50;
      }
      
      doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
      doc.roundedRect(margin - 3, yPosition, maxWidth + 6, 12, 2, 2, 'F');
      
      doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
      doc.setLineWidth(0.8);
      doc.line(margin - 3, yPosition + 12, pageWidth - margin + 3, yPosition + 12);
      
      doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("DETAILED COMPARISON", margin + 2, yPosition + 8);
      yPosition += 20;
      
      const textBoxStartY = yPosition;
      let comparisonText = '';
      
      data.diffResult.forEach((diff) => {
        let prefix = '';
        let displayText = '';
        
        if (diff.type === 'equal') {
          displayText = diff.value;
        } else if (diff.type === 'insert') {
          displayText = diff.value;
          prefix = '+ ';
        } else if (diff.type === 'delete') {
          displayText = diff.value;
          prefix = '- ';
        } else if (diff.type === 'replace') {
          displayText = `${diff.oldValue} → ${diff.newValue}`;
          prefix = '~ ';
        }
        
        comparisonText += prefix + displayText;
      });
      
      const textLines = doc.splitTextToSize(comparisonText, maxWidth - 8);
      const textBoxHeight = Math.min(textLines.length * 5 + 10, pageHeight - yPosition - 35);
      
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin - 3, textBoxStartY - 5, maxWidth + 6, textBoxHeight, 2, 2, 'FD');
      
      doc.setTextColor(darkGray.r, darkGray.g, darkGray.b);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      textLines.forEach((line: string) => {
        if (yPosition > pageHeight - 40) {
          addFooter(pageNum);
          doc.addPage();
          pageNum++;
          addHeader(pageNum);
          yPosition = 40;
          
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(borderGray.r, borderGray.g, borderGray.b);
          doc.roundedRect(margin - 3, yPosition - 5, maxWidth + 6, pageHeight - yPosition - 30, 2, 2, 'FD');
        }
        doc.text(line, margin + 2, yPosition);
        yPosition += 5;
      });
      
      addFooter(pageNum);
      
      doc.save("text-comparison.pdf");
    })
    .catch(() => {
      alert("Unable to generate PDF. Please try the TXT export option.");
    });
}

