import { Request, Response } from 'express';
import { DI } from '../app';
import * as bcrypt from '@node-rs/bcrypt';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id || '';
    const user = await DI.userRepository.findOne(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
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
  const { password: _, ...safeUser } = user;
  return res.status(201).json(safeUser);
};
