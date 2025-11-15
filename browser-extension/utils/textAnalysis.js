// Text Analysis Utilities
const TextAnalyzer = {
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return this.getEmptyAnalysis();
    }

    const cleanText = text.trim();
    
    return {
      wordCount: this.countWords(cleanText),
      characterCount: this.countCharacters(cleanText),
      characterCountNoSpaces: this.countCharactersNoSpaces(cleanText),
      sentenceCount: this.countSentences(cleanText),
      paragraphCount: this.countParagraphs(cleanText),
      readability: this.calculateReadability(cleanText),
      readingTime: this.calculateReadingTime(cleanText),
      speakingTime: this.calculateSpeakingTime(cleanText),
      avgWordLength: this.calculateAvgWordLength(cleanText)
    };
  },

  countWords(text) {
    if (!text) return 0;
    const words = text.match(/\b[\w']+\b/g);
    return words ? words.length : 0;
  },

  countCharacters(text) {
    return text.length;
  },

  countCharactersNoSpaces(text) {
    return text.replace(/\s/g, '').length;
  },

  countSentences(text) {
    if (!text) return 0;
    const sentences = text.match(/[.!?]+/g);
    return sentences ? sentences.length : 0;
  },

  countParagraphs(text) {
    if (!text) return 0;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    return paragraphs.length;
  },

  calculateReadability(text) {
    const wordCount = this.countWords(text);
    const sentenceCount = this.countSentences(text) || 1;
    const syllableCount = this.countSyllables(text);

    if (wordCount === 0) {
      return { score: 0, level: 'N/A', description: 'Not enough text to analyze' };
    }

    // Flesch Reading Ease Score
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = syllableCount / wordCount;
    
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    const clampedScore = Math.max(0, Math.min(100, score));

    return {
      score: clampedScore,
      level: this.getReadabilityLevel(clampedScore),
      description: this.getReadabilityDescription(clampedScore)
    };
  },

  countSyllables(text) {
    const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    let syllables = 0;

    words.forEach(word => {
      syllables += this.countWordSyllables(word);
    });

    return syllables;
  },

  countWordSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    // Remove silent e
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    // Count vowel groups
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  },

  getReadabilityLevel(score) {
    if (score >= 90) return 'Very Easy';
    if (score >= 80) return 'Easy';
    if (score >= 70) return 'Fairly Easy';
    if (score >= 60) return 'Standard';
    if (score >= 50) return 'Fairly Difficult';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  },

  getReadabilityDescription(score) {
    if (score >= 90) return 'Easily understood by 11-year-old students';
    if (score >= 80) return 'Conversational English for consumers';
    if (score >= 70) return 'Easily understood by 13-15 year old students';
    if (score >= 60) return 'Easily understood by 15-17 year old students';
    if (score >= 50) return 'Fairly difficult to read';
    if (score >= 30) return 'Difficult to read, best for college graduates';
    return 'Very difficult to read, best for university graduates';
  },

  calculateReadingTime(text) {
    const wordCount = this.countWords(text);
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} min`;
  },

  calculateSpeakingTime(text) {
    const wordCount = this.countWords(text);
    const wordsPerMinute = 130; // Average speaking speed
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} min`;
  },

  calculateAvgWordLength(text) {
    const words = text.match(/\b[\w']+\b/g);
    if (!words || words.length === 0) return 0;
    
    const totalLength = words.reduce((sum, word) => sum + word.length, 0);
    return totalLength / words.length;
  },

  getEmptyAnalysis() {
    return {
      wordCount: 0,
      characterCount: 0,
      characterCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readability: { score: 0, level: 'N/A', description: 'Enter text to analyze' },
      readingTime: '0 min',
      speakingTime: '0 min',
      avgWordLength: 0
    };
  }
};
