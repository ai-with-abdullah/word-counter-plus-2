# Word Counter Plus 📝

A professional, feature-rich word counting and text analysis web application built with React, TypeScript, and Vite. Optimized for SEO and high performance.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/word-counter-plus)

## ✨ Features

### Core Tools
- **Word Counter** - Real-time word counting with advanced statistics
- **Character Counter** - Count characters with/without spaces
- **Text Case Converter** - UPPERCASE, lowercase, Title Case, Sentence case
- **Readability Calculator** - Flesch-Kincaid, Gunning Fog, and more
- **Letter Counter** - Count individual letters and frequencies
- **Sentence Counter** - Analyze sentence structure
- **Paragraph Counter** - Count and analyze paragraphs
- **Line Counter** - Track line counts and formatting

### Additional Features
- **Word Frequency Counter** - Analyze word usage patterns
- **Random Word Generator** - Generate random words for testing
- **Words Per Page Calculator** - Calculate page counts
- **Plagiarism Checker** - Check content originality
- **Resume/CV Checker** - Optimize your resume
- **SEO Content Analyzer** - Optimize content for search engines
- **Speech to Text** - Convert speech to text
- **Grammar Checker** - Check grammar and spelling
- **Text Compare** - Compare two texts side by side

### User Experience
- 🌓 **Dark/Light Mode** - Seamless theme switching
- 📱 **Mobile Responsive** - Perfect on all devices
- ⚡ **Fast Performance** - Optimized with code splitting and lazy loading
- 💾 **Auto-Save** - Never lose your work
- 📤 **File Upload** - Support for TXT, PDF, DOC, DOCX files
- 📥 **Export Options** - Download as PDF, CSV, TXT, JSON
- 🔒 **Privacy First** - All processing happens in your browser

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/word-counter-plus.git

# Navigate to project directory
cd word-counter-plus

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

## 📦 Build & Deploy

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

### Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

**Quick Deploy:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel auto-detects settings
5. Click Deploy!

Your app will be live in seconds. 🎉

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Wouter** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Animations

### Backend (Optional)
- **Express** - Server framework
- **Firebase Firestore** - Database for contact forms
- **Resend** - Email notifications

### Development
- **ESBuild** - Fast JavaScript bundling
- **PostCSS** - CSS processing
- **Drizzle ORM** - Type-safe database queries

## 📁 Project Structure

```
word-counter-plus/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utilities and helpers
│   │   ├── hooks/       # Custom React hooks
│   │   └── data/        # Static data and content
├── server/              # Backend Express server (optional)
├── shared/              # Shared types and schemas
├── browser-extension/   # Chrome/Firefox extension
├── public/              # Static assets
├── vercel.json          # Vercel deployment config
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
# Optional: Firebase (for contact form)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Optional: Email (for notifications)
RESEND_API_KEY=your-resend-key
```

For production deployment on Vercel, add these in the Vercel dashboard under Settings → Environment Variables.

## 🌐 Browser Extension

The project includes a browser extension for Chrome and Firefox:

```bash
cd browser-extension
# Follow the README instructions
```

Features:
- Analyze text on any webpage
- Right-click context menu integration
- Offline support
- Privacy-first (local processing)

## 📊 SEO & Performance

- ✅ Server-side optimized meta tags
- ✅ Dynamic sitemap generation
- ✅ Structured data (JSON-LD)
- ✅ Core Web Vitals optimized
- ✅ Mobile-first responsive design
- ✅ Lazy loading and code splitting
- ✅ Gzip compression
- ✅ Security headers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast development
- [Vercel](https://vercel.com/) for hosting

## 📞 Support

For questions or support:
- 📧 Contact form on the website
- 🐛 [Report issues](https://github.com/YOUR_USERNAME/word-counter-plus/issues)
- 📖 [View documentation](./DEPLOYMENT.md)

## 🔗 Links

- **Live Demo**: [Your Vercel URL]
- **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Repository**: [GitHub](https://github.com/YOUR_USERNAME/word-counter-plus)

---

Made with ❤️ by [Your Name]

**Star ⭐ this repo if you find it useful!**
