import { TextStats, ReadabilityStats, KeywordAnalysis } from '@/lib/textAnalysis';
import { exportPDF, exportCSV, exportTXT, copyResultsToClipboard, shareOnSocial } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonsProps {
  text: string;
  stats: TextStats;
  readability: ReadabilityStats;
  keywords: KeywordAnalysis;
}

export default function ExportButtons({ text, stats, readability, keywords }: ExportButtonsProps) {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    const data = {
      text,
      stats,
      readability,
      keywords,
      timestamp: new Date().toISOString()
    };

    switch (format) {
      case 'pdf':
        exportPDF(data);
        break;
      case 'csv':
        exportCSV(data);
        toast({
          title: "Export Complete",
          description: "Your analysis has been exported as CSV file.",
        });
        break;
      case 'txt':
        exportTXT(data);
        toast({
          title: "Export Complete", 
          description: "Your analysis has been exported as TXT file.",
        });
        break;
    }
  };

  const handleCopy = async () => {
    try {
      await copyResultsToClipboard(stats, readability);
      toast({
        title: "Copied!",
        description: "Results copied to clipboard successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    shareOnSocial(platform, stats, readability);
  };

  const buttons = [
    { id: 'pdf', icon: 'fas fa-file-pdf', label: 'PDF', color: 'text-red-500', action: () => handleExport('pdf') },
    { id: 'csv', icon: 'fas fa-file-csv', label: 'CSV', color: 'text-green-500', action: () => handleExport('csv') },
    { id: 'txt', icon: 'fas fa-file-alt', label: 'TXT', color: 'text-blue-500', action: () => handleExport('txt') },
    { id: 'copy', icon: 'fas fa-copy', label: 'Copy', color: 'text-purple-500', action: handleCopy },
    { id: 'twitter', icon: 'fab fa-twitter', label: 'Twitter', color: 'text-blue-400', action: () => handleShare('twitter') },
    { id: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn', color: 'text-blue-600', action: () => handleShare('linkedin') },
    { id: 'facebook', icon: 'fab fa-facebook', label: 'Facebook', color: 'text-blue-500', action: () => handleShare('facebook') },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={button.action}
          className="flex flex-col items-center p-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors"
          data-testid={`button-${button.id}`}
        >
          <i className={`${button.icon} text-xl ${button.color} mb-1`}></i>
          <span className="text-xs text-center">{button.label}</span>
        </button>
      ))}
    </div>
  );
}
