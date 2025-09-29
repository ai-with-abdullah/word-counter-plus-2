import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Share2, Twitter, Facebook, Linkedin, Instagram, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaOptimizerProps {
  text: string;
  title?: string;
}

export default function SocialMediaOptimizer({ text, title = '' }: SocialMediaOptimizerProps) {
  const [customPost, setCustomPost] = useState('');
  const { toast } = useToast();

  const generateSocialPosts = () => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const firstSentence = sentences[0]?.trim() || '';
    const keyPoints = extractKeyPoints(text);
    const hashtags = generateHashtags(text);

    return {
      twitter: {
        maxLength: 280,
        post: `${firstSentence.slice(0, 200)}... ${hashtags.slice(0, 3).map(h => `#${h}`).join(' ')}`,
        hashtags: hashtags.slice(0, 5)
      },
      linkedin: {
        maxLength: 3000,
        post: `${title ? title + '\n\n' : ''}${keyPoints.join('\n\n')}\n\n${hashtags.slice(0, 5).map(h => `#${h}`).join(' ')}`,
        hashtags: hashtags.slice(0, 10)
      },
      facebook: {
        maxLength: 63206,
        post: `${title ? title + '\n\n' : ''}${firstSentence}\n\n${keyPoints.slice(0, 3).join('\n')}`,
        hashtags: hashtags.slice(0, 3)
      },
      instagram: {
        maxLength: 2200,
        post: `${firstSentence.slice(0, 100)}...\n\n${hashtags.slice(0, 10).map(h => `#${h}`).join(' ')}`,
        hashtags: hashtags.slice(0, 15)
      }
    };
  };

  const extractKeyPoints = (content: string) => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    // Simple extraction of shorter, impactful sentences
    return sentences
      .filter(s => s.trim().length > 10 && s.trim().length < 150)
      .slice(0, 5)
      .map(s => `• ${s.trim()}`);
  };

  const generateHashtags = (content: string) => {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did'
    ]);

    const wordCounts: { [key: string]: number } = {};
    words.forEach(word => {
      if (!stopWords.has(word) && word.length > 3) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const topWords = Object.entries(wordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .map(([word]) => word);

    // Add some generic popular hashtags based on content type
    const genericTags = ['writing', 'content', 'blog', 'tips', 'productivity', 'business'];
    
    return [...topWords, ...genericTags].slice(0, 20);
  };

  const copyToClipboard = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${platform} post copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const sharePost = (text: string, platform: string) => {
    const encodedText = encodeURIComponent(text);
    let shareUrl = '';

    switch (platform.toLowerCase()) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedText}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=550,height=500');
  };

  const posts = generateSocialPosts();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      default: return <Share2 className="h-4 w-4" />;
    }
  };

  const getCharacterCount = (text: string, maxLength: number) => {
    const remaining = maxLength - text.length;
    const color = remaining < 50 ? 'text-red-500' : remaining < 100 ? 'text-yellow-500' : 'text-green-500';
    return { remaining, color };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Social Media Optimizer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="twitter" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="twitter" aria-label='Twitter Tab' className="flex items-center space-x-1">
                <Twitter className="h-3 w-3" />
                <span className="hidden sm:inline">Twitter</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" aria-label='LinkedIn Tab' className="flex items-center space-x-1">
                <Linkedin className="h-3 w-3" />
                <span className="hidden sm:inline">LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger value="facebook" aria-label='Facebook Tab' className="flex items-center space-x-1">
                <Facebook className="h-3 w-3" />
                <span className="hidden sm:inline">Facebook</span>
              </TabsTrigger>
              <TabsTrigger value="instagram" aria-label='Instagram Tab' className="flex items-center space-x-1">
                <Instagram className="h-3 w-3" />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
            </TabsList>

            {Object.entries(posts).map(([platform, data]) => (
              <TabsContent key={platform} value={platform} className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold capitalize flex items-center space-x-2">
                      {getPlatformIcon(platform)}
                      <span>{platform} Post</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${getCharacterCount(data.post, data.maxLength).color}`}>
                        {getCharacterCount(data.post, data.maxLength).remaining} chars left
                      </span>
                    </div>
                  </div>

                  <Textarea
                    value={data.post}
                    readOnly
                    className="min-h-[120px] resize-none"
                    placeholder={`Generated ${platform} post will appear here...`}
                  />

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(data.post, platform)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => sharePost(data.post, platform)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  {/* Hashtags */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center space-x-1">
                      <Hash className="h-3 w-3" />
                      <span>Suggested Hashtags</span>
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {data.hashtags.map((hashtag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => copyToClipboard(`#${hashtag}`, 'hashtag')}
                        >
                          #{hashtag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Custom Post Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Post Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea
              value={customPost}
              onChange={(e) => setCustomPost(e.target.value)}
              placeholder="Create your own custom social media post..."
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{customPost.length} characters</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(customPost, 'custom post')}
                disabled={!customPost.trim()}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy Custom Post
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Platform-Specific Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center space-x-1">
                <Twitter className="h-4 w-4" />
                <span>Twitter/X</span>
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Keep tweets under 280 characters</li>
                <li>• Use 1-2 relevant hashtags</li>
                <li>• Post during peak hours (9AM-3PM)</li>
                <li>• Include visuals when possible</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center space-x-1">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Professional tone and industry insights</li>
                <li>• Use 3-5 relevant hashtags</li>
                <li>• Post on Tuesday-Thursday</li>
                <li>• Share valuable content and experiences</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center space-x-1">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Engage with questions and polls</li>
                <li>• Use minimal hashtags (1-2)</li>
                <li>• Post between 1-4PM</li>
                <li>• Focus on community building</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center space-x-1">
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Visual-first content strategy</li>
                <li>• Use 5-10 targeted hashtags</li>
                <li>• Post at 11AM-1PM or 7-9PM</li>
                <li>• Tell stories with captions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}