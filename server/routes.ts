import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Legacy route redirects - redirect to local routes instead of external subdomains
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

  // Additional legacy route variations
  app.get('/text-case', (req, res) => {
    const queryString = Object.keys(req.query).length > 0 ? 
      '?' + new URLSearchParams(req.query as Record<string, string>).toString() : '';
    res.redirect(301, `/text-case-convert${queryString}`);
  });

  // put application routes here
  // prefix all routes with /api

  const httpServer = createServer(app);

  return httpServer;
}
