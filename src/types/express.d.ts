// src/types/express.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // ou um tipo mais específico, como `UserPayload`
    }
  }
}
