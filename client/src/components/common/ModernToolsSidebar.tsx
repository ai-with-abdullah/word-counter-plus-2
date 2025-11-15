import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaCopy, 
  FaSync, 
  FaClock, 
  FaSort, 
  FaKey,
  FaQrcode,
  FaCode,
  FaSearch,
  FaRandom,
  FaAlignLeft,
  FaTrash,
  FaFileAlt
} from 'react-icons/fa';

// ===== TOOLS CONFIGURATION =====
// Add new tools here - they'll automatically appear in all sidebars

const ALL_TOOLS = [
  // ===== TEXT ANALYSIS TOOLS =====
  {
    href: "/",
    name: "Word Counter",
    description: "Analyze text length and readability",
    icon: FaCopy,
    category: "Text Analysis",
    popular: true,
    testId: "link-word-counter"
  },
  {
    href: "/character-counter",
    name: "Character Counter",
    description: "Count characters and spaces",
    icon: FaCopy,
    category: "Text Analysis", 
    testId: "link-character-counter"
  },
  
  // ===== TEXT TRANSFORM TOOLS =====
  {
    href: "/text-case-convert",
    name: "Case Converter", 
    description: "Transform text case formats",
    icon: FaSync,
    category: "Text Transform",
    popular: true,
    testId: "link-text-case-converter"
  }
];

interface ModernToolsSidebarProps {
  currentTool?: string;
  showPopularOnly?: boolean;
  maxItems?: number;
}

export default function ModernToolsSidebar({ 
  currentTool, 
  showPopularOnly = false, 
  maxItems = 8 
}: ModernToolsSidebarProps) {
  
  // Filter and limit tools
  let tools = ALL_TOOLS.filter(tool => tool.href !== currentTool);
  
  if (showPopularOnly) {
    tools = tools.filter(tool => tool.popular);
  }
  
  tools = tools.slice(0, maxItems);

  return (
    <div className="space-y-6">
      {/* Related Tools Section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <FaFileAlt className="h-4 w-4 text-primary" />
            </div>
            Related Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 text-left hover:bg-muted/50 transition-colors group"
                  data-testid={tool.testId}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-1.5 bg-muted rounded-md group-hover:bg-primary/10 transition-colors">
                      <IconComponent className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="font-medium text-sm truncate">
                          {tool.name}
                        </div>
                        {tool.popular && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-auto">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {tool.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
          
          {/* View All Tools Link */}
          <Link href="/tools">
            <Button
              variant="outline"
              size="sm" 
              className="w-full mt-3 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              data-testid="link-view-all-tools"
            >
              View All Tools →
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}