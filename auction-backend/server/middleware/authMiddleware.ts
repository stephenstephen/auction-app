
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    name: string
  }
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }
  
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET) as unknown as { id: string; name: string };
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}