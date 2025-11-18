import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import useSEO from '@/hooks/useSEO';

interface Feature {
  name: string;
  us: boolean | string;
  competitor: boolean | string;
}

interface ComparisonProps {
  competitorName: string;
  competitorUrl: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  heading: string;
  introduction: string;
  features: Feature[];
  pricing: {
    us: string;
    competitor: string;
  };
  pros: {
    us: string[];
    competitor: string[];
  };
  cons: {
    us: string[];
    competitor: string[];
  };
  conclusion: string;
}

export default function ComparisonTemplate({
  competitorName,
  competitorUrl,
  metaTitle,
  metaDescription,
  canonical,
  heading,
  introduction,
  features,
  pricing,
  pros,
  cons,
  conclusion
}: ComparisonProps) {
  useSEO({
    title: metaTitle,
    description: metaDescription,
    canonical: canonical
  });

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 dark:text-green-400" data-testid="icon-check" />
      ) : (
        <X className="w-5 h-5 text-red-600 dark:text-red-400" data-testid="icon-cross" />
      );
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-heading">
            {heading}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {introduction}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/">
              <Button data-testid="button-try-free">
                Try Word Counter Plus Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" asChild data-testid="button-visit-competitor">
              <a href={competitorUrl} target="_blank" rel="noopener noreferrer">
                Visit {competitorName}
              </a>
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle data-testid="text-features-comparison">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Feature</th>
                    <th className="text-center py-3 px-2 font-semibold">Word Counter Plus</th>
                    <th className="text-center py-3 px-2 font-semibold">{competitorName}</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b" data-testid={`row-feature-${index}`}>
                      <td className="py-3 px-2 font-medium">{feature.name}</td>
                      <td className="py-3 px-2 text-center">{renderValue(feature.us)}</td>
                      <td className="py-3 px-2 text-center">{renderValue(feature.competitor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-pricing-title">Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Word Counter Plus</h3>
                  <p className="text-muted-foreground">{pricing.us}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{competitorName}</h3>
                  <p className="text-muted-foreground">{pricing.competitor}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle data-testid="text-pros-cons-title">Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Word Counter Plus</h3>
                  <ul className="space-y-1 text-sm">
                    {pros.us.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                  {cons.us.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-3 mb-2 text-red-600 dark:text-red-400">Cons</h4>
                      <ul className="space-y-1 text-sm">
                        {cons.us.map((con, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle data-testid="text-conclusion-title">Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{conclusion}</p>
            <Link href="/">
              <Button data-testid="button-get-started">
                Get Started with Word Counter Plus - Free Forever
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
