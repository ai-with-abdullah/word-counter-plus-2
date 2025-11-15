import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import jsPDF from 'jspdf';
import { 
  FaDownload, 
  FaFileAlt, 
  FaFilePdf, 
  FaFileCsv, 
  FaCheckCircle, 
  FaArrowLeft,
  FaEdit,
  FaGoogleDrive,
  FaDropbox,
  FaCloud,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import { SiBox } from 'react-icons/si';
import { useToast } from '@/hooks/use-toast';
import { getRelatedTools } from '@/lib/relatedTools';
import type { Tool } from '@/data/toolsConfig';

type FileFormat = 'pdf' | 'txt' | 'csv';

export default function Download() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [fileData, setFileData] = useState<{
    content: string;
    filename: string;
    fileType: string;
    mimeType: string;
    sourceToolId?: string;
  } | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FileFormat | null>('pdf');
  const [downloaded, setDownloaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [customFilename, setCustomFilename] = useState('');
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('downloadData');
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setFileData(data);
        setCustomFilename(data.filename.replace(/\.(txt|pdf|csv|docx)$/i, ''));
        
        if (data.sourceToolId) {
          const tools = getRelatedTools(data.sourceToolId, 4);
          setRelatedTools(tools);
        }
      } catch (error) {
        console.error('Error parsing download data:', error);
        toast({
          title: "Error",
          description: "Failed to load download data.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const getFileIcon = () => {
    if (selectedFormat === 'pdf') return <FaFilePdf className="w-12 h-12 text-primary" />;
    if (selectedFormat === 'csv') return <FaFileCsv className="w-12 h-12 text-primary" />;
    return <FaFileAlt className="w-12 h-12 text-primary" />;
  };

  const getFileSize = () => {
    if (!fileData) return '0 KB';
    const bytes = new Blob([fileData.content]).size;
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleDownload = async () => {
    if (!fileData) return;

    if (!selectedFormat) {
      toast({
        title: "Format Required",
        description: "Please choose a file format/extension before downloading.",
        variant: "destructive"
      });
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);

    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      let finalFilename = customFilename || fileData.filename.replace(/\.(txt|pdf|csv|docx)$/i, '');
      
      if (selectedFormat === 'pdf') {
        finalFilename = finalFilename + '.pdf';
        
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        
        const parseContent = (content: string) => {
          const sections: any = { 
            stats: [], 
            readability: [], 
            readabilityScores: [], 
            keywords: [], 
            breakdown: [],
            formatting: [],
            quickReference: [],
            analysis: [],
            suggestions: [],
            comparisonSummary: [],
            textStatistics: [],
            detailedComparison: '',
            originalText: '' 
          };
          const lines = content.split('\n');
          let currentSection = '';
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.includes('COMPARISON SUMMARY:')) currentSection = 'comparisonSummary';
            else if (line.includes('TEXT STATISTICS:')) currentSection = 'textStatistics';
            else if (line.includes('DETAILED COMPARISON:')) { currentSection = 'detailedComparison'; continue; }
            else if (line.includes('STATISTICS:')) currentSection = 'stats';
            else if (line.includes('READING METRICS:')) currentSection = 'readability';
            else if (line.includes('READABILITY SCORES:')) currentSection = 'readabilityScores';
            else if (line.includes('TOP KEYWORDS:')) currentSection = 'keywords';
            else if (line.includes('LINE BREAKDOWN:') || line.includes('PARAGRAPH BREAKDOWN:')) currentSection = 'breakdown';
            else if (line.includes('FORMATTING SETTINGS:')) currentSection = 'formatting';
            else if (line.includes('QUICK REFERENCE:')) currentSection = 'quickReference';
            else if (line.includes('ANALYSIS:') || line.includes('RESUME ANALYSIS:') || line.includes('PLAGIARISM ANALYSIS:')) currentSection = 'analysis';
            else if (line.includes('SUGGESTIONS:') || line.includes('IMPROVEMENT SUGGESTIONS:') || line.includes('RECOMMENDATIONS:')) currentSection = 'suggestions';
            else if (line.includes('ORIGINAL TEXT:')) { currentSection = 'originalText'; continue; }
            else if (line.startsWith('===') || line.startsWith('---') || line.includes('Generated by') || 
                     line.includes('ANALYSIS REPORT') || line.includes('COUNTER ANALYSIS') || 
                     line.includes('CHECKER ANALYSIS') || line.includes('FREQUENCY ANALYSIS') ||
                     line.includes('CALCULATION REPORT') || line.includes('COMPARISON REPORT')) continue;
            else if (line && currentSection) {
              if (currentSection === 'originalText') {
                if (!line.match(/^\d+\//)) {
                  sections.originalText += line + '\n';
                }
              } else if (currentSection === 'detailedComparison') {
                sections.detailedComparison += line + ' ';
              } else if (currentSection === 'breakdown') {
                // Skip breakdown details for PDF (too detailed), but keep for TXT
                continue;
              } else if (!line.match(/^\d+\//)) {
                sections[currentSection].push(line);
              }
            }
          }
          return sections;
        };
        
        const sections = parseContent(fileData.content);
        
        // Check if content is structured (Word Counter format) or generic
        const isStructuredContent = sections.stats.length > 0 || sections.readability.length > 0 || sections.readabilityScores.length > 0 || sections.keywords.length > 0 || sections.formatting.length > 0 || sections.quickReference.length > 0 || sections.analysis.length > 0 || sections.suggestions.length > 0 || sections.comparisonSummary.length > 0 || sections.textStatistics.length > 0;
        
        const logoImg = new Image();
        logoImg.src = '/word-counter-plus-logo.png';
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
        });
        
        const addHeader = (pageNum: number) => {
          pdf.setFillColor(220, 38, 38);
          pdf.rect(0, 0, pageWidth, 30, 'F');
          
          pdf.setFillColor(255, 255, 255);
          pdf.circle(margin + 7, 15, 7, 'F');
          
          try {
            pdf.addImage(logoImg, 'PNG', margin + 3, 11, 8, 8);
          } catch (e) {
            console.log('Logo not loaded');
          }
          
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(18);
          pdf.setFont("helvetica", "bold");
          pdf.text("Word Counter Plus", margin + 17, 18.5);
          if (pageNum > 1) {
            pdf.setFontSize(10);
            pdf.text(`Page ${pageNum}`, pageWidth - margin, 18.5, { align: 'right' });
          }
        };
        
        const addFooter = (pageNum: number) => {
          const footerY = pageHeight - 15;
          pdf.setDrawColor(220, 38, 38);
          pdf.setLineWidth(1);
          pdf.line(margin, footerY, pageWidth - margin, footerY);
          pdf.setTextColor(100, 100, 100);
          pdf.setFontSize(8);
          pdf.text("www.wordcounterplusapp.com", margin, footerY + 8);
          pdf.text(`Page ${pageNum}`, pageWidth - margin, footerY + 8, { align: 'right' });
        };
        
        const addSection = (title: string, items: string[], icon: string, twoColumn = false) => {
          if (yPosition > pageHeight - 50) {
            addFooter(pageNum);
            pdf.addPage();
            pageNum++;
            addHeader(pageNum);
            yPosition = 40;
          }
          
          pdf.setFillColor(248, 248, 250);
          pdf.roundedRect(margin, yPosition, maxWidth, 10, 2, 2, 'F');
          pdf.setTextColor(220, 38, 38);
          pdf.setFontSize(12);
          pdf.setFont("helvetica", "bold");
          pdf.text(`${icon} ${title}`, margin + 3, yPosition + 7);
          yPosition += 15;
          
          pdf.setTextColor(40, 40, 40);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");
          
          if (twoColumn && items.length > 3) {
            const half = Math.ceil(items.length / 2);
            const leftCol = items.slice(0, half);
            const rightCol = items.slice(half);
            
            for (let i = 0; i < Math.max(leftCol.length, rightCol.length); i++) {
              if (yPosition > pageHeight - 30) {
                addFooter(pageNum);
                pdf.addPage();
                pageNum++;
                addHeader(pageNum);
                yPosition = 40;
              }
              
              if (leftCol[i]) pdf.text(`• ${leftCol[i]}`, margin + 3, yPosition);
              if (rightCol[i]) pdf.text(`• ${rightCol[i]}`, pageWidth / 2 + 5, yPosition);
              yPosition += 6;
            }
          } else {
            items.forEach(item => {
              if (yPosition > pageHeight - 30) {
                addFooter(pageNum);
                pdf.addPage();
                pageNum++;
                addHeader(pageNum);
                yPosition = 40;
              }
              pdf.text(`• ${item}`, margin + 3, yPosition);
              yPosition += 6;
            });
          }
          yPosition += 5;
        };

        let yPosition = 40;
        let pageNum = 1;
        
        addHeader(pageNum);
        
        
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;
        
        // Handle structured content (Word Counter format)
        if (isStructuredContent) {
          if (sections.comparisonSummary.length > 0) addSection("Comparison Summary", sections.comparisonSummary, "", true);
          if (sections.textStatistics.length > 0) addSection("Text Statistics", sections.textStatistics, "", true);
          if (sections.stats.length > 0) addSection("Statistics", sections.stats, "", true);
          if (sections.readability.length > 0) addSection("Reading Metrics", sections.readability, "");
          if (sections.readabilityScores.length > 0) addSection("Readability Score", sections.readabilityScores, "");
          if (sections.keywords.length > 0) addSection("Top Keywords", sections.keywords, "");
          if (sections.formatting.length > 0) addSection("Formatting Settings", sections.formatting, "");
          if (sections.quickReference.length > 0) addSection("Quick Reference", sections.quickReference, "");
          if (sections.analysis.length > 0) addSection("Analysis", sections.analysis, "");
          if (sections.suggestions.length > 0) addSection("Suggestions", sections.suggestions, "");
          
          if (sections.detailedComparison.trim()) {
            if (yPosition > pageHeight - 60) {
              addFooter(pageNum);
              pdf.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            pdf.setFillColor(248, 248, 250);
            pdf.roundedRect(margin, yPosition, maxWidth, 10, 2, 2, 'F');
            pdf.setTextColor(220, 38, 38);
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Detailed Comparison", margin + 3, yPosition + 7);
            yPosition += 15;
            
            yPosition += 5;
            
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "normal");
            const comparisonLines = pdf.splitTextToSize(sections.detailedComparison.trim(), maxWidth - 6);
            
            comparisonLines.forEach((line: string) => {
              if (yPosition > pageHeight - 25) {
                addFooter(pageNum);
                pdf.addPage();
                pageNum++;
                addHeader(pageNum);
                yPosition = 40;
              }
              pdf.text(line, margin + 3, yPosition);
              yPosition += 5;
            });
          }
          
          if (sections.originalText.trim()) {
            if (yPosition > pageHeight - 60) {
              addFooter(pageNum);
              pdf.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            
            pdf.setFillColor(248, 248, 250);
            pdf.roundedRect(margin, yPosition, maxWidth, 10, 2, 2, 'F');
            pdf.setTextColor(220, 38, 38);
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Original Text", margin + 3, yPosition + 7);
            yPosition += 15;
            
            yPosition += 5;
            
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "normal");
            const textLines = pdf.splitTextToSize(sections.originalText.trim(), maxWidth - 6);
            
            textLines.forEach((line: string) => {
              if (yPosition > pageHeight - 25) {
                addFooter(pageNum);
                pdf.addPage();
                pageNum++;
                addHeader(pageNum);
                yPosition = 40;
              }
              pdf.text(line, margin + 3, yPosition);
              yPosition += 5;
            });
          }
        } else {
          // Handle generic content (from other tools)
          yPosition += 5;
          
          pdf.setTextColor(40, 40, 40);
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "normal");
          const textLines = pdf.splitTextToSize(fileData.content.trim(), maxWidth - 6);
          
          textLines.forEach((line: string) => {
            if (yPosition > pageHeight - 25) {
              addFooter(pageNum);
              pdf.addPage();
              pageNum++;
              addHeader(pageNum);
              yPosition = 40;
            }
            pdf.text(line, margin + 3, yPosition);
            yPosition += 5;
          });
        }
        
        addFooter(pageNum);
        pdf.save(finalFilename);
      } else if (selectedFormat === 'txt') {
        finalFilename = finalFilename + '.txt';
        
        const parseContent = (content: string) => {
          const sections: any = { 
            stats: [], 
            readability: [], 
            readabilityScores: [], 
            keywords: [], 
            breakdown: [],
            formatting: [],
            quickReference: [],
            analysis: [],
            suggestions: [],
            originalText: '' 
          };
          const lines = content.split('\n');
          let currentSection = '';
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.includes('STATISTICS:')) currentSection = 'stats';
            else if (line.includes('READING METRICS:')) currentSection = 'readability';
            else if (line.includes('READABILITY SCORES:')) currentSection = 'readabilityScores';
            else if (line.includes('TOP KEYWORDS:')) currentSection = 'keywords';
            else if (line.includes('LINE BREAKDOWN:') || line.includes('PARAGRAPH BREAKDOWN:')) currentSection = 'breakdown';
            else if (line.includes('FORMATTING SETTINGS:')) currentSection = 'formatting';
            else if (line.includes('QUICK REFERENCE:')) currentSection = 'quickReference';
            else if (line.includes('ANALYSIS:') || line.includes('RESUME ANALYSIS:') || line.includes('PLAGIARISM ANALYSIS:')) currentSection = 'analysis';
            else if (line.includes('SUGGESTIONS:') || line.includes('IMPROVEMENT SUGGESTIONS:') || line.includes('RECOMMENDATIONS:')) currentSection = 'suggestions';
            else if (line.includes('ORIGINAL TEXT:')) { currentSection = 'originalText'; continue; }
            else if (line.startsWith('===') || line.startsWith('---') || line.includes('Generated by') || 
                     line.includes('ANALYSIS REPORT') || line.includes('COUNTER ANALYSIS') || 
                     line.includes('CHECKER ANALYSIS') || line.includes('FREQUENCY ANALYSIS') ||
                     line.includes('CALCULATION REPORT')) continue;
            else if (line && currentSection) {
              if (currentSection === 'originalText') {
                if (!line.match(/^\d+\//)) {
                  sections.originalText += line + '\n';
                }
              } else if (!line.match(/^\d+\//)) {
                sections[currentSection].push(line);
              }
            }
          }
          return sections;
        };
        
        const sections = parseContent(fileData.content);
        const isStructuredContent = sections.stats.length > 0 || sections.readability.length > 0 || sections.readabilityScores.length > 0 || sections.keywords.length > 0 || sections.formatting.length > 0 || sections.quickReference.length > 0 || sections.analysis.length > 0 || sections.suggestions.length > 0;
        
        let txtContent = '═══════════════════════════════════════════════════════════\n';
        txtContent += '                   WORD COUNTER PLUS                      \n';
        txtContent += '═══════════════════════════════════════════════════════════\n\n';
        txtContent += `Generated: ${new Date().toLocaleString()}\n\n`;
        
        if (isStructuredContent) {
          if (sections.stats.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  STATISTICS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.stats.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.readability.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  READING METRICS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.readability.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.readabilityScores.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  READABILITY SCORE\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.readabilityScores.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.keywords.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  TOP KEYWORDS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.keywords.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.formatting.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  FORMATTING SETTINGS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.formatting.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.quickReference.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  QUICK REFERENCE\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.quickReference.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.analysis.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  ANALYSIS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.analysis.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.suggestions.length > 0) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  SUGGESTIONS\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            sections.suggestions.forEach((item: string) => {
              txtContent += `  ${item}\n`;
            });
            txtContent += '\n';
          }
          
          if (sections.originalText.trim()) {
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += '  ORIGINAL TEXT\n';
            txtContent += '───────────────────────────────────────────────────────────\n';
            txtContent += sections.originalText.trim() + '\n\n';
          }
        } else {
          // Handle generic content
          txtContent += fileData.content.trim() + '\n\n';
        }
        
        txtContent += '═══════════════════════════════════════════════════════════\n';
        txtContent += '           www.wordcounterplusapp.com                     \n';
        txtContent += '═══════════════════════════════════════════════════════════\n';
        
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = finalFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (selectedFormat === 'csv') {
        finalFilename = finalFilename + '.csv';
        
        const parseContent = (content: string) => {
          const sections: any = { 
            stats: [], 
            readability: [], 
            readabilityScores: [], 
            keywords: [], 
            breakdown: [],
            formatting: [],
            quickReference: [],
            analysis: [],
            suggestions: [],
            originalText: '' 
          };
          const lines = content.split('\n');
          let currentSection = '';
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.includes('STATISTICS:')) currentSection = 'stats';
            else if (line.includes('READING METRICS:')) currentSection = 'readability';
            else if (line.includes('READABILITY SCORES:')) currentSection = 'readabilityScores';
            else if (line.includes('TOP KEYWORDS:')) currentSection = 'keywords';
            else if (line.includes('LINE BREAKDOWN:') || line.includes('PARAGRAPH BREAKDOWN:')) currentSection = 'breakdown';
            else if (line.includes('FORMATTING SETTINGS:')) currentSection = 'formatting';
            else if (line.includes('QUICK REFERENCE:')) currentSection = 'quickReference';
            else if (line.includes('ANALYSIS:') || line.includes('RESUME ANALYSIS:') || line.includes('PLAGIARISM ANALYSIS:')) currentSection = 'analysis';
            else if (line.includes('SUGGESTIONS:') || line.includes('IMPROVEMENT SUGGESTIONS:') || line.includes('RECOMMENDATIONS:')) currentSection = 'suggestions';
            else if (line.includes('ORIGINAL TEXT:')) { currentSection = 'originalText'; continue; }
            else if (line.startsWith('===') || line.startsWith('---') || line.includes('Generated by') || 
                     line.includes('ANALYSIS REPORT') || line.includes('COUNTER ANALYSIS') || 
                     line.includes('CHECKER ANALYSIS') || line.includes('FREQUENCY ANALYSIS') ||
                     line.includes('CALCULATION REPORT')) continue;
            else if (line && currentSection) {
              if (currentSection === 'originalText') {
                if (!line.match(/^\d+\//)) {
                  sections.originalText += line + ' ';
                }
              } else if (!line.match(/^\d+\//)) {
                sections[currentSection].push(line);
              }
            }
          }
          return sections;
        };
        
        const sections = parseContent(fileData.content);
        const isStructuredContent = sections.stats.length > 0 || sections.readability.length > 0 || sections.readabilityScores.length > 0 || sections.keywords.length > 0 || sections.formatting.length > 0 || sections.quickReference.length > 0 || sections.analysis.length > 0 || sections.suggestions.length > 0;
        
        let csvContent = 'Word Counter Plus - Analysis Report\n';
        csvContent += `Generated,${new Date().toLocaleString()}\n\n`;
        
        if (isStructuredContent) {
          if (sections.stats.length > 0) {
            csvContent += 'STATISTICS\n';
            csvContent += 'Metric,Value\n';
            sections.stats.forEach((item: string) => {
              const parts = item.split(':');
              if (parts.length === 2) {
                csvContent += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
              }
            });
            csvContent += '\n';
          }
          
          if (sections.readability.length > 0) {
            csvContent += 'READING METRICS\n';
            csvContent += 'Metric,Value\n';
            sections.readability.forEach((item: string) => {
              const parts = item.split(':');
              if (parts.length === 2) {
                csvContent += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
              }
            });
            csvContent += '\n';
          }
          
          if (sections.readabilityScores.length > 0) {
            csvContent += 'READABILITY SCORE\n';
            csvContent += 'Metric,Value\n';
            sections.readabilityScores.forEach((item: string) => {
              const parts = item.split(':');
              if (parts.length === 2) {
                csvContent += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
              }
            });
            csvContent += '\n';
          }
          
          if (sections.keywords.length > 0) {
            csvContent += 'TOP KEYWORDS\n';
            csvContent += 'Keyword,Frequency\n';
            sections.keywords.forEach((item: string) => {
              const parts = item.split('-');
              if (parts.length === 2) {
                csvContent += `"${parts[0].trim()}","${parts[1].trim()}"\n`;
              }
            });
            csvContent += '\n';
          }
          
          if (sections.originalText.trim()) {
            csvContent += 'ORIGINAL TEXT\n';
            csvContent += `"${sections.originalText.trim().replace(/"/g, '""')}"\n\n`;
          }
        } else {
          // Handle generic content
          csvContent += 'Content\n';
          csvContent += `"${fileData.content.trim().replace(/"/g, '""')}"\n\n`;
        }
        
        csvContent += 'Source,www.wordcounterplusapp.com\n';
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = finalFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      setDownloadProgress(100);
      setTimeout(() => {
        setDownloading(false);
        setDownloaded(true);

        toast({
          title: "Download Complete",
          description: `${finalFilename} has been downloaded successfully.`,
        });
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setDownloading(false);
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your file. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCloudSave = async (service: string) => {
    if (!fileData) return;

    if (!selectedFormat) {
      toast({
        title: "Format Required",
        description: "Please choose a file format/extension before saving to cloud.",
        variant: "destructive"
      });
      return;
    }

    let finalFilename = (customFilename || fileData.filename.replace(/\.(txt|pdf|csv|docx)$/i, '')) + `.${selectedFormat}`;
    const blob = new Blob([fileData.content], { type: fileData.mimeType });
    const file = new (File as any)([blob], finalFilename, { type: fileData.mimeType });

    if (service === 'Google Drive') {
      await handleGoogleDriveUpload(file);
    } else if (service === 'Dropbox') {
      await handleDropboxUpload(file);
    } else if (service === 'OneDrive') {
      await handleOneDriveUpload(file);
    } else if (service === 'Box') {
      await handleBoxUpload(file);
    }
  };

  const handleGoogleDriveUpload = async (file: File) => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com';
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    
    toast({
      title: "Google Drive Upload",
      description: "Opening Google Drive authentication window...",
    });

    try {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        (window as any).gapi.load('client:auth2:picker', async () => {
          await (window as any).gapi.client.init({
            apiKey: apiKey,
            clientId: clientId,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.file'
          });

          const authInstance = (window as any).gapi.auth2.getAuthInstance();
          await authInstance.signIn();
          
          const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
          
          const metadata = {
            name: file.name,
            mimeType: file.type
          };

          const form = new FormData();
          form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
          form.append('file', file);

          const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            body: form
          });

          if (response.ok) {
            toast({
              title: "Upload Successful",
              description: "File uploaded to Google Drive successfully!",
            });
            authInstance.signOut();
          } else {
            throw new Error('Upload failed');
          }
        });
      };
      document.body.appendChild(script);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to Google Drive. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDropboxUpload = async (file: File) => {
    toast({
      title: "Dropbox Upload",
      description: "Opening Dropbox file saver...",
    });

    try {
      const script = document.createElement('script');
      script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
      script.id = 'dropboxjs';
      script.setAttribute('data-app-key', import.meta.env.VITE_DROPBOX_APP_KEY || 'your_dropbox_app_key');
      
      script.onload = () => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          (window as any).Dropbox.save(content, file.name, {
            success: () => {
              toast({
                title: "Upload Successful",
                description: "File saved to Dropbox successfully!",
              });
            },
            error: (error: any) => {
              toast({
                title: "Upload Failed",
                description: "Failed to save to Dropbox. Please try again.",
                variant: "destructive"
              });
            }
          });
        };
        reader.readAsDataURL(file);
      };
      
      document.body.appendChild(script);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to Dropbox. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleOneDriveUpload = async (file: File) => {
    const clientId = import.meta.env.VITE_ONEDRIVE_CLIENT_ID || 'your_onedrive_client_id';
    
    toast({
      title: "OneDrive Upload",
      description: "Opening OneDrive authentication window...",
    });

    try {
      const redirectUri = encodeURIComponent(window.location.origin + '/download');
      const scope = encodeURIComponent('files.readwrite');
      const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
      
      const authWindow = window.open(authUrl, 'OneDrive Auth', 'width=600,height=700');
      
      const checkAuth = setInterval(() => {
        try {
          if (authWindow?.location.hash) {
            const hash = authWindow.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            
            if (accessToken) {
              clearInterval(checkAuth);
              authWindow.close();
              
              uploadToOneDrive(file, accessToken);
            }
          }
        } catch (e) {
        }
      }, 500);

      setTimeout(() => {
        clearInterval(checkAuth);
        if (authWindow && !authWindow.closed) {
          authWindow.close();
        }
      }, 60000);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to OneDrive. Please try again.",
        variant: "destructive"
      });
    }
  };

  const uploadToOneDrive = async (file: File, accessToken: string) => {
    try {
      const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': file.type
        },
        body: file
      });

      if (response.ok) {
        toast({
          title: "Upload Successful",
          description: "File uploaded to OneDrive successfully!",
        });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to OneDrive. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBoxUpload = async (file: File) => {
    const clientId = import.meta.env.VITE_BOX_CLIENT_ID || 'your_box_client_id';
    
    toast({
      title: "Box Upload",
      description: "Opening Box authentication window...",
    });

    try {
      const redirectUri = encodeURIComponent(window.location.origin + '/download');
      const authUrl = `https://account.box.com/api/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
      
      const authWindow = window.open(authUrl, 'Box Auth', 'width=600,height=700');
      
      const checkAuth = setInterval(() => {
        try {
          if (authWindow?.location.hash) {
            const hash = authWindow.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            
            if (accessToken) {
              clearInterval(checkAuth);
              authWindow.close();
              
              uploadToBox(file, accessToken);
            }
          }
        } catch (e) {
        }
      }, 500);

      setTimeout(() => {
        clearInterval(checkAuth);
        if (authWindow && !authWindow.closed) {
          authWindow.close();
        }
      }, 60000);
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to Box. Please try again.",
        variant: "destructive"
      });
    }
  };

  const uploadToBox = async (file: File, accessToken: string) => {
    try {
      const formData = new FormData();
      formData.append('attributes', JSON.stringify({ name: file.name, parent: { id: '0' } }));
      formData.append('file', file);

      const response = await fetch('https://upload.box.com/api/2.0/files/content', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (response.ok) {
        toast({
          title: "Upload Successful",
          description: "File uploaded to Box successfully!",
        });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload to Box. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSocialShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const siteUrl = window.location.origin;
    const shareText = 'Check out Word Counter Plus - Free text analysis tools for writers!';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (!fileData) {
    return (
      <div className="min-h-screen bg-background py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-sm border">
            <CardContent className="pt-8 pb-8 sm:pt-12 sm:pb-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <FaFileAlt className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground" />
                <h2 className="text-xl sm:text-2xl font-bold">No File to Download</h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md px-4">
                  No download data found. Please use one of our tools to generate a file first.
                </p>
                <Button
                  onClick={() => setLocation('/')}
                  size="lg"
                  className="mt-4 min-h-[48px]"
                  data-testid="button-go-home"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const hasRelatedTools = relatedTools.length > 0;

  return (
    <div className="min-h-screen bg-background py-4 sm:py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <Button
          onClick={() => setLocation('/')}
          variant="ghost"
          className="mb-4 sm:mb-6 min-h-[48px] sm:min-h-[44px]"
          data-testid="button-back-home"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          <span className="text-sm sm:text-base">Back</span>
        </Button>

        <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${hasRelatedTools ? 'lg:grid-cols-3' : ''}`}>
          <div className={`space-y-4 sm:space-y-6 ${hasRelatedTools ? 'lg:col-span-2' : ''}`}>
            <Card className="shadow-sm border">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-3">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2">
                    <FaDownload className="text-primary h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                    <span>Your File is Ready</span>
                  </CardTitle>
                  {downloaded && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm self-start sm:self-auto">
                      <FaCheckCircle className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Downloaded
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-5 sm:space-y-6 px-4 sm:px-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-muted/40 rounded-lg flex-shrink-0">
                    {getFileIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    {isEditingFilename ? (
                      <div className="flex gap-2">
                        <Input
                          value={customFilename}
                          onChange={(e) => setCustomFilename(e.target.value)}
                          className="flex-1 text-sm sm:text-base min-h-[48px] sm:min-h-[40px]"
                          data-testid="input-filename"
                        />
                        <Button
                          onClick={() => setIsEditingFilename(false)}
                          variant="outline"
                          size="icon"
                          className="flex-shrink-0 min-h-[48px] min-w-[48px] sm:min-h-[40px] sm:min-w-[40px]"
                          data-testid="button-save-filename"
                        >
                          <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold truncate" data-testid="text-filename">
                          {customFilename}
                        </h3>
                        <Button
                          onClick={() => setIsEditingFilename(true)}
                          variant="ghost"
                          size="icon"
                          className="min-h-[48px] min-w-[48px] sm:min-h-[36px] sm:min-w-[36px] flex-shrink-0"
                          data-testid="button-edit-filename"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      {selectedFormat && <Badge variant="outline" className="text-xs sm:text-sm">{selectedFormat.toUpperCase()}</Badge>}
                      <span className="text-xs sm:text-sm text-muted-foreground">{getFileSize()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm sm:text-base">Export As</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedFormat('pdf')}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        selectedFormat === 'pdf' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      data-testid="button-format-pdf"
                    >
                      <FaFilePdf className={`h-4 w-4 ${selectedFormat === 'pdf' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${selectedFormat === 'pdf' ? 'text-primary' : 'text-foreground'}`}>PDF</span>
                    </button>
                    <button
                      onClick={() => setSelectedFormat('txt')}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        selectedFormat === 'txt' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      data-testid="button-format-txt"
                    >
                      <FaFileAlt className={`h-4 w-4 ${selectedFormat === 'txt' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${selectedFormat === 'txt' ? 'text-primary' : 'text-foreground'}`}>TXT</span>
                    </button>
                    <button
                      onClick={() => setSelectedFormat('csv')}
                      className={`flex-1 px-4 py-2.5 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                        selectedFormat === 'csv' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      data-testid="button-format-csv"
                    >
                      <FaFileCsv className={`h-4 w-4 ${selectedFormat === 'csv' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${selectedFormat === 'csv' ? 'text-primary' : 'text-foreground'}`}>CSV</span>
                    </button>
                  </div>
                </div>

                {downloading && (
                  <div className="space-y-2">
                    <Progress value={downloadProgress} className="w-full h-2" />
                    <p className="text-xs sm:text-sm text-center text-muted-foreground">
                      Preparing... {downloadProgress}%
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  size="lg"
                  className="w-full text-sm sm:text-base min-h-[48px] sm:min-h-[44px]"
                  data-testid="button-download"
                >
                  <FaDownload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Download</span>
                </Button>

                <Separator />

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-sm sm:text-base">Save to Cloud</h4>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Button
                      onClick={() => handleCloudSave('Google Drive')}
                      variant="outline"
                      className="w-full justify-start text-xs sm:text-sm px-3 sm:px-4 min-h-[48px] sm:min-h-[44px]"
                      data-testid="button-save-google-drive"
                    >
                      <FaGoogleDrive className="mr-2 text-primary h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>Google Drive</span>
                    </Button>
                    <Button
                      onClick={() => handleCloudSave('Dropbox')}
                      variant="outline"
                      className="w-full justify-start text-xs sm:text-sm px-3 sm:px-4 min-h-[48px] sm:min-h-[44px]"
                      data-testid="button-save-dropbox"
                    >
                      <FaDropbox className="mr-2 text-primary h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>Dropbox</span>
                    </Button>
                    <Button
                      onClick={() => handleCloudSave('OneDrive')}
                      variant="outline"
                      className="w-full justify-start text-xs sm:text-sm px-3 sm:px-4 min-h-[48px] sm:min-h-[44px]"
                      data-testid="button-save-onedrive"
                    >
                      <FaCloud className="mr-2 text-primary h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>OneDrive</span>
                    </Button>
                    <Button
                      onClick={() => handleCloudSave('Box')}
                      variant="outline"
                      className="w-full justify-start text-xs sm:text-sm px-3 sm:px-4 min-h-[48px] sm:min-h-[44px]"
                      data-testid="button-save-box"
                    >
                      <SiBox className="mr-2 text-primary h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span>Box</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">Share Word Counter Plus</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Help others discover our free text analysis tools
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <Button
                    onClick={() => handleSocialShare('facebook')}
                    variant="outline"
                    className="w-full text-sm sm:text-base min-h-[48px] sm:min-h-[44px]"
                    data-testid="button-share-facebook"
                  >
                    <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                  </Button>
                  <Button
                    onClick={() => handleSocialShare('twitter')}
                    variant="outline"
                    className="w-full text-sm sm:text-base min-h-[48px] sm:min-h-[44px]"
                    data-testid="button-share-twitter"
                  >
                    <FaTwitter className="mr-2 h-5 w-5 text-sky-500" />
                    <span>Twitter</span>
                  </Button>
                  <Button
                    onClick={() => handleSocialShare('linkedin')}
                    variant="outline"
                    className="w-full text-sm sm:text-base min-h-[48px] sm:min-h-[44px]"
                    data-testid="button-share-linkedin"
                  >
                    <FaLinkedin className="mr-2 h-5 w-5 text-blue-700" />
                    <span>LinkedIn</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {hasRelatedTools && (
            <div className="lg:col-span-1">
              <Card className="shadow-sm border">
                <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg md:text-xl font-semibold">Related Tools</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Explore more text analysis tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 px-4 sm:px-6">
                  {relatedTools.map((tool) => {
                    const IconComponent = tool.icon;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        data-testid={`link-related-tool-${tool.id}`}
                      >
                        <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group min-h-[56px] sm:min-h-[64px]">
                          <div className="p-2 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors flex-shrink-0">
                            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                              {tool.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
