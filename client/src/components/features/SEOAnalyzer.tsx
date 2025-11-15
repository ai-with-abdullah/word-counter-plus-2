import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, Search, Globe, Target } from 'lucide-react';

interface SEOAnalyzerProps {
  text: string;
  title?: string;
  metaDescription?: string;
}

export default function SEOAnalyzer({ text, title = '', metaDescription = '' }: SEOAnalyzerProps) {
  const analyzeSEO = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // Focus keyword analysis
    const keywordDensities = getKeywordDensities(words);
    const topKeywords = keywordDensities.slice(0, 5);
    
    // Content analysis
    const wordCount = words.length;
    const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
    
    // SEO recommendations
    const recommendations = [];
    let seoScore = 0;
    
    // Word count check
    if (wordCount >= 300) {
      seoScore += 20;
    } else {
      recommendations.push({
        type: 'error',
        title: 'Word Count Too Low',
        description: `Content has ${wordCount} words. Aim for 300+ words for better SEO.`,
        priority: 'high'
      });
    }
    
    // Title analysis
    if (title.length >= 30 && title.length <= 60) {
      seoScore += 15;
    } else {
      recommendations.push({
        type: 'warning',
        title: 'Title Length Issue',
        description: `Title should be 30-60 characters. Current: ${title.length}`,
        priority: 'medium'
      });
    }
    
    // Meta description analysis
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      seoScore += 15;
    } else {
      recommendations.push({
        type: 'warning',
        title: 'Meta Description Issue',
        description: `Meta description should be 120-160 characters. Current: ${metaDescription.length}`,
        priority: 'medium'
      });
    }
    
    // Keyword density check
    const hasOptimalKeywordDensity = topKeywords.some(k => k.density >= 1 && k.density <= 3);
    if (hasOptimalKeywordDensity) {
      seoScore += 20;
    } else {
      recommendations.push({
        type: 'warning',
        title: 'Keyword Density',
        description: 'Consider having 1-3% density for main keywords.',
        priority: 'medium'
      });
    }
    
    // Readability check
    if (avgSentenceLength <= 20) {
      seoScore += 15;
    } else {
      recommendations.push({
        type: 'warning',
        title: 'Sentence Length',
        description: 'Keep sentences under 20 words for better readability.',
        priority: 'low'
      });
    }
    
    // Heading structure check
    const hasHeadings = text.includes('#') || /<h[1-6]>/i.test(text);
    if (hasHeadings) {
      seoScore += 15;
    } else {
      recommendations.push({
        type: 'error',
        title: 'Missing Headings',
        description: 'Add headings (H1, H2, H3) to improve content structure.',
        priority: 'high'
      });
    }
    
    return {
      seoScore,
      topKeywords,
      recommendations,
      wordCount,
      avgSentenceLength: Math.round(avgSentenceLength)
    };
  };

  const getKeywordDensities = (words: string[]) => {
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
    ]);

    const wordCounts: { [key: string]: number } = {};
    const totalWords = words.length;

    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 2) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    return Object.entries(wordCounts)
      .map(([word, count]) => ({
        word,
        count,
        density: Number(((count / totalWords) * 100).toFixed(2))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const seoData = analyzeSEO();

  return (
    <div className="space-y-6">
      {/* SEO Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>SEO Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall SEO Score</span>
              <Badge className={`${getScoreColor(seoData.seoScore)} border-0`}>
                {seoData.seoScore}/100
              </Badge>
            </div>
            <Progress value={seoData.seoScore} className="h-3" aria-label="Overall SEO Score progress" />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{seoData.wordCount}</p>
                <p className="text-sm text-gray-600">Words</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{seoData.avgSentenceLength}</p>
                <p className="text-sm text-gray-600">Avg. Sentence Length</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Keyword Density</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seoData.topKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{keyword.word}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{keyword.count}x</span>
                  <Badge 
                    variant={keyword.density >= 1 && keyword.density <= 3 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {keyword.density}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>SEO Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {seoData.recommendations.length === 0 ? (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-600 font-medium">Great! No SEO issues found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {seoData.recommendations.map((rec, index) => (
                <div key={index} className="flex space-x-3 p-3 rounded-lg border">
                  {getRecommendationIcon(rec.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {rec.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick SEO Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Include focus keywords in title and first 100 words</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Use headings (H1, H2, H3) to structure content</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Keep sentences under 20 words for readability</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Aim for 300+ words for substantial content</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Maintain 1-3% keyword density for main terms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}