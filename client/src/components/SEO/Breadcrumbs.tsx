import { Link, useLocation } from 'wouter';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const [location] = useLocation();

  // Generate JSON-LD structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://wordcounterplusapp.com${item.href}`
    }))
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li key={item.href} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              {index < items.length - 1 ? (
                <>
                  <Link href={item.href}>
                    <span className="hover:text-primary transition-colors" itemProp="name">
                      {item.name}
                    </span>
                  </Link>
                  <meta itemProp="position" content={(index + 1).toString()} />
                  <span className="mx-2 text-muted-foreground/60">/</span>
                </>
              ) : (
                <>
                  <span className="text-foreground font-medium" itemProp="name">
                    {item.name}
                  </span>
                  <meta itemProp="position" content={(index + 1).toString()} />
                </>
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