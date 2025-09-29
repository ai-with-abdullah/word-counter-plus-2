import { Link } from 'wouter';
import { FaCopy, FaSync, FaClock, FaSort, FaCheck } from "@/components/common/Icons";

interface RelatedToolsSidebarProps {
  currentTool?: string; // To highlight the current tool or exclude it from the list
}

export default function RelatedToolsSidebar({ currentTool }: RelatedToolsSidebarProps) {
  // Define all related tools with their metadata
  const relatedTools = [
    {
      href: "/",
      name: "Word Counter",
      description: "Count words & analyze text",
      icon: FaCopy,
      iconColor: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      testId: "link-word-counter"
    },
    {
      href: "/character-counter",
      name: "Character Counter",
      description: "Count characters & spaces",
      icon: FaCopy,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      testId: "link-character-counter"
    },
    {
      href: "/text-case-convert",
      name: "Case Converter",
      description: "Change text case format",
      icon: FaSync,
      iconColor: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      testId: "link-text-case-converter"
    }
  ];

  // Filter out the current tool from both lists
  const filteredRelatedTools = relatedTools.filter(tool => tool.href !== currentTool);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Related Tools */}
      <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Related Tools</h3>
        <div className="grid grid-cols-1 gap-3">
          {filteredRelatedTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link 
                key={tool.href}
                href={tool.href} 
                className="group flex items-center p-3 bg-muted/50 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary" 
                data-testid={tool.testId}
                aria-label={`Go to ${tool.name} tool`}
              >
                <div className={`w-10 h-10 ${tool.bgColor} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className={`${tool.iconColor} text-lg`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <Link 
            href="/tools" 
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center py-2 hover:bg-primary/5 rounded focus-visible:ring-2 focus-visible:ring-primary" 
            data-testid="link-more-tools"
          >
            More Text Tools →
          </Link>
        </div>
      </div>
    </div>
  );
}