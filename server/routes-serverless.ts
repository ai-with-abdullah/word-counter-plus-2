import type { Express } from "express";
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getFirestore } from './firebase';
import { db } from './db';
import dotenv from "dotenv";
dotenv.config();


const __dirname = path.dirname(fileURLToPath(import.meta.url));

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export function registerRoutesOnly(app: Express): void {
  app.get('/text-case-converter', (req, res) => {
    const queryString = Object.keys(req.query).length > 0 ? 
      '?' + new URLSearchParams(req.query as Record<string, string>).toString() : '';
    res.redirect(301, `/text-case-convert${queryString}`);
  });

  app.get('/text-case-converter/', (req, res) => {
    const queryString = Object.keys(req.query).length > 0 ? 
      '?' + new URLSearchParams(req.query as Record<string, string>).toString() : '';
    res.redirect(301, `/text-case-convert${queryString}`);
  });

  app.get('/text-case', (req, res) => {
    const queryString = Object.keys(req.query).length > 0 ? 
      '?' + new URLSearchParams(req.query as Record<string, string>).toString() : '';
    res.redirect(301, `/text-case-convert${queryString}`);
  });

  app.get('/sitemap.xml', async (req, res) => {
    try {
      const SITE_URL = 'https://wordcounterplusapp.com';
      
      const staticPages = [
        { url: '/', priority: 1.0, changefreq: 'daily' },
        { url: '/seo-content-analyzer', priority: 0.95, changefreq: 'weekly' },
        { url: '/plagiarism-checker', priority: 0.95, changefreq: 'weekly' },
        { url: '/resume-cv-checker', priority: 0.95, changefreq: 'weekly' },
        { url: '/tools', priority: 0.9, changefreq: 'weekly' },
        { url: '/character-counter', priority: 0.9, changefreq: 'weekly' },
        { url: '/text-case-convert', priority: 0.9, changefreq: 'weekly' },
        { url: '/word-frequency-counter', priority: 0.85, changefreq: 'weekly' },
        { url: '/random-word-generator', priority: 0.85, changefreq: 'weekly' },
        { url: '/words-per-page', priority: 0.85, changefreq: 'weekly' },
        { url: '/speech-to-text', priority: 0.85, changefreq: 'weekly' },
        { url: '/readability-calculator', priority: 0.85, changefreq: 'weekly' },
        { url: '/grammar-checker', priority: 0.9, changefreq: 'weekly' },
        { url: '/text-compare', priority: 0.85, changefreq: 'weekly' },
        { url: '/about', priority: 0.8, changefreq: 'monthly' },
        { url: '/blog', priority: 0.8, changefreq: 'daily' },
        { url: '/contact', priority: 0.7, changefreq: 'monthly' },
        { url: '/faq', priority: 0.7, changefreq: 'monthly' },
        { url: '/privacy', priority: 0.5, changefreq: 'yearly' },
        { url: '/terms', priority: 0.5, changefreq: 'yearly' },
        { url: '/disclaimer', priority: 0.5, changefreq: 'yearly' },
        { url: '/cookies', priority: 0.5, changefreq: 'yearly' }
      ];

      const blogPostsData: Array<{ url: string; changefreq: string; priority: number; lastmod: string }> = [];
      
      try {
        const { blogPosts } = await import('../client/src/data/blogData.ts');
        
        blogPosts.forEach((post: any) => {
          blogPostsData.push({
            url: `/blog/${post.slug}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: post.publishDate ? new Date(post.publishDate).toISOString() : new Date().toISOString()
          });
        });
        
        console.log(`✅ Loaded ${blogPostsData.length} blog posts for sitemap`);
      } catch (error) {
        console.error('Error loading blog posts for sitemap:', error);
      }

      const allUrls = [...staticPages, ...blogPostsData];

      let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
      
      allUrls.forEach(urlData => {
        xmlContent += '  <url>\n';
        xmlContent += `    <loc>${SITE_URL}${urlData.url}</loc>\n`;
        if ('lastmod' in urlData && urlData.lastmod) {
          xmlContent += `    <lastmod>${urlData.lastmod}</lastmod>\n`;
        }
        xmlContent += `    <changefreq>${urlData.changefreq}</changefreq>\n`;
        xmlContent += `    <priority>${urlData.priority}</priority>\n`;
        
        if (urlData.url === '/' || urlData.url === '/tools') {
          xmlContent += `    <image:image>\n`;
          xmlContent += `      <image:loc>${SITE_URL}/og-image.png</image:loc>\n`;
          xmlContent += `      <image:title>Word Counter Plus - Professional Text Analysis Tool</image:title>\n`;
          xmlContent += `      <image:caption>Free online word counter, character counter, and text analysis tool</image:caption>\n`;
          xmlContent += `    </image:image>\n`;
        }
        
        xmlContent += '  </url>\n';
      });
      
      xmlContent += '</urlset>';

      res.header('Content-Type', 'application/xml');
      res.send(xmlContent);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  app.get('/robots.txt', (req, res) => {
    const SITE_URL = 'https://wordcounterplusapp.com';
    const robotsContent = `# Robots.txt for Word Counter Plus
# Optimized for search engines (Google, Bing, Yahoo, DuckDuckGo)

User-agent: *
Allow: /
Allow: /seo-content-analyzer
Allow: /plagiarism-checker
Allow: /resume-cv-checker
Allow: /character-counter
Allow: /text-case-convert
Allow: /word-frequency-counter
Allow: /random-word-generator
Allow: /words-per-page
Allow: /blog

Disallow: /admin/
Disallow: /api/
Disallow: /drafts/
Disallow: /*.pdf$
Disallow: /private/
Disallow: /.local/
Disallow: /server/

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    
    res.header('Content-Type', 'text/plain');
    res.send(robotsContent);
  });

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = [], basePath: string = ''): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const relativePath = basePath ? path.join(basePath, file) : file;
      
      if ([
        'node_modules', '.git', 'dist', '.replit', '.env', '.env.local', 
        'attached_assets', '.next', 'coverage', '.nyc_output', 'logs',
        '.cache', 'tmp', 'temp', '.npm', '.pnpm'
      ].includes(file)) {
        return;
      }

      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, relativePath);
      } else {
        arrayOfFiles.push(relativePath);
      }
    });

    return arrayOfFiles;
  }

  app.post('/api/upload-to-github', async (req, res) => {
    try {
      const authHeader = req.headers['x-replit-upload-auth'];
      const expectedAuth = process.env.REPL_IDENTITY || process.env.WEB_REPL_RENEWAL;
      
      if (!authHeader || !expectedAuth || authHeader !== expectedAuth) {
        return res.status(401).json({ 
          success: false, 
          message: 'Unauthorized: Invalid authentication token' 
        });
      }

      const octokit = await getUncachableGitHubClient();
      
      const { data: user } = await octokit.rest.users.getAuthenticated();
      const owner = user.login;
      const repo = 'word-counter-plus-2';
      
      let repository;
      try {
        const { data } = await octokit.rest.repos.get({ owner, repo });
        repository = data;
      } catch (error: any) {
        if (error.status === 404) {
          const { data } = await octokit.rest.repos.createForAuthenticatedUser({
            name: repo,
            description: 'Word Counter Plus - Advanced text analysis tool',
            private: false,
            auto_init: true
          });
          repository = data;
        } else {
          throw error;
        }
      }

      let currentCommitSha;
      try {
        const { data: refData } = await octokit.rest.git.getRef({
          owner,
          repo,
          ref: 'heads/main'
        });
        currentCommitSha = refData.object.sha;
      } catch (error: any) {
        if (error.status === 409) {
          currentCommitSha = null;
        } else {
          throw error;
        }
      }

      const projectRoot = path.resolve(__dirname, '..');
      const files = getAllFiles(projectRoot);
      
      const blobs: { path: string; sha: string; mode: "100644" }[] = [];
      
      for (const filePath of files) {
        const fullPath = path.join(projectRoot, filePath);
        const content = fs.readFileSync(fullPath);
        
        const { data: blob } = await octokit.rest.git.createBlob({
          owner,
          repo,
          content: content.toString('base64'),
          encoding: 'base64'
        });
        
        blobs.push({
          path: filePath.replace(/\\/g, '/'),
          sha: blob.sha,
          mode: '100644'
        });
      }

      const { data: tree } = await octokit.rest.git.createTree({
        owner,
        repo,
        tree: blobs,
        base_tree: currentCommitSha ? undefined : undefined
      });

      const { data: commit } = await octokit.rest.git.createCommit({
        owner,
        repo,
        message: 'Upload Word Counter Plus website from Replit',
        tree: tree.sha,
        parents: currentCommitSha ? [currentCommitSha] : []
      });

      if (currentCommitSha) {
        await octokit.rest.git.updateRef({
          owner,
          repo,
          ref: 'heads/main',
          sha: commit.sha
        });
      } else {
        await octokit.rest.git.createRef({
          owner,
          repo,
          ref: 'refs/heads/main',
          sha: commit.sha
        });
      }

      res.json({ 
        success: true, 
        message: 'Code successfully uploaded to GitHub!',
        repository_url: repository.html_url,
        commit_sha: commit.sha,
        files_uploaded: files.length
      });

    } catch (error: any) {
      console.error('GitHub upload error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to upload to GitHub', 
        error: error.message 
      });
    }
  });
}
