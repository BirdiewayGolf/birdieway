// src/server/middleware/error.middleware.ts
export const errorMiddleware = (err: Error, req: any, res: any, next: any) => {
    res.status(500).json({ error: err.message });
  };
  