# 📝 Word Counter Plus - Browser Extension

A powerful browser extension that lets you analyze any text on any webpage instantly! Right-click selected text to get word count, character count, readability score, and more.

## ✨ Features

### 📊 Comprehensive Text Analysis
- Word count, character count (with/without spaces)
- Sentence, paragraph, and line counters
- Readability score (Flesch Reading Ease)
- Reading time & speaking time estimates
- Average word length analysis

### 🔍 Advanced Statistics
- **Unique words counter** - Track vocabulary diversity
- **Longest & shortest words** - Identify extremes
- **Word frequency chart** - Visual bar chart of top 10 words
- **Duplicate word finder** - Spot repeated words
- **Average sentence length** - Measure sentence complexity

### 🎯 Keyword Tools
- **Automatic keyword extraction** - Top 12 keywords with frequency
- **Keyword density checker** - SEO-focused density analysis
- Smart common word filtering

### 🛠️ Text Transformation Tools
- **Case Converter**: UPPERCASE, lowercase, Title Case, Sentence case
- **Text Cleanup**: Remove extra spaces, line breaks, trim whitespace
- **Text Manipulation**: Reverse text, sort lines, remove duplicate lines

### 💾 History & Export
- **History feature** - Save and recall last 10 analyses
- **Multiple export formats**: Text, CSV, JSON
- **Copy to clipboard** - Quick sharing

### 🎨 User Experience
- 🎯 **Context Menu Integration** - Right-click selected text
- 💾 **Auto-Save** - Remembers last analyzed text
- 🎨 **Beautiful UI** - Matches Word Counter Plus branding
- 🚀 **100% Offline** - Works without internet connection
- 🔒 **Privacy First** - All processing happens locally, no external requests
- ⚡ **Lightning Fast** - No network dependencies, instant analysis

## 🚀 Installation (For Testing)

### Chrome / Edge / Brave / Opera

1. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
   - **Opera**: `opera://extensions/`

2. Enable **Developer Mode** (toggle in top-right corner)

3. Click **"Load unpacked"**

4. Select the `browser-extension` folder

5. The extension is now installed! Look for the 📝 icon in your toolbar

### Firefox

1. Open Firefox and navigate to: `about:debugging#/runtime/this-firefox`

2. Click **"Load Temporary Add-on..."**

3. Navigate to the `browser-extension` folder and select `manifest.json`

4. The extension is now installed temporarily (will be removed when Firefox closes)

## 📖 How to Use

### Method 1: Context Menu (Primary Method)
1. Select any text on any webpage
2. Right-click the selected text
3. Click **"Analyze with Word Counter Plus"**
4. View instant analysis in the popup

### Method 2: Extension Popup
1. Click the extension icon in your toolbar
2. Paste or type text in the textarea
3. Click **"Analyze Text"** or wait for auto-analysis
4. View detailed results

## 🎨 Branding & Icons

The extension features professionally designed icons that match the Word Counter Plus website branding:

- **Brand Colors**: Primary red (#dc2626 / hsl(348, 83%, 47%))
- **Logo Design**: Pen/feather icon matching the website
- **Typography**: System fonts for optimal offline performance and cross-platform compatibility
- **Icons Included**: All required sizes (16x16, 32x32, 48x48, 128x128) in PNG format

The icons are already generated and ready to use. The source SVG is available in `browser-extension/icons/icon.svg` if you need to make any modifications.

## 🌐 Publishing to Chrome Web Store

### Prerequisites
- Google account
- $5 one-time developer registration fee
- High-quality icons (see above)
- Privacy policy URL (can use your website's privacy page)

### Steps

1. **Use Chrome Manifest**
   ```bash
   # In browser-extension folder
   # Copy manifest-chrome.json to manifest.json
   cp manifest-chrome.json manifest.json
   ```

2. **Create ZIP file**
   - Open the `browser-extension` folder
   - Select ALL files inside (manifest.json, background.js, popup/, utils/, icons/, README.md)
   - **Right-click → Compress/Zip** (DO NOT zip the folder itself!)
   - Name it `word-counter-plus-chrome.zip`

3. **Upload to Chrome Web Store**
   - Go to: https://chrome.google.com/webstore/devconsole
   - Click **"New Item"**
   - Upload the ZIP file
   - Fill in the store listing:
     - **Name**: Word Counter Plus
     - **Description**: Analyze any text instantly - word count, character count, readability score, and more!
     - **Category**: Productivity
     - **Language**: English (or your target language)
     - **Screenshots**: Take screenshots of the extension in action (1280x800 or 640x400)
     - **Icon**: Upload the 128x128 icon
     - **Privacy Policy**: Link to your website's privacy policy

4. **Submit for Review**
   - Review all information
   - Click **"Submit for Review"**
   - Wait 1-3 days for approval

## 🦊 Publishing to Firefox Add-ons

### Prerequisites
- Mozilla account (FREE - no fee!)
- Privacy policy URL

### Steps

1. **Use Firefox Manifest** (Already configured!)
   ```bash
   # The current manifest.json is Firefox-compatible
   # If you switched to Chrome version, restore Firefox version:
   cp manifest-firefox.json manifest.json
   ```

2. **Create ZIP file**
   - Open the `browser-extension` folder
   - Select ALL files inside (manifest.json, background.js, popup/, utils/, icons/)
   - **Right-click → Compress/Zip** (DO NOT zip the folder itself!)
   - Name it `word-counter-plus-firefox.zip`
   
   **Important**: `manifest.json` must be at the ZIP root level, not inside a folder!

3. **Upload to Firefox Add-ons**
   - Go to: https://addons.mozilla.org/developers/
   - Click **"Submit a New Add-on"**
   - Upload the ZIP file
   - **Choose platforms**: ✅ Firefox ✅ Firefox for Android (recommended: both)
   - Fill in the listing details
   - Submit for review (usually approved in 24 hours)

### 🔄 Important: Manifest Differences

**Firefox uses:** `manifest.json` (current - with `browser_specific_settings` and `scripts`)
**Chrome uses:** `manifest-chrome.json` (with `service_worker` and `offline_enabled`)

Both versions are included in the extension folder. Just copy the appropriate one to `manifest.json` before creating your ZIP file for each store.

## 🔧 Development

### File Structure
```
browser-extension/
├── manifest.json           # Extension configuration
├── background.js          # Service worker for context menu
├── popup/
│   ├── popup.html        # Extension popup UI
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup logic
├── utils/
│   └── textAnalysis.js   # Text analysis algorithms
├── icons/
│   ├── icon.svg          # Source icon
│   ├── icon16.png        # 16x16 icon
│   ├── icon32.png        # 32x32 icon
│   ├── icon48.png        # 48x48 icon
│   └── icon128.png       # 128x128 icon
└── README.md             # This file
```

### Making Changes

1. Edit files as needed
2. Go to your browser's extensions page
3. Click the **reload** icon for the extension
4. Test your changes

### Testing Checklist

- [ ] Context menu appears when text is selected
- [ ] Analysis results are accurate
- [ ] Popup UI looks good
- [ ] All statistics calculate correctly
- [ ] Readability score shows proper level
- [ ] Extension works on different websites
- [ ] No console errors
- [ ] Icons display correctly

## 📊 Analytics & Features

The extension analyzes text and provides:

- **Word Count**: Total number of words
- **Character Count**: Total characters (including spaces)
- **Sentence Count**: Number of sentences
- **Paragraph Count**: Number of paragraphs
- **Readability Score**: Flesch Reading Ease (0-100)
  - 90-100: Very Easy (5th grade)
  - 80-90: Easy (6th grade)
  - 70-80: Fairly Easy (7th grade)
  - 60-70: Standard (8th-9th grade)
  - 50-60: Fairly Difficult (10th-12th grade)
  - 30-50: Difficult (College)
  - 0-30: Very Difficult (College graduate)
- **Reading Time**: Based on 200 words/minute
- **Speaking Time**: Based on 130 words/minute
- **Average Word Length**: Average characters per word

## 🔐 Privacy & Security

- ✅ **No data collection** - All analysis happens locally in your browser
- ✅ **100% Offline capable** - Zero external requests, works without internet
- ✅ **No tracking** - We don't track your usage
- ✅ **Minimal permissions** - Only requests contextMenus and storage
- ✅ **Open source** - All code is transparent and reviewable

## 📡 Offline Functionality

**This extension works completely offline!** After installation, you can:
- ✈️ Use it on flights without WiFi
- 🔒 Analyze sensitive text without internet exposure
- ⚡ Get instant results with zero network latency
- 💾 All data stored locally in your browser
- 🌐 No external API calls or font dependencies

**Note**: The footer links (Privacy, Terms, Contact) in the extension point to the Word Counter Plus website and require internet to access. However, all text analysis features work 100% offline.

## 🐛 Troubleshooting

### Extension doesn't appear in toolbar
- Make sure it's enabled in extensions page
- Try reloading the extension
- Restart your browser

### Context menu doesn't show
- Make sure text is selected
- Try right-clicking on the selected text again
- Check if extension is enabled

### Analysis not showing
- Make sure text is actually selected
- Check browser console for errors (F12)
- Try reloading the extension

## 🤝 Support

For issues or questions:
- Visit: https://wordcounterplusapp.com
- Contact: Use the contact form on the website

## 📄 License

This extension is part of the Word Counter Plus project.

---

**Built with ❤️ for Word Counter Plus users**
