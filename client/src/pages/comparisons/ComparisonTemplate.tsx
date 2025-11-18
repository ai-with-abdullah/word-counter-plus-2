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
        <div className="flex justify-center">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" data-testid="icon-check" />
        </div>
      ) : (
        <div className="flex justify-center">
          <X className="w-5 h-5 text-red-600 dark:text-red-400" data-testid="icon-cross" />
        </div>
      );
    }
    return (
      <div className="flex justify-center">
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" data-testid="text-heading">
            {heading}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
            {introduction}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Link href="/">
              <Button className="w-full sm:w-auto" data-testid="button-try-free">
                Try Word Counter Plus Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" asChild className="w-full sm:w-auto" data-testid="button-visit-competitor">
              <a href={competitorUrl} target="_blank" rel="noopener noreferrer">
                Visit {competitorName}
              </a>
            </Button>
          </div>
        </div>

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl" data-testid="text-features-comparison">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base">Feature</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base w-[140px] sm:w-[180px]">
                      <div className="flex justify-center">Word Counter Plus</div>
                    </th>
                    <th className="py-3 px-3 sm:px-4 font-semibold text-sm sm:text-base w-[140px] sm:w-[180px]">
                      <div className="flex justify-center">{competitorName}</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b last:border-b-0" data-testid={`row-feature-${index}`}>
                      <td className="py-3 px-3 sm:px-4 font-medium text-sm sm:text-base">{feature.name}</td>
                      <td className="py-3 px-3 sm:px-4">{renderValue(feature.us)}</td>
                      <td className="py-3 px-3 sm:px-4">{renderValue(feature.competitor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl" data-testid="text-pricing-title">Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Word Counter Plus</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{pricing.us}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">{competitorName}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">{pricing.competitor}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl" data-testid="text-pros-cons-title">Pros & Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400 text-sm sm:text-base">Word Counter Plus</h3>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    {pros.us.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                  {cons.us.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-3 mb-2 text-red-600 dark:text-red-400 text-sm sm:text-base">Cons</h4>
                      <ul className="space-y-1 text-xs sm:text-sm">
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

        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl" data-testid="text-conclusion-title">Conclusion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">{conclusion}</p>
            <Link href="/">
              <Button className="w-full sm:w-auto" data-testid="button-get-started">
                Get Started with Word Counter Plus - Free Forever
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
