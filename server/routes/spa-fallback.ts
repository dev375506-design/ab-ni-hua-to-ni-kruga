// SPA fallback route handler
import { Request, Response, NextFunction } from 'express';
import path from 'path';

// This middleware will handle all routes that should be handled by the SPA
export function spaFallbackMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip API routes and static files
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next();
  }

  // For all other routes, let the SPA handle routing
  res.sendFile(path.resolve(__dirname, '../../index.html'));
}