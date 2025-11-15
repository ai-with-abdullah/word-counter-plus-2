import { TextStats, ReadabilityStats, KeywordAnalysis } from '@/lib/textAnalysis';
import { exportPDF, exportCSV, exportTXT, copyResultsToClipboard } from '@/lib/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { 
  FaFilePdf, 
  FaFileCsv, 
  FaFileAlt, 
  FaCopy 
} from 'react-icons/fa';

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


  const buttons = [
    { id: 'pdf', Icon: FaFilePdf, label: 'PDF', color: 'text-red-500', action: () => handleExport('pdf') },
    { id: 'csv', Icon: FaFileCsv, label: 'CSV', color: 'text-green-500', action: () => handleExport('csv') },
    { id: 'txt', Icon: FaFileAlt, label: 'TXT', color: 'text-blue-500', action: () => handleExport('txt') },
    { id: 'copy', Icon: FaCopy, label: 'Copy', color: 'text-purple-500', action: handleCopy },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {buttons.map((button) => {
        const IconComponent = button.Icon;
        return (
          <button
            key={button.id}
            onClick={button.action}
            className="flex flex-col items-center p-3 bg-accent hover:bg-accent/80 rounded-lg transition-colors hover:scale-105 transform duration-200"
            data-testid={`button-${button.id}`}
          >
            <IconComponent className={`text-xl ${button.color} mb-1`} />
            <span className="text-xs text-center">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
}
