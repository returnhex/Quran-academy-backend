import { JwtPayload } from "jsonwebtoken";
// src/types/custom.d.ts

declare module 'express';
declare module 'cors';
declare module 'cookie-parser';
declare module 'jsonwebtoken';
declare module 'bcrypt';
declare module 'nodemailer';
declare module 'http';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
