// src/types.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      email: string;
      [key: string]: any;
    };
  }
}
