import { Request, Response } from 'express';
import { DI } from '../app';
import * as bcrypt from '@node-rs/bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }
  const user = await DI.userRepository.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Identifiants invalides.' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1d',
  });
  res.json({ token });
};

export const getMe = async (req: Request, res: Response) => {
  const userPayload = req.user as { id: string };
  const user = await DI.userRepository.findOne(userPayload.id);
  if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  res.json({
    id: user.id,
    username: user.username,
    name: user.name,
  });
};
