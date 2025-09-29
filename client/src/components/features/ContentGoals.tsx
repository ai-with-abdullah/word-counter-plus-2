import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Plus, Trash2, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  type: 'word_count' | 'reading_time' | 'readability' | 'custom';
  target: number;
  current: number;
  deadline?: Date;
  title: string;
  description?: string;
}

interface ContentGoalsProps {
  wordCount: number;
  readingTime: number;
  readabilityScore: number;
}

export default function ContentGoals({ wordCount, readingTime, readabilityScore }: ContentGoalsProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalType, setNewGoalType] = useState<string>('');
  const [newGoalTarget, setNewGoalTarget] = useState<string>('');
  const [newGoalTitle, setNewGoalTitle] = useState<string>('');
  const { toast } = useToast();

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('contentGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        setGoals(parsedGoals.map((goal: any) => ({
          ...goal,
          deadline: goal.deadline ? new Date(goal.deadline) : undefined
        })));
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    } else {
      // Set default goals
      const defaultGoals: Goal[] = [
        {
          id: '1',
          type: 'word_count',
          target: 1000,
          current: wordCount,
          title: 'Reach 1000 Words',
          description: 'Write comprehensive content'
        },
        {
          id: '2',
          type: 'readability',
          target: 70,
          current: readabilityScore,
          title: 'Achieve Good Readability',
          description: 'Make content easy to read'
        }
      ];
      setGoals(defaultGoals);
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('contentGoals', JSON.stringify(goals));
  }, [goals]);

  // Update current values when metrics change
  useEffect(() => {
    setGoals(prev => prev.map(goal => ({
      ...goal,
      current: getCurrentValue(goal.type)
    })));
  }, [wordCount, readingTime, readabilityScore]);

  const getCurrentValue = (type: string) => {
    switch (type) {
      case 'word_count': return wordCount;
      case 'reading_time': return readingTime;
      case 'readability': return readabilityScore;
      default: return 0;
    }
  };

  const addGoal = () => {
    if (!newGoalType || !newGoalTarget || !newGoalTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create a goal.",
        variant: "destructive",
      });
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      type: newGoalType as Goal['type'],
      target: parseInt(newGoalTarget),
      current: getCurrentValue(newGoalType),
      title: newGoalTitle,
      description: getGoalDescription(newGoalType, parseInt(newGoalTarget))
    };

    setGoals(prev => [...prev, newGoal]);
    setNewGoalType('');
    setNewGoalTarget('');
    setNewGoalTitle('');

    toast({
      title: "Goal Added",
      description: `New goal "${newGoal.title}" has been created.`,
    });
  };

  const removeGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal Removed",
      description: "Goal has been deleted successfully.",
    });
  };

  const getGoalDescription = (type: string, target: number) => {
    switch (type) {
      case 'word_count': return `Write ${target} words`;
      case 'reading_time': return `${target} minute reading time`;
      case 'readability': return `Readability score of ${target}`;
      default: return `Reach target of ${target}`;
    }
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'word_count': return '📝';
      case 'reading_time': return '⏱️';
      case 'readability': return '📚';
      default: return '🎯';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateProgress = (goal: Goal) => {
    if (goal.target === 0) return 0;
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const getCompletedGoals = () => goals.filter(goal => calculateProgress(goal) >= 100);
  const getActiveGoals = () => goals.filter(goal => calculateProgress(goal) < 100);

  const presetGoals = [
    { type: 'word_count', targets: [500, 1000, 1500, 2000, 3000], label: 'Word Count' },
    { type: 'reading_time', targets: [3, 5, 10, 15, 20], label: 'Reading Time (min)' },
    { type: 'readability', targets: [60, 70, 80, 90], label: 'Readability Score' }
  ];

  return (
    <div className="space-y-6">
      {/* Goals Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Content Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{getActiveGoals().length}</div>
              <div className="text-sm text-blue-700">Active Goals</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getCompletedGoals().length}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {goals.length > 0 ? Math.round(goals.reduce((acc, goal) => acc + calculateProgress(goal), 0) / goals.length) : 0}%
              </div>
              <div className="text-sm text-purple-700">Avg Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Goals */}
      {getActiveGoals().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Active Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getActiveGoals().map((goal) => {
                const progress = calculateProgress(goal);
                return (
                  <div key={goal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getGoalIcon(goal.type)}</span>
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          {goal.description && (
                            <p className="text-sm text-gray-600">{goal.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {goal.current} / {goal.target}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" aria-label={`${goal.title} progress`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Goals */}
      {getCompletedGoals().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Completed Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getCompletedGoals().map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-800">{goal.title}</span>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    {goal.current} / {goal.target}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Goal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Goal Type</label>
                <Select value={newGoalType} onValueChange={setNewGoalType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="word_count">Word Count</SelectItem>
                    <SelectItem value="reading_time">Reading Time</SelectItem>
                    <SelectItem value="readability">Readability Score</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Target Value</label>
                <Input
                  type="number"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  placeholder="Enter target"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Goal Title</label>
                <Input
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="Enter goal title"
                />
              </div>
            </div>

            <Button onClick={addGoal} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>

          {/* Quick Goal Presets */}
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-sm">Quick Goal Presets</h4>
            {presetGoals.map((category) => (
              <div key={category.type} className="space-y-2">
                <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {category.label}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {category.targets.map((target) => (
                    <Button
                      key={target}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setNewGoalType(category.type);
                        setNewGoalTarget(target.toString());
                        setNewGoalTitle(`${category.label}: ${target}${category.type === 'reading_time' ? ' min' : ''}`);
                      }}
                      className="text-xs"
                    >
                      {target}{category.type === 'reading_time' ? 'm' : ''}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}