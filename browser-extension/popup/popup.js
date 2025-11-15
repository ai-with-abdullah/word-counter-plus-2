// Get DOM elements
const textInput = document.getElementById('textInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsDiv = document.getElementById('results');

// Store current data
let currentAnalysis = null;
let currentText = '';

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(targetTab + '-tab').classList.add('active');
  });
});

// Load on startup
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'getSelectedText' }, (response) => {
    if (response && response.text) {
      textInput.value = response.text;
      toolsTextInput.value = response.text;
      analyzeText(response.text);
      
      // Auto-save selected text to history
      if (response.text.length >= 10) {
        saveToHistory(response.text);
      }
    }
  });

  chrome.storage.local.get(['lastText'], (result) => {
    if (result.lastText && !textInput.value) {
      textInput.value = result.lastText;
      toolsTextInput.value = result.lastText;
    }
  });

  loadHistory();
});

// Clear button (Analyze tab)
clearBtn.addEventListener('click', () => {
  textInput.value = '';
  toolsTextInput.value = '';
  resultsDiv.classList.add('hidden');
  resetAllDisplays();
  currentAnalysis = null;
  currentText = '';
  chrome.storage.local.remove(['lastText', 'selectedText']);
  showNotification('Text cleared');
});

// Copy button (Analyze tab)
document.getElementById('copyBtn').addEventListener('click', () => {
  if (!textInput.value) {
    showNotification('No text to copy');
    return;
  }
  navigator.clipboard.writeText(textInput.value).then(() => {
    showNotification('Text copied to clipboard!');
  });
});

// Auto-analyze and auto-save to history
let debounceTimer;
textInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const text = textInput.value.trim();
    if (text) {
      analyzeText(text);
      // Auto-save to history
      if (text.length >= 10) {
        saveToHistory(text);
      }
    } else {
      resultsDiv.classList.add('hidden');
    }
  }, 500);
});

// Main analysis function
function analyzeText(text) {
  if (!text) {
    resultsDiv.classList.add('hidden');
    return;
  }

  currentText = text;
  const analysis = TextAnalyzer.analyze(text);
  currentAnalysis = analysis;

  // Basic stats
  document.getElementById('wordCount').textContent = analysis.wordCount.toLocaleString();
  document.getElementById('charCount').textContent = analysis.characterCount.toLocaleString();
  document.getElementById('charNoSpaces').textContent = (analysis.characterCount - countSpaces(text)).toLocaleString();
  document.getElementById('sentenceCount').textContent = analysis.sentenceCount.toLocaleString();
  document.getElementById('paragraphCount').textContent = analysis.paragraphCount.toLocaleString();
  document.getElementById('lineCount').textContent = countLines(text).toLocaleString();

  // Readability
  const readability = analysis.readability;
  document.getElementById('readabilityScore').textContent = readability.score.toFixed(1);
  document.getElementById('readabilityLevel').textContent = readability.level;

  // Extra stats
  document.getElementById('readingTime').textContent = analysis.readingTime;
  document.getElementById('speakingTime').textContent = analysis.speakingTime;
  document.getElementById('avgWordLength').textContent = analysis.avgWordLength.toFixed(1);

  // Advanced stats
  updateAdvancedStats(text);

  // Extract keywords
  extractKeywords(text);

  resultsDiv.classList.remove('hidden');
}

// Count helpers
function countSpaces(text) {
  return (text.match(/\s/g) || []).length;
}

function countLines(text) {
  return text.split('\n').filter(line => line.trim().length > 0).length;
}

// Advanced statistics
function updateAdvancedStats(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);

  // Unique words
  const uniqueWords = new Set(words);
  document.getElementById('uniqueWords').textContent = uniqueWords.size.toLocaleString();

  // Longest/shortest word
  if (words.length > 0) {
    const sortedByLength = [...words].sort((a, b) => b.length - a.length);
    document.getElementById('longestWord').textContent = sortedByLength[0];
    document.getElementById('shortestWord').textContent = sortedByLength[sortedByLength.length - 1];
  }

  // Average sentence length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length > 0) {
    const avgSentenceLen = Math.round(words.length / sentences.length);
    document.getElementById('avgSentenceLength').textContent = avgSentenceLen + ' words';
  }

  // Word frequency chart
  updateFrequencyChart(words);

  // Find duplicates
  findDuplicates(words);
}

// Word frequency chart
function updateFrequencyChart(words) {
  const freq = {};
  words.forEach(word => {
    if (word.length > 3) {
      freq[word] = (freq[word] || 0) + 1;
    }
  });

  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const chartDiv = document.getElementById('frequencyChart');
  
  if (sorted.length === 0) {
    chartDiv.innerHTML = '<p class="empty-state">No words found</p>';
    return;
  }

  const maxCount = sorted[0][1];
  chartDiv.innerHTML = sorted.map(([word, count]) => `
    <div class="frequency-item">
      <span class="frequency-word">${word}</span>
      <div class="frequency-bar">
        <div class="frequency-fill" style="width: ${(count / maxCount) * 100}%"></div>
      </div>
      <span class="frequency-count">${count}</span>
    </div>
  `).join('');
}

// Find duplicates
function findDuplicates(words) {
  const freq = {};
  words.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });

  const duplicates = Object.entries(freq)
    .filter(([word, count]) => count > 1 && word.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const dupDiv = document.getElementById('duplicateWords');
  
  if (duplicates.length === 0) {
    dupDiv.innerHTML = '<p class="empty-state">No duplicates found</p>';
    return;
  }

  dupDiv.innerHTML = duplicates
    .map(([word, count]) => `<span class="duplicate-tag">${word} (${count}x)</span>`)
    .join('');
}

// Keywords extraction
function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  const wordFreq = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });

  const commonWords = ['this', 'that', 'with', 'from', 'have', 'been', 'will', 'your', 'they', 'about', 'what', 'which', 'their', 'there', 'would', 'could', 'should', 'when', 'where', 'these', 'those', 'then', 'than', 'them', 'some', 'into', 'more', 'very', 'just', 'only', 'over', 'such', 'like', 'also', 'other', 'make', 'time', 'well'];
  
  const keywords = Object.entries(wordFreq)
    .filter(([word]) => !commonWords.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const keywordsList = document.getElementById('keywordsList');
  
  if (keywords.length > 0) {
    keywordsList.innerHTML = keywords
      .map(([word, count]) => `<span class="keyword-tag">${word} (${count})</span>`)
      .join('');
  } else {
    keywordsList.innerHTML = '<p class="empty-state">No keywords found</p>';
  }
}

// Keyword density checker
document.getElementById('checkDensity').addEventListener('click', () => {
  const keyword = document.getElementById('densityKeyword').value.trim().toLowerCase();
  
  if (!keyword || !currentText) {
    alert('Please enter a keyword and analyze text first');
    return;
  }

  const text = currentText.toLowerCase();
  const words = text.replace(/[^\w\s]/g, ' ').split(/\s+/);
  
  const count = words.filter(word => word === keyword).length;
  const density = ((count / words.length) * 100).toFixed(2);

  document.getElementById('densityWord').textContent = keyword;
  document.getElementById('densityCount').textContent = count;
  document.getElementById('densityPercent').textContent = density;
  document.getElementById('densityResult').classList.remove('hidden');
  
  showNotification(`"${keyword}" density: ${density}%`);
});

// Tools tab text area
const toolsTextInput = document.getElementById('toolsTextInput');

// Sync text between Analyze and Tools text areas
textInput.addEventListener('input', () => {
  toolsTextInput.value = textInput.value;
});

toolsTextInput.addEventListener('input', () => {
  textInput.value = toolsTextInput.value;
  
  // Auto-analyze when text is entered in tools tab
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const text = toolsTextInput.value.trim();
    if (text) {
      analyzeText(text);
      // Auto-save to history
      if (text.length >= 10) {
        saveToHistory(text);
      }
    } else {
      resultsDiv.classList.add('hidden');
    }
  }, 500);
});

// Tools tab clear and copy buttons
document.getElementById('toolsClear').addEventListener('click', () => {
  toolsTextInput.value = '';
  textInput.value = '';
  resultsDiv.classList.add('hidden');
  resetAllDisplays();
  showNotification('Text cleared');
});

document.getElementById('toolsCopy').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('No text to copy');
    return;
  }
  navigator.clipboard.writeText(toolsTextInput.value).then(() => {
    showNotification('Text copied to clipboard!');
  });
});

// Text transformation tools
document.getElementById('uppercase').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.toUpperCase();
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Converted to UPPERCASE');
});

document.getElementById('lowercase').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.toLowerCase();
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Converted to lowercase');
});

document.getElementById('titlecase').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Converted to Title Case');
});

document.getElementById('sentencecase').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, l => l.toUpperCase());
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Converted to Sentence case');
});

document.getElementById('removeSpaces').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.replace(/\s+/g, ' ').trim();
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Removed extra spaces');
});

document.getElementById('removeBreaks').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Removed line breaks');
});

document.getElementById('trimText').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.trim();
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Text trimmed');
});

document.getElementById('reverseText').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  toolsTextInput.value = toolsTextInput.value.split('').reverse().join('');
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Text reversed');
});

document.getElementById('sortLines').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  const lines = toolsTextInput.value.split('\n').sort();
  toolsTextInput.value = lines.join('\n');
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Lines sorted A-Z');
});

document.getElementById('removeDuplicateLines').addEventListener('click', () => {
  if (!toolsTextInput.value) {
    showNotification('Please enter text first');
    return;
  }
  const lines = toolsTextInput.value.split('\n');
  const unique = [...new Set(lines)];
  toolsTextInput.value = unique.join('\n');
  textInput.value = toolsTextInput.value;
  analyzeText(toolsTextInput.value);
  showNotification('Duplicate lines removed');
});

// History functionality
function saveToHistory(text) {
  if (!text || text.length < 10) return;

  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    
    // Check if this exact text is already the most recent entry (prevent duplicates)
    if (history.length > 0 && history[0].fullText === text) {
      return;
    }
    
    // Calculate word and character count if analysis is available
    const wordCount = currentAnalysis?.wordCount || text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const charCount = currentAnalysis?.characterCount || text.length;
    
    const entry = {
      text: text.substring(0, 200),
      fullText: text,
      timestamp: Date.now(),
      wordCount: wordCount,
      charCount: charCount
    };

    history.unshift(entry);
    
    if (history.length > 10) {
      history.pop();
    }

    chrome.storage.local.set({ history }, () => {
      loadHistory();
    });
  });
}

function loadHistory() {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    const historyList = document.getElementById('historyList');

    if (history.length === 0) {
      historyList.innerHTML = '<p class="empty-state">No history yet. Start analyzing text!</p>';
      return;
    }

    historyList.innerHTML = history.map((entry, index) => `
      <div class="history-item" data-index="${index}">
        <div class="history-text">${entry.text}</div>
        <div class="history-meta">
          <span>${new Date(entry.timestamp).toLocaleString()}</span>
          <div class="history-stats">
            <span>${entry.wordCount} words</span>
            <span>${entry.charCount} chars</span>
          </div>
        </div>
      </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        textInput.value = history[index].fullText;
        toolsTextInput.value = history[index].fullText;
        analyzeText(history[index].fullText);
        
        // Switch to analyze tab
        document.querySelector('[data-tab="analyze"]').click();
        showNotification('Loaded from history');
      });
    });
  });
}

document.getElementById('clearHistory').addEventListener('click', () => {
  if (confirm('Clear all history?')) {
    chrome.storage.local.set({ history: [] }, () => {
      loadHistory();
      showNotification('History cleared');
    });
  }
});

// Export functions
document.getElementById('exportTXT').addEventListener('click', () => {
  if (!currentAnalysis) {
    alert('Please analyze text first');
    return;
  }
  
  const content = formatExportData('text');
  downloadFile(content, 'word-counter-analysis.txt', 'text/plain');
  showNotification('Downloaded as Text File');
});

document.getElementById('exportCSV').addEventListener('click', () => {
  if (!currentAnalysis) {
    alert('Please analyze text first');
    return;
  }
  
  const csv = formatExportData('csv');
  downloadFile(csv, 'word-counter-analysis.csv', 'text/csv');
  showNotification('Downloaded as CSV');
});

document.getElementById('exportJSON').addEventListener('click', () => {
  if (!currentAnalysis) {
    alert('Please analyze text first');
    return;
  }
  
  const json = JSON.stringify(currentAnalysis, null, 2);
  downloadFile(json, 'word-counter-analysis.json', 'application/json');
  showNotification('Downloaded as JSON');
});

document.getElementById('copyResults').addEventListener('click', () => {
  if (!currentAnalysis) {
    alert('Please analyze text first');
    return;
  }
  
  const text = formatExportData('text');
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!');
  });
});

function formatExportData(format) {
  const a = currentAnalysis;
  const charNoSpaces = a.characterCount - countSpaces(currentText);
  const lines = countLines(currentText);
  
  if (format === 'csv') {
    return `Metric,Value\nWords,${a.wordCount}\nCharacters,${a.characterCount}\nCharacters (No Spaces),${charNoSpaces}\nSentences,${a.sentenceCount}\nParagraphs,${a.paragraphCount}\nLines,${lines}\nReadability Score,${a.readability.score.toFixed(1)}\nReadability Level,${a.readability.level}\nReading Time,${a.readingTime}\nSpeaking Time,${a.speakingTime}\nAvg Word Length,${a.avgWordLength.toFixed(1)}`;
  }
  
  return `Word Counter Plus - Analysis Results

Words: ${a.wordCount.toLocaleString()}
Characters: ${a.characterCount.toLocaleString()}
Characters (No Spaces): ${charNoSpaces.toLocaleString()}
Sentences: ${a.sentenceCount.toLocaleString()}
Paragraphs: ${a.paragraphCount.toLocaleString()}
Lines: ${lines.toLocaleString()}

Readability Analysis:
Score: ${a.readability.score.toFixed(1)}
Level: ${a.readability.level}

Additional Stats:
Reading Time: ${a.readingTime}
Speaking Time: ${a.speakingTime}
Average Word Length: ${a.avgWordLength.toFixed(1)} characters

---
Generated by Word Counter Plus Extension
Visit: https://wordcounterplusapp.com`;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2500);
}

function resetAllDisplays() {
  document.getElementById('keywordsList').innerHTML = '<p class="empty-state">Analyze text first to extract keywords</p>';
  document.getElementById('frequencyChart').innerHTML = '<p class="empty-state">Analyze text to see word frequency</p>';
  document.getElementById('duplicateWords').innerHTML = '<p class="empty-state">Analyze text to find duplicates</p>';
  document.getElementById('densityResult').classList.add('hidden');
}
