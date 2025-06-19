import { Request, Response, NextFunction } from 'express';
import { User as AuthUser } from './auth'; // Assuming User type is exported from auth.ts

export const requireAdminRole = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as AuthUser | undefined;
 
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Administrator access required.' });
  }
  next();
}; 