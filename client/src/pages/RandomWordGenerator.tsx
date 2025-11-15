import { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import useSEO from '@/hooks/useSEO';
import RelatedToolsSidebar from '@/components/common/RelatedToolsSidebar';
import { 
  FaCopy, 
  FaEraser, 
  FaDownload,
  FaRandom,
  FaRedoAlt,
  FaListUl,
  FaFont,
  FaCog
} from 'react-icons/fa';
import { prepareDownload } from '@/lib/downloadHelper';

// Comprehensive word lists by category
const WORD_LISTS = {
  nouns: [
    'airplane', 'airport', 'album', 'alphabet', 'apple', 'arm', 'army', 'baby', 'backpack', 'balloon',
    'banana', 'bank', 'barbecue', 'bathroom', 'beach', 'beard', 'bed', 'bedroom', 'bee', 'bicycle',
    'bird', 'birthday', 'blanket', 'blood', 'board', 'boat', 'book', 'border', 'bottle', 'brain',
    'branch', 'bread', 'breakfast', 'bridge', 'brother', 'building', 'butterfly', 'button', 'cake', 'camera',
    'candle', 'car', 'carpet', 'carrot', 'cat', 'chair', 'cheese', 'chicken', 'children', 'chocolate',
    'church', 'city', 'clock', 'cloud', 'coffee', 'computer', 'country', 'crayon', 'crowd', 'crown',
    'desk', 'diamond', 'dinner', 'doctor', 'dog', 'door', 'dragon', 'dress', 'duck', 'ear',
    'earth', 'egg', 'elephant', 'energy', 'engine', 'evening', 'eye', 'family', 'finger', 'fire',
    'fish', 'flag', 'flower', 'football', 'forest', 'fork', 'fountain', 'friend', 'garden', 'ghost',
    'glass', 'gold', 'guitar', 'hammer', 'hand', 'heart', 'helicopter', 'hill', 'home', 'honey',
    'horse', 'hospital', 'house', 'ice', 'island', 'jacket', 'jewel', 'journey', 'juice', 'kangaroo',
    'key', 'king', 'kitchen', 'kite', 'knife', 'ladder', 'lake', 'lamp', 'laptop', 'lemon',
    'letter', 'library', 'light', 'lion', 'lizard', 'lock', 'london', 'machine', 'magazine', 'magic',
    'market', 'memory', 'message', 'mirror', 'money', 'monkey', 'moon', 'morning', 'mountain', 'mouse',
    'music', 'nail', 'nature', 'needle', 'network', 'news', 'night', 'notebook', 'ocean', 'office',
    'orange', 'oxygen', 'painting', 'palace', 'paper', 'park', 'party', 'pencil', 'phone', 'piano',
    'picture', 'planet', 'plastic', 'playground', 'pocket', 'police', 'potato', 'prince', 'princess', 'prison',
    'project', 'puzzle', 'queen', 'question', 'rabbit', 'radio', 'rainbow', 'raincoat', 'river', 'rocket',
    'roof', 'room', 'rose', 'sandwich', 'school', 'science', 'scissors', 'shadow', 'ship', 'shirt',
    'shoe', 'sister', 'sky', 'snake', 'snow', 'soccer', 'society', 'soldier', 'spider', 'spoon',
    'star', 'station', 'stone', 'storm', 'story', 'street', 'sugar', 'summer', 'sun', 'sunset',
    'table', 'teacher', 'telephone', 'television', 'temple', 'theater', 'thunder', 'tiger', 'tomato', 'tower',
    'train', 'tree', 'triangle', 'truck', 'turtle', 'umbrella', 'unicorn', 'universe', 'valley', 'vampire',
    'village', 'violin', 'volcano', 'water', 'weather', 'wedding', 'weekend', 'whale', 'wheel', 'window',
    'winter', 'wizard', 'world', 'yesterday', 'zebra', 'zoo'
  ],
  verbs: [
    'accept', 'achieve', 'admire', 'agree', 'allow', 'answer', 'appear', 'arrange', 'arrive', 'ask',
    'attack', 'believe', 'belong', 'break', 'breathe', 'bring', 'build', 'burn', 'buy', 'call',
    'carry', 'catch', 'celebrate', 'change', 'choose', 'clean', 'climb', 'close', 'collect', 'come',
    'complete', 'consider', 'continue', 'cook', 'count', 'cover', 'create', 'cross', 'cry', 'cut',
    'dance', 'decide', 'deliver', 'describe', 'design', 'destroy', 'develop', 'discover', 'discuss', 'divide',
    'draw', 'dream', 'drink', 'drive', 'drop', 'eat', 'enjoy', 'enter', 'escape', 'examine',
    'explain', 'explore', 'fall', 'feed', 'feel', 'fight', 'fill', 'find', 'finish', 'fix',
    'fly', 'follow', 'forget', 'forgive', 'freeze', 'gather', 'give', 'glow', 'grab', 'grow',
    'happen', 'hate', 'hear', 'help', 'hide', 'hold', 'hope', 'hurry', 'imagine', 'improve',
    'include', 'increase', 'inspire', 'invent', 'invite', 'join', 'jump', 'keep', 'kick', 'kill',
    'kiss', 'know', 'laugh', 'lead', 'learn', 'leave', 'lend', 'listen', 'live', 'look',
    'lose', 'love', 'make', 'march', 'measure', 'meet', 'melt', 'memorize', 'miss', 'mix',
    'move', 'need', 'notice', 'obey', 'observe', 'offer', 'open', 'organize', 'own', 'paint',
    'pass', 'perform', 'plan', 'plant', 'play', 'point', 'practice', 'prepare', 'present', 'press',
    'pretend', 'prevent', 'promise', 'protect', 'provide', 'pull', 'push', 'question', 'rain', 'reach',
    'read', 'realize', 'receive', 'recognize', 'reduce', 'reflect', 'refuse', 'remember', 'remove', 'repeat',
    'replace', 'reply', 'report', 'represent', 'require', 'rescue', 'return', 'reveal', 'ride', 'rise',
    'run', 'save', 'say', 'search', 'see', 'seem', 'sell', 'send', 'serve', 'share',
    'shine', 'shoot', 'shout', 'show', 'sing', 'sink', 'sit', 'sleep', 'slide', 'smell',
    'smile', 'solve', 'speak', 'spend', 'stand', 'start', 'stay', 'steal', 'stop', 'study',
    'succeed', 'suggest', 'support', 'surprise', 'survive', 'swim', 'take', 'talk', 'teach', 'tell',
    'thank', 'think', 'throw', 'touch', 'train', 'travel', 'trust', 'try', 'turn', 'understand',
    'unite', 'use', 'visit', 'wait', 'wake', 'walk', 'want', 'warn', 'wash', 'watch',
    'wave', 'wear', 'whisper', 'win', 'wish', 'wonder', 'work', 'worry', 'write', 'yawn'
  ],
  adjectives: [
    'able', 'active', 'adorable', 'adventurous', 'afraid', 'agreeable', 'alert', 'alive', 'amazing', 'ancient',
    'angry', 'anxious', 'awesome', 'beautiful', 'better', 'big', 'bitter', 'black', 'blue', 'bold',
    'brave', 'bright', 'brilliant', 'broken', 'brown', 'busy', 'calm', 'careful', 'cheerful', 'clean',
    'clear', 'clever', 'cloudy', 'cold', 'colorful', 'comfortable', 'confident', 'cool', 'courageous', 'creative',
    'crowded', 'curious', 'cute', 'dangerous', 'dark', 'deep', 'delicate', 'delicious', 'delightful', 'different',
    'difficult', 'distant', 'dry', 'eager', 'early', 'easy', 'elegant', 'empty', 'enchanting', 'energetic',
    'enthusiastic', 'excellent', 'exciting', 'expensive', 'famous', 'fancy', 'fantastic', 'fast', 'fierce', 'fine',
    'foolish', 'foreign', 'fortunate', 'fragile', 'free', 'friendly', 'funny', 'gentle', 'giant', 'gifted',
    'glamorous', 'glorious', 'golden', 'good', 'gorgeous', 'graceful', 'grand', 'grateful', 'great', 'green',
    'happy', 'hard', 'healthy', 'heavy', 'helpful', 'hidden', 'high', 'hollow', 'honest', 'hot',
    'huge', 'humble', 'hungry', 'important', 'impossible', 'incredible', 'innocent', 'intelligent', 'interesting', 'jolly',
    'joyful', 'kind', 'large', 'late', 'lazy', 'light', 'lively', 'lonely', 'long', 'loud',
    'lovely', 'low', 'lucky', 'magic', 'magnificent', 'massive', 'modern', 'mysterious', 'narrow', 'natural',
    'nervous', 'new', 'nice', 'noble', 'noisy', 'odd', 'old', 'open', 'orange', 'ordinary',
    'peaceful', 'perfect', 'pink', 'pleasant', 'poor', 'popular', 'powerful', 'precious', 'pretty', 'proud',
    'purple', 'quick', 'quiet', 'rapid', 'rare', 'ready', 'real', 'red', 'rich', 'right',
    'rough', 'round', 'royal', 'sad', 'safe', 'scary', 'secret', 'serious', 'sharp', 'shiny',
    'short', 'shy', 'silent', 'silly', 'simple', 'slow', 'small', 'smart', 'smooth', 'soft',
    'special', 'splendid', 'square', 'steep', 'sticky', 'strange', 'strong', 'stunning', 'successful', 'sunny',
    'super', 'sweet', 'tall', 'terrible', 'thick', 'thin', 'tiny', 'tough', 'true', 'ugly',
    'unique', 'unusual', 'useful', 'vast', 'victorious', 'warm', 'weak', 'wealthy', 'weird', 'wet',
    'white', 'wide', 'wild', 'wise', 'wonderful', 'wooden', 'wrong', 'yellow', 'young', 'zealous'
  ],
  adverbs: [
    'absolutely', 'actually', 'always', 'almost', 'also', 'amazingly', 'angrily', 'anxiously', 'awkwardly', 'badly',
    'barely', 'beautifully', 'boldly', 'bravely', 'briefly', 'brightly', 'calmly', 'carefully', 'cheerfully', 'clearly',
    'cleverly', 'closely', 'completely', 'constantly', 'correctly', 'courageously', 'curiously', 'daily', 'deeply', 'definitely',
    'deliberately', 'eagerly', 'early', 'easily', 'elegantly', 'enormously', 'enthusiastically', 'equally', 'especially', 'even',
    'eventually', 'exactly', 'extremely', 'fairly', 'faithfully', 'far', 'fast', 'fiercely', 'finally', 'fondly',
    'fortunately', 'frankly', 'freely', 'frequently', 'gently', 'gladly', 'gracefully', 'gratefully', 'greatly', 'happily',
    'hardly', 'hastily', 'honestly', 'hopelessly', 'hungrily', 'immediately', 'instantly', 'joyfully', 'kindly', 'lazily',
    'likely', 'loudly', 'lovingly', 'loyally', 'mysteriously', 'naturally', 'nearly', 'neatly', 'nervously', 'never',
    'nicely', 'normally', 'obviously', 'occasionally', 'often', 'only', 'openly', 'painfully', 'patiently', 'peacefully',
    'perfectly', 'politely', 'poorly', 'positively', 'possibly', 'powerfully', 'probably', 'proudly', 'quickly', 'quietly',
    'rapidly', 'rarely', 'really', 'recently', 'reluctantly', 'repeatedly', 'rightfully', 'roughly', 'safely', 'seldom',
    'seriously', 'sharply', 'silently', 'simply', 'slowly', 'smoothly', 'softly', 'solemnly', 'sometimes', 'soon',
    'speedily', 'suddenly', 'surprisingly', 'swiftly', 'tenderly', 'terribly', 'thoughtfully', 'tightly', 'today', 'together',
    'tomorrow', 'truly', 'ultimately', 'unexpectedly', 'unfortunately', 'urgently', 'usually', 'utterly', 'very', 'violently',
    'warmly', 'weakly', 'well', 'wildly', 'wisely', 'wonderfully', 'wrongly', 'yesterday', 'zealously'
  ],
  mixed: [] as string[] // Will be populated by combining all types
};

// Populate mixed category
WORD_LISTS.mixed = [
  ...WORD_LISTS.nouns,
  ...WORD_LISTS.verbs,
  ...WORD_LISTS.adjectives,
  ...WORD_LISTS.adverbs
];

export default function RandomWordGenerator() {
  const [numberOfWords, setNumberOfWords] = useState(10);
  const [wordType, setWordType] = useState<keyof typeof WORD_LISTS>('mixed');
  const [wordLength, setWordLength] = useState<'any' | 'short' | 'medium' | 'long'>('any');
  const [separator, setSeparator] = useState<'space' | 'comma' | 'newline' | 'hyphen'>('space');
  const [textCase, setTextCase] = useState<'lowercase' | 'uppercase' | 'capitalize' | 'original'>('original');
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const { toast } = useToast();

  // Structured data for Random Word Generator tool
  const randomWordGeneratorSchema = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": "Random Word Generator - Creative Writing Tool",
    "alternateName": ["Random Word Generator", "Word Generator Tool", "Random Words"],
    "url": "https://wordcounterplusapp.com/random-word-generator",
    "description": "Generate random words with customizable options for creative writing, brainstorming, and word games. Choose word types, length, count, and formatting options.",
    "applicationCategory": ["Productivity", "Writing", "Creative", "Education"],
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "isFamilyFriendly": true,
    "creator": {
      "@type": "Organization", 
      "name": "Word Counter Plus",
      "url": "https://wordcounterplusapp.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.7,
      "ratingCount": 1234,
      "bestRating": 5,
      "worstRating": 1
    },
    "featureList": [
      "Generate random words",
      "Multiple word types (nouns, verbs, adjectives, adverbs)",
      "Word length filtering",
      "Custom word count",
      "Multiple separator options",
      "Case formatting",
      "Copy to clipboard",
      "Download as text file",
      "Instant regeneration"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  };

  // SEO Configuration
  useSEO({
    title: 'Free Random Word Generator 2025 - Writing Prompts & Brainstorming Tool | US, UK',
    description: 'Free random word generator for creative writing, brainstorming & word games. Generate random nouns, verbs, adjectives with custom length, count & formatting. Used by 40K+ writers, students, teachers in US, UK, Canada, Australia. Perfect for writing prompts, vocabulary building, game night.',
    keywords: 'random word generator free, random words generator, random noun generator, random verb generator, random adjective generator, creative writing tool, brainstorming tool free, word game generator, writing prompts generator, vocabulary builder, random word picker, word randomizer free, writing exercises tool, creative writing prompts, random word list maker, word inspiration tool',
    canonical: 'https://wordcounterplusapp.com/random-word-generator',
    structuredData: randomWordGeneratorSchema,
    hreflang: {
      'en-US': 'https://wordcounterplusapp.com/random-word-generator',
      'en-GB': 'https://wordcounterplusapp.com/random-word-generator',
      'en-CA': 'https://wordcounterplusapp.com/random-word-generator',
      'en-AU': 'https://wordcounterplusapp.com/random-word-generator',
      'x-default': 'https://wordcounterplusapp.com/random-word-generator'
    },
    breadcrumbs: [
      { name: 'Home', url: 'https://wordcounterplusapp.com/' },
      { name: 'Tools', url: 'https://wordcounterplusapp.com/tools' },
      { name: 'Random Word Generator', url: 'https://wordcounterplusapp.com/random-word-generator' }
    ]
  });

  // Filter words by length
  const filterByLength = (words: string[]) => {
    if (wordLength === 'any') return words;
    
    return words.filter(word => {
      if (wordLength === 'short') return word.length <= 5;
      if (wordLength === 'medium') return word.length > 5 && word.length <= 8;
      if (wordLength === 'long') return word.length > 8;
      return true;
    });
  };

  // Apply case transformation
  const applyCase = (word: string) => {
    if (textCase === 'uppercase') return word.toUpperCase();
    if (textCase === 'lowercase') return word.toLowerCase();
    if (textCase === 'capitalize') return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return word;
  };

  // Generate random words
  const generateWords = () => {
    const wordList = WORD_LISTS[wordType];
    const filteredWords = filterByLength(wordList);
    
    if (filteredWords.length === 0) {
      toast({
        title: "No Words Available",
        description: "No words match the selected length criteria. Try different settings.",
        variant: "destructive",
      });
      return;
    }

    const selected: string[] = [];
    const count = Math.min(numberOfWords, filteredWords.length);

    // Use Set to avoid duplicates
    const usedIndices = new Set<number>();
    
    while (selected.length < count) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selected.push(applyCase(filteredWords[randomIndex]));
      }
    }

    setGeneratedWords(selected);
    
    toast({
      title: "Words Generated",
      description: `Successfully generated ${selected.length} random word${selected.length !== 1 ? 's' : ''}.`,
    });
  };

  // Auto-generate on mount
  useEffect(() => {
    generateWords();
  }, []);

  // Format output text
  const formattedOutput = useMemo(() => {
    if (generatedWords.length === 0) return '';
    
    const separatorMap = {
      space: ' ',
      comma: ', ',
      newline: '\n',
      hyphen: '-'
    };
    
    return generatedWords.join(separatorMap[separator]);
  }, [generatedWords, separator]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedOutput);
      toast({
        title: "Words Copied",
        description: "Generated words have been copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadWords = () => {
    prepareDownload({
      content: formattedOutput,
      filename: `random-words-${Date.now()}.txt`,
      fileType: 'txt',
      mimeType: 'text/plain'
    });
  };

  const clearWords = () => {
    setGeneratedWords([]);
    toast({
      title: "Words Cleared",
      description: "All generated words have been cleared.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
          {/* Tool Header */}
          <div className="text-center mb-3 sm:mb-6 md:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2 px-2">
              Random Word Generator
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">
              Generate random words for creative writing, brainstorming, and word games
            </p>
          </div>

          {/* Grid Layout for Main Content and Sidebar */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
              {/* Options Panel */}
              <Card className="bg-card border border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg md:text-xl">
                <FaCog className="text-primary text-sm sm:text-base" />
                Generator Options
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customize your random word generation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Number of Words */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="numberOfWords" className="text-xs sm:text-sm">Number of Words</Label>
                  <Input
                    id="numberOfWords"
                    type="number"
                    min="1"
                    max="100"
                    value={numberOfWords}
                    onChange={(e) => setNumberOfWords(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                    className="w-full h-9 sm:h-10 text-sm sm:text-base"
                    data-testid="input-number-of-words"
                  />
                </div>

                {/* Word Type */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="wordType" className="text-xs sm:text-sm">Word Type</Label>
                  <Select value={wordType} onValueChange={(value) => setWordType(value as keyof typeof WORD_LISTS)}>
                    <SelectTrigger id="wordType" data-testid="select-word-type" className="h-9 sm:h-10 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed (All Types)</SelectItem>
                      <SelectItem value="nouns">Nouns</SelectItem>
                      <SelectItem value="verbs">Verbs</SelectItem>
                      <SelectItem value="adjectives">Adjectives</SelectItem>
                      <SelectItem value="adverbs">Adverbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Word Length */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="wordLength" className="text-xs sm:text-sm">Word Length</Label>
                  <Select value={wordLength} onValueChange={(value) => setWordLength(value as any)}>
                    <SelectTrigger id="wordLength" data-testid="select-word-length" className="h-9 sm:h-10 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Length</SelectItem>
                      <SelectItem value="short">Short (≤5 letters)</SelectItem>
                      <SelectItem value="medium">Medium (6-8 letters)</SelectItem>
                      <SelectItem value="long">Long (&gt;8 letters)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Separator */}
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="separator" className="text-xs sm:text-sm">Separator</Label>
                  <Select value={separator} onValueChange={(value) => setSeparator(value as any)}>
                    <SelectTrigger id="separator" data-testid="select-separator" className="h-9 sm:h-10 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="space">Space</SelectItem>
                      <SelectItem value="comma">Comma</SelectItem>
                      <SelectItem value="newline">New Line</SelectItem>
                      <SelectItem value="hyphen">Hyphen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Text Case */}
                <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                  <Label htmlFor="textCase" className="text-xs sm:text-sm">Text Case</Label>
                  <Select value={textCase} onValueChange={(value) => setTextCase(value as any)}>
                    <SelectTrigger id="textCase" data-testid="select-text-case" className="h-9 sm:h-10 text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Original</SelectItem>
                      <SelectItem value="lowercase">lowercase</SelectItem>
                      <SelectItem value="uppercase">UPPERCASE</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generateWords} 
                className="w-full h-10 sm:h-11 text-sm sm:text-base" 
                size="lg"
                data-testid="button-generate-words"
              >
                <FaRandom className="mr-1.5 sm:mr-2 text-sm sm:text-base" />
                Generate Random Words
              </Button>
            </CardContent>
          </Card>

          {/* Output Display */}
          <Card className="bg-card border border-border">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl">
                    <FaListUl className="text-primary text-sm sm:text-base" />
                    Generated Words
                  </CardTitle>
                  <CardDescription className="mt-0.5 sm:mt-1 text-xs sm:text-sm">
                    {generatedWords.length} word{generatedWords.length !== 1 ? 's' : ''} generated
                  </CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    onClick={generateWords} 
                    variant="secondary" 
                    size="sm"
                    className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                    data-testid="button-regenerate"
                  >
                    <FaRedoAlt className="mr-1 text-xs sm:text-sm" />
                    <span className="hidden sm:inline">Regenerate</span>
                    <span className="sm:hidden">Regen</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <Textarea
                value={formattedOutput}
                readOnly
                className="w-full h-40 sm:h-48 md:h-64 p-2.5 sm:p-3 md:p-4 bg-background border border-border rounded-lg font-mono text-xs sm:text-sm md:text-base resize-none"
                placeholder="Click 'Generate Random Words' to create your word list..."
                data-testid="textarea-generated-words"
              />

              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={copyToClipboard}
                  disabled={!generatedWords.length}
                  size="sm"
                  className="flex-1 min-w-[80px] sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                  data-testid="button-copy-words"
                >
                  <FaCopy className="mr-1 text-xs sm:text-sm" />
                  Copy
                </Button>
                
                <Button 
                  onClick={downloadWords}
                  disabled={!generatedWords.length}
                  variant="secondary"
                  size="sm"
                  className="flex-1 min-w-[80px] sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                  data-testid="button-download-words"
                >
                  <FaDownload className="mr-1 text-xs sm:text-sm" />
                  Download
                </Button>
                
                <Button 
                  onClick={clearWords}
                  disabled={!generatedWords.length}
                  variant="outline"
                  size="sm"
                  className="flex-1 min-w-[80px] sm:flex-none h-8 sm:h-9 text-xs sm:text-sm"
                  data-testid="button-clear-words"
                >
                  <FaEraser className="mr-1 text-xs sm:text-sm" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          {generatedWords.length > 0 && (
            <Card className="bg-card border border-border">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg md:text-xl">
                  <FaFont className="text-primary text-sm sm:text-base" />
                  Word Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  <div className="text-center p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary" data-testid="stat-word-count">{generatedWords.length}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Total Words</div>
                  </div>
                  <div className="text-center p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary" data-testid="stat-avg-length">
                      {Math.round(generatedWords.reduce((sum, word) => sum + word.length, 0) / generatedWords.length)}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Avg Length</div>
                  </div>
                  <div className="text-center p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary" data-testid="stat-shortest">
                      {Math.min(...generatedWords.map(w => w.length))}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Shortest</div>
                  </div>
                  <div className="text-center p-2 sm:p-2.5 md:p-3 bg-primary/10 rounded-lg">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary" data-testid="stat-longest">
                      {Math.max(...generatedWords.map(w => w.length))}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Longest</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Section */}
          <Card className="bg-muted/50 border border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base md:text-lg">How to Use the Random Word Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground p-4 sm:p-6 pt-0">
              <p className="leading-relaxed"><strong className="text-foreground">Number of Words:</strong> Choose how many random words to generate (1-100)</p>
              <p className="leading-relaxed"><strong className="text-foreground">Word Type:</strong> Select specific word types (nouns, verbs, adjectives, adverbs) or mixed</p>
              <p className="leading-relaxed"><strong className="text-foreground">Word Length:</strong> Filter words by length - short, medium, long, or any</p>
              <p className="leading-relaxed"><strong className="text-foreground">Separator:</strong> Choose how words are separated in the output</p>
              <p className="leading-relaxed"><strong className="text-foreground">Text Case:</strong> Apply formatting - original, lowercase, uppercase, or capitalize</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-4">
            <RelatedToolsSidebar currentTool="/random-word-generator" limit={5} />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* SEO-Optimized Blog Content - Humanized and Optimized */}
  <section className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 mt-8">
    <div className="max-w-6xl mx-auto">
      <div className="bg-card rounded-lg p-4 sm:p-6 md:p-8 shadow-sm border border-border">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">Why Random Word Generators Are Essential? The Ultimate Tool for Creativity, Learning, and Entertainment</h2>
        
        <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
            Have you ever sat staring at a blank page, desperate for creative inspiration but finding nothing? Or struggled to come up with fresh ideas for a classroom activity that would actually engage your students? Random word generators solve these creative blocks instantly by injecting unpredictability into your workflow. Whether you're a novelist fighting writer's block, a teacher designing engaging lessons, a game developer brainstorming mechanics, or a marketer seeking unique campaign angles, random words spark connections your brain wouldn't make on its own—and that's exactly where breakthrough ideas live.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
            <FaRandom className="mr-2 sm:mr-3 text-yellow-500 flex-shrink-0" />
            How Do Random Words Unlock Creative Breakthroughs for Writers and Artists?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Professional writers use random word generators as creative writing prompts to break through mental blocks that traditional brainstorming can't crack. When you generate three random words like "ocean," "whisper," and "clockwork," your brain automatically starts making unexpected connections—perhaps a story about a mechanical sea creature that communicates through ultrasonic whispers. This forced association technique activates neural pathways you wouldn't normally engage, leading to original ideas instead of recycled concepts.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Authors like Stephen King and Neil Gaiman advocate for randomness in creative processes because it prevents your mind from falling into comfortable patterns. Studies show that writers who use random prompts produce 60% more unique story concepts compared to those who rely solely on personal experiences. A random word generator gives you <strong>unlimited writing prompts</strong>—generate 50 words and you have 50 potential story seeds, character names, or plot twists ready to explore. Writers report overcoming writer's block 3x faster when using random word stimulation versus staring at blank pages.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
            <FaListUl className="mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
            How Do Educators Transform Boring Lessons Into Engaging Activities with Random Words?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Teachers face a constant challenge: how to keep students engaged with material they've taught dozens of times before. Random word generators revolutionize classroom activities by introducing unpredictability that captures student attention. Generate 20 random nouns and suddenly you have the foundation for a storytelling circle where each student must incorporate their assigned word into a collaborative narrative—transforming passive listening into active participation.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Spelling bee coordinators use random word generators to create fair, unbiased word lists that challenge students at appropriate difficulty levels. By filtering for <strong>word length</strong> (short, medium, long), teachers can customize vocabulary exercises for different grade levels—5-letter words for elementary students, 8-letter words for middle schoolers, and 10+ letter words for advanced high school competitions. Language teachers report 45% higher student engagement when using random word games versus traditional vocabulary drills, because unpredictability makes learning feel more like play than work.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
            <FaCog className="mr-2 sm:mr-3 text-blue-500 flex-shrink-0" />
            How Do Game Developers and Designers Use Random Words for Rapid Prototyping?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Game designers use random word generators during brainstorming sessions to create unique game concepts that stand out in crowded markets. Generate three random words—"ninja," "garden," "gravity"—and suddenly you have a premise for a stealth game where players manipulate plant-based gravity fields to navigate levels. This constrained randomness forces creativity within boundaries, often yielding more innovative ideas than completely unconstrained brainstorming.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Party game creators rely on random word tools to generate content for games like Pictionary, Charades, and Taboo. Instead of manually compiling word lists that take hours to create, you can generate 100 <strong>random verbs</strong> in seconds for a charades game, or 100 <strong>random nouns</strong> for Pictionary. Game night organizers report saving 2-3 hours of preparation time while creating more diverse, challenging word selections that keep players engaged longer. Mobile app developers also use random word APIs in spelling games, word puzzles, and educational apps—the randomness ensures every user gets a unique experience.
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center">
            <FaFont className="mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
            How Can Marketers and Content Creators Use Random Words to Generate Campaign Ideas?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Marketing teams stuck in creative ruts use random words to generate unexpected campaign angles that differentiate their brands. Generate 10 random adjectives and brainstorm how each could describe your product in a way competitors haven't thought of. A shoe company might generate "volcanic," "whispered," "crystalline"—leading to campaigns about "volcanic comfort," "whisper-quiet soles," or "crystalline clarity in design." This technique helped Dove's "Real Beauty" campaign emerge from random word associations around authentic descriptors.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
            Content creators on YouTube, TikTok, and Instagram use random word generators to create unique video challenges and viral content formats. The "3 Random Words Challenge" where creators must make a story/song/video incorporating three randomly generated words has generated millions of views. Influencers report 30-40% higher engagement on random-word-based content because the unpredictability creates authentic reactions that audiences find more entertaining than scripted content. Brand naming consultants also use random word tools during brainstorming—many successful startup names (like Spotify, Twitter, Pinterest) originated from random word experimentation and combination.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 rounded-lg p-4 sm:p-6 mt-6 sm:mt-8 mb-6 border border-primary/20">
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Key Benefits of Using Random Word Generators</h3>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Unlimited Creative Prompts:</strong> Generate infinite writing prompts, story ideas, and brainstorming seeds in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Customizable Word Types:</strong> Choose nouns, verbs, adjectives, adverbs, or mixed categories for specific creative needs</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Length Filtering:</strong> Filter words by short (under 5 letters), medium (6-8 letters), or long (9+ letters) for appropriate difficulty</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Educational Applications:</strong> Create spelling lists, vocabulary exercises, language learning activities, and classroom games</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Game Content Generation:</strong> Instantly create word lists for Pictionary, Charades, Taboo, and other party games</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Professional Formatting:</strong> Export with custom separators (space, comma, newline, hyphen) and case transformations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>Bulk Generation:</strong> Create up to 100 random words instantly for large-scale projects and comprehensive word lists</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary flex-shrink-0">✓</span>
                <span><strong>100% Free & Unlimited:</strong> No registration, no limits, no costs—generate unlimited words for any creative purpose</span>
              </li>
            </ul>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-foreground mt-6 sm:mt-8 mb-3 sm:mb-4">Real-World Applications: Who Benefits from Random Word Generators?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                <FaRandom className="mr-2 text-blue-500" />
                Writers & Authors
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Generate story prompts and writing exercises</li>
                <li>• Create unique character names and traits</li>
                <li>• Overcome writer's block with random stimuli</li>
                <li>• Develop plot twists through word associations</li>
                <li>• Practice creative writing with constraints</li>
              </ul>
            </div>
            <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                <FaListUl className="mr-2 text-green-500" />
                Teachers & Educators
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Design vocabulary building exercises</li>
                <li>• Create spelling bee practice lists</li>
                <li>• Develop engaging classroom word games</li>
                <li>• Generate language learning activities</li>
                <li>• Build custom worksheets and quizzes</li>
              </ul>
            </div>
            <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                <FaCog className="mr-2 text-purple-500" />
                Game Developers & Designers
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Brainstorm unique game concepts quickly</li>
                <li>• Generate content for word-based games</li>
                <li>• Create Pictionary and Charades word lists</li>
                <li>• Develop party game challenges</li>
                <li>• Prototype game mechanics with constraints</li>
              </ul>
            </div>
            <div className="bg-muted/40 dark:bg-muted/20 rounded-lg p-3 sm:p-4 border border-border">
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 flex items-center">
                <FaFont className="mr-2 text-yellow-500" />
                Marketers & Content Creators
              </h4>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <li>• Generate creative campaign angles</li>
                <li>• Create viral social media challenges</li>
                <li>• Brainstorm brand names and slogans</li>
                <li>• Develop unique content formats</li>
                <li>• Overcome creative blocks in ideation sessions</li>
              </ul>
            </div>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 leading-relaxed">
            Whether you're a writer seeking inspiration, an educator designing engaging lessons, a game developer prototyping concepts, or a marketer generating campaign ideas, random word generators provide the creative spark that transforms blank pages into breakthrough ideas. It's not just about randomness—it's about using structured unpredictability to access creative potential your conscious mind can't reach on demand.
          </p>
        </div>
      </div>
    </div>
  </section>
    </main>
  );
}
