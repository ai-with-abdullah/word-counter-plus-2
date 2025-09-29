import { Link } from 'wouter';
import useSEO from '@/hooks/useSEO';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getToolsData } from '@/data/toolsConfig';
import { useEffect } from 'react';

export default function Tools() {
  // Ensure page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get tools data from configuration - merge all tools together
  const allTools = getToolsData();

  // Enhanced structured data for Tools collection (only available tools)
  const availableTools = allTools.filter(tool => !tool.isComingSoon);
  const toolsCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Text Analysis Tools Collection - Word Counter Plus",
    "description": "Professional text analysis, word counting, and text processing tools for writers, content creators, and students.",
    "url": "https://wordcounterplusapp.com/tools",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": availableTools.length,
      "itemListElement": availableTools.map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.title,
        "description": tool.description,
        "url": tool.isExternal ? tool.href : `https://wordcounterplusapp.com${tool.href}`,
        "applicationCategory": "Productivity",
        "operatingSystem": "Web Browser",
        "isAccessibleForFree": true,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://wordcounterplusapp.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://wordcounterplusapp.com/tools"
        }
      ]
    }
  };

  useSEO({
    title: 'Text Analysis Tools - Word Counter Plus',
    description: 'Professional text analysis and processing tools including word counter, character counter, and text case converter for writers and students.',
    keywords: 'text tools, word counter, character counter, text case converter, text analysis, writing tools',
    canonical: 'https://wordcounterplusapp.com/tools',
    structuredData: toolsCollectionSchema,
    breadcrumbs: [
      { name: "Home", url: "https://wordcounterplusapp.com" },
      { name: "Tools", url: "https://wordcounterplusapp.com/tools" }
    ]
  });

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Text Analysis Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional text analysis and processing tools for writers, students, and content creators.
            </p>
          </div>

          {/* All Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {allTools.map((tool) => {
              const IconComponent = tool.icon;
              const isComingSoon = tool.isComingSoon;
              
              const cardContent = (
                <Card className={`aspect-square group transition-all duration-300 bg-card border border-border rounded-lg overflow-hidden ${
                  isComingSoon 
                    ? 'opacity-75 cursor-default' 
                    : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer hover:border-primary/30'
                }`}>
                  <CardHeader className="text-center p-4 h-full flex flex-col justify-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-3">
                      <div className={`p-3 rounded-lg ${
                        isComingSoon 
                          ? 'bg-muted' 
                          : 'bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'
                      }`}>
                        <IconComponent className={`text-2xl ${
                          isComingSoon 
                            ? 'text-muted-foreground' 
                            : 'text-primary group-hover:scale-105 transition-transform duration-300'
                        }`} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <CardTitle className={`text-sm font-bold mb-2 leading-tight ${
                      isComingSoon 
                        ? 'text-muted-foreground' 
                        : 'text-foreground group-hover:text-primary transition-colors duration-300'
                    }`}>
                      {tool.title}
                    </CardTitle>
                    
                    {/* Description */}
                    <CardDescription className={`text-xs leading-tight line-clamp-3 ${
                      isComingSoon 
                        ? 'text-muted-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );

              // Only make clickable if not coming soon
              if (isComingSoon) {
                return (
                  <div key={tool.id} data-testid={`tool-${tool.id}`}>
                    {cardContent}
                  </div>
                );
              }

              // Use external link for cross-domain navigation, internal Link for same-domain
              if (tool.isExternal) {
                return (
                  <a 
                    key={tool.id} 
                    href={tool.href} 
                    data-testid={`link-tool-${tool.id}`}
                    rel="noopener noreferrer"
                  >
                    {cardContent}
                  </a>
                );
              } else {
                return (
                  <Link key={tool.id} href={tool.href} data-testid={`link-tool-${tool.id}`}>
                    {cardContent}
                  </Link>
                );
              }
            })}
          </div>


          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Need a Specific Tool?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Let us know what text processing tool would help your workflow.
            </p>
            <Link href="/contact" data-testid="link-request-tool-cta">
              <div className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Request a Tool
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}