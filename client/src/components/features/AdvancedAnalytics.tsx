import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Clock, BookOpen, Zap, Eye } from 'lucide-react';

interface AnalyticsProps {
  text: string;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readabilityScore: number;
}

export default function AdvancedAnalytics({ text, wordCount, sentenceCount, paragraphCount, readabilityScore }: AnalyticsProps) {
  const [typingSpeed, setTypingSpeed] = useState<number[]>([]);
  const [sessionStats, setSessionStats] = useState({
    wordsPerMinute: 0,
    timeSpent: 0,
    editCount: 0,
    peakWPM: 0
  });

  // Track typing speed and session metrics
  useEffect(() => {
    const startTime = Date.now();
    let lastWordCount = 0;
    let editCount = 0;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = (currentTime - startTime) / 1000 / 60; // in minutes
      const wordsAdded = wordCount - lastWordCount;
      
      if (wordsAdded !== 0) {
        editCount++;
        const currentWPM = timeElapsed > 0 ? Math.round(wordCount / timeElapsed) : 0;
        
        setTypingSpeed(prev => [...prev.slice(-9), currentWPM]);
        setSessionStats(prev => ({
          wordsPerMinute: currentWPM,
          timeSpent: Math.round(timeElapsed),
          editCount: editCount,
          peakWPM: Math.max(prev.peakWPM, currentWPM)
        }));
      }
      
      lastWordCount = wordCount;
    }, 1000);

    return () => clearInterval(interval);
  }, [wordCount]);

  // Advanced text analysis
  const getWritingInsights = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const avgWordsPerSentence = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
    const avgSentencesPerParagraph = paragraphCount > 0 ? Math.round(sentenceCount / paragraphCount) : 0;
    
    // Vocabulary diversity (unique words / total words)
    const uniqueWords = new Set(words);
    const vocabularyDiversity = words.length > 0 ? Math.round((uniqueWords.size / words.length) * 100) : 0;
    
    // Writing complexity score
    const complexityScore = Math.round((avgWordsPerSentence * 0.3) + (vocabularyDiversity * 0.4) + (readabilityScore * 0.3));
    
    return {
      avgWordsPerSentence,
      avgSentencesPerParagraph,
      vocabularyDiversity,
      complexityScore,
      uniqueWords: uniqueWords.size
    };
  };

  const insights = getWritingInsights();

  // Chart data
  const typingSpeedData = typingSpeed.map((speed, index) => ({
    time: `${index + 1}m`,
    wpm: speed
  }));

  const structureData = [
    { name: 'Words/Sentence', value: insights.avgWordsPerSentence, optimal: 20 },
    { name: 'Sentences/Paragraph', value: insights.avgSentencesPerParagraph, optimal: 4 },
    { name: 'Vocabulary Diversity', value: insights.vocabularyDiversity, optimal: 80 }
  ];

  const readabilityData = [
    { name: 'Very Easy', value: readabilityScore >= 90 ? 100 : 0, fill: '#10B981' },
    { name: 'Easy', value: readabilityScore >= 80 && readabilityScore < 90 ? 100 : 0, fill: '#3B82F6' },
    { name: 'Standard', value: readabilityScore >= 60 && readabilityScore < 80 ? 100 : 0, fill: '#F59E0B' },
    { name: 'Difficult', value: readabilityScore < 60 ? 100 : 0, fill: '#EF4444' }
  ].filter(item => item.value > 0);

  const getScoreColor = (score: number, optimal: number) => {
    const percentage = (score / optimal) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-blue-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWritingGoals = () => {
    const goals = [];
    
    if (wordCount < 300) goals.push({ text: 'Write 300+ words', progress: (wordCount / 300) * 100 });
    if (insights.avgWordsPerSentence > 25) goals.push({ text: 'Reduce sentence length', progress: Math.max(0, 100 - ((insights.avgWordsPerSentence - 20) * 5)) });
    if (readabilityScore < 60) goals.push({ text: 'Improve readability', progress: (readabilityScore / 60) * 100 });
    if (insights.vocabularyDiversity < 50) goals.push({ text: 'Increase vocabulary diversity', progress: (insights.vocabularyDiversity / 50) * 100 });
    
    return goals;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Typing Speed</p>
                <p className="text-2xl font-bold">{sessionStats.wordsPerMinute} WPM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Time Spent</p>
                <p className="text-2xl font-bold">{sessionStats.timeSpent}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Peak WPM</p>
                <p className="text-2xl font-bold">{sessionStats.peakWPM}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Vocabulary</p>
                <p className="text-2xl font-bold">{insights.uniqueWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Typing Speed Chart */}
      {typingSpeedData.length > 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Typing Speed Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={typingSpeedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Writing Structure Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Writing Structure Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {structureData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getScoreColor(item.value, item.optimal)}`}>
                      {item.value}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Optimal: {item.optimal}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={Math.min((item.value / item.optimal) * 100, 100)} 
                  className="h-2"
                  aria-label={`${item.name} progress`} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Writing Goals & Recommendations */}
      {getWritingGoals().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Writing Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getWritingGoals().map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.text}</span>
                    <span className="text-sm font-bold">{Math.round(goal.progress)}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" aria-label={`${goal.text} progress`}/>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}