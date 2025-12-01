import { Link } from 'wouter';
import { getCurrentOrigin } from '@/lib/site';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = getCurrentOrigin();

  // Generate JSON-LD structured data for breadcrumbs
  // Note: Last item should NOT have 'item' property (it's the current page)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const isLast = index === items.length - 1;
      const listItem: Record<string, any> = {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name
      };
      // Only include 'item' URL for non-last items
      if (!isLast) {
        listItem.item = `${baseUrl}${item.href}`;
      }
      return listItem;
    })
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2 flex-wrap gap-1">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index < items.length - 1 ? (
                <>
                  <Link href={item.href}>
                    <span className="hover:text-primary transition-colors">
                      {item.name}
                    </span>
                  </Link>
                  <span className="mx-2 text-muted-foreground/60">/</span>
                </>
              ) : (
                <span className="text-foreground font-medium">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* JSON-LD Structured Data */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}