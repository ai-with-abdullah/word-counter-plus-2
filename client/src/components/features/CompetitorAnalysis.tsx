import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Users, Zap, Award, BarChart3 } from 'lucide-react';

interface CompetitorAnalysisProps {
  text: string;
  wordCount: number;
  readabilityScore: number;
}

export default function CompetitorAnalysis({ text, wordCount, readabilityScore }: CompetitorAnalysisProps) {
  // Simulated competitor data for demonstration
  const competitorBenchmarks = {
    averageWordCount: 1250,
    averageReadability: 65,
    topPerformingLength: { min: 1500, max: 2500 },
    industryStandards: {
      blogPost: { min: 1000, max: 2000 },
      article: { min: 1500, max: 3000 },
      socialPost: { min: 100, max: 280 },
      productDescription: { min: 150, max: 500 }
    }
  };

  const analyzeCompetitiveness = () => {
    let competitiveScore = 0;
    const analysis = [];

    // Word count comparison
    const wordCountScore = Math.min((wordCount / competitorBenchmarks.averageWordCount) * 100, 100);
    competitiveScore += wordCountScore * 0.3;

    if (wordCount >= competitorBenchmarks.topPerformingLength.min) {
      analysis.push({
        metric: 'Content Length',
        status: 'excellent',
        message: 'Your content length is competitive with top performers',
        score: 95
      });
    } else if (wordCount >= competitorBenchmarks.averageWordCount * 0.8) {
      analysis.push({
        metric: 'Content Length',
        status: 'good',
        message: 'Content length is above average but could be expanded',
        score: 75
      });
    } else {
      analysis.push({
        metric: 'Content Length',
        status: 'needs_improvement',
        message: 'Content is shorter than competitor average',
        score: 45
      });
    }

    // Readability comparison
    const readabilityDiff = readabilityScore - competitorBenchmarks.averageReadability;
    competitiveScore += Math.min(Math.max(readabilityDiff + 50, 0), 100) * 0.4;

    if (readabilityScore >= 70) {
      analysis.push({
        metric: 'Readability',
        status: 'excellent',
        message: 'Excellent readability score beats most competitors',
        score: 90
      });
    } else if (readabilityScore >= competitorBenchmarks.averageReadability) {
      analysis.push({
        metric: 'Readability',
        status: 'good',
        message: 'Readability is above industry average',
        score: 75
      });
    } else {
      analysis.push({
        metric: 'Readability',
        status: 'needs_improvement',
        message: 'Readability could be improved to match competitors',
        score: 50
      });
    }

    // Content structure analysis
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const avgSentencesPerParagraph = paragraphs.length > 0 ? sentences.length / paragraphs.length : 0;

    if (avgSentencesPerParagraph >= 3 && avgSentencesPerParagraph <= 5) {
      analysis.push({
        metric: 'Structure',
        status: 'excellent',
        message: 'Well-structured content with optimal paragraph length',
        score: 85
      });
      competitiveScore += 30;
    } else {
      analysis.push({
        metric: 'Structure',
        status: 'good',
        message: 'Content structure can be optimized',
        score: 60
      });
      competitiveScore += 15;
    }

    return {
      overallScore: Math.round(competitiveScore),
      analysis
    };
  };

  const getContentTypeRecommendation = () => {
    const { industryStandards } = competitorBenchmarks;
    
    if (wordCount >= industryStandards.article.min && wordCount <= industryStandards.article.max) {
      return { type: 'Long-form Article', match: 'perfect', color: 'bg-green-500' };
    } else if (wordCount >= industryStandards.blogPost.min && wordCount <= industryStandards.blogPost.max) {
      return { type: 'Blog Post', match: 'good', color: 'bg-blue-500' };
    } else if (wordCount >= industryStandards.productDescription.min && wordCount <= industryStandards.productDescription.max) {
      return { type: 'Product Description', match: 'good', color: 'bg-purple-500' };
    } else if (wordCount <= industryStandards.socialPost.max) {
      return { type: 'Social Media Post', match: 'good', color: 'bg-orange-500' };
    } else {
      return { type: 'Custom Content', match: 'neutral', color: 'bg-gray-500' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'needs_improvement': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const competitive = analyzeCompetitiveness();
  const contentType = getContentTypeRecommendation();

  return (
    <div className="space-y-6">
      {/* Competitive Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Competitive Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Competitive Score</span>
              <Badge className={`text-white ${competitive.overallScore >= 80 ? 'bg-green-500' : competitive.overallScore >= 60 ? 'bg-blue-500' : 'bg-red-500'}`}>
                {competitive.overallScore}/100
              </Badge>
            </div>
            <Progress value={competitive.overallScore} className="h-3" aria-label="Competitive score progress"/>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Content Type Match</span>
              <Badge className={`text-white ${contentType.color}`}>
                {contentType.type}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitive.analysis.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.metric}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.score}/100
                  </Badge>
                </div>
                <p className="text-sm">{item.message}</p>
                <Progress value={item.score} className="h-1 mt-2" aria-label={`${item.metric} score progress`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benchmarks Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Industry Benchmarks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Your Content</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Word Count</span>
                  <span className="font-medium">{wordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Readability</span>
                  <span className="font-medium">{readabilityScore}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Competitor Average</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Word Count</span>
                  <span className="font-medium">{competitorBenchmarks.averageWordCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Readability</span>
                  <span className="font-medium">{competitorBenchmarks.averageReadability}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Optimization Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wordCount < competitorBenchmarks.topPerformingLength.min && (
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-blue-900">Expand Content Length</p>
                  <p className="text-sm text-blue-700">
                    Consider adding {competitorBenchmarks.topPerformingLength.min - wordCount} more words to match top-performing content.
                  </p>
                </div>
              </div>
            )}
            
            {readabilityScore < competitorBenchmarks.averageReadability && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Users className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-yellow-900">Improve Readability</p>
                  <p className="text-sm text-yellow-700">
                    Simplify sentence structure and use shorter words to improve reader engagement.
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-green-900">Content Strategy Tip</p>
                <p className="text-sm text-green-700">
                  Top-performing content in your category averages {competitorBenchmarks.topPerformingLength.min}-{competitorBenchmarks.topPerformingLength.max} words with a readability score of 70+.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}