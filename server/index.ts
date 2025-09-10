import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Security and performance middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow inline styles/scripts for development
  crossOriginEmbedderPolicy: false
}));
app.use(compression({
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024 // Only compress responses larger than 1KB
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Optimized logging middleware - only for API calls
app.use("/api", (req, res, next) => {
  const start = Date.now();
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    let logLine = `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
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

  // Fixed port for Replit environment
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

        // Browser will open automatically in Replit environment
      }
    );

    // In Replit environment, we need to stick to port 5000
    listener.on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${port} is in use. In Replit environment, frontend must use port 5000.`);
        process.exit(1);
      } else {
        console.error(`❌ Server error: ${err.message}`);
        process.exit(1);
      }
    });
  };

  startServer(DEFAULT_PORT);
})();
