import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import open from "open"; // <-- Add this package for auto-opening browser

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite in dev mode, otherwise serve static files
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Auto Port Selection + Auto Browser Open ✅
  const DEFAULT_PORT = parseInt(process.env.PORT || "5000", 10);

  const startServer = (port: number) => {
    const listener = server.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      async () => {
        const url = `http://localhost:${port}`;
        console.clear();
        console.log("\x1b[36m%s\x1b[0m", "====================================");
        console.log("\x1b[32m✅ Server is running successfully!\x1b[0m");
        console.log("\x1b[33m🌐 URL:\x1b[0m", url);
        console.log("\x1b[36m====================================\x1b[0m");

        // Open browser automatically
        await open(url);
      }
    );

    // If port is in use, try next port automatically
    listener.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log(`⚠️  Port ${port} is busy, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(`❌ Server error: ${err.message}`);
        process.exit(1);
      }
    });
  };

  startServer(DEFAULT_PORT);
})();
