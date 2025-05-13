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
  res.json({ token, user });
};

export const register = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Champs requis manquants.' });
  }

  const existing = await DI.userRepository.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: 'Nom d’utilisateur déjà utilisé.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = DI.userRepository.create({
    name,
    username,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await DI.orm.em.persistAndFlush(user);

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(201).json({ token, user });
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
