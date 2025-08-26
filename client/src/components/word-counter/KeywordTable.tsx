import { KeywordData } from '@/lib/textAnalysis';

interface KeywordTableProps {
  title: string;
  keywords: KeywordData[];
}

export default function KeywordTable({ title, keywords }: KeywordTableProps) {
  return (
    <div>
      <h4 className="font-semibold text-foreground mb-3">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground">Keyword</th>
              <th className="text-right py-2 text-muted-foreground">Count</th>
              <th className="text-right py-2 text-muted-foreground">%</th>
            </tr>
          </thead>
          <tbody data-testid={`table-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {keywords.slice(0, 5).map((item, index) => (
              <tr key={index} className="border-b border-border">
                <td className="py-2">{item.keyword}</td>
                <td className="text-right py-2">{item.count}</td>
                <td className="text-right py-2">{item.percentage}%</td>
              </tr>
            ))}
            {keywords.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-muted-foreground">
                  No keywords found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
