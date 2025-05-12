import { Request, Response } from 'express';
import { DI } from '../app';

export const createBid = async (req: Request, res: Response) => {
  try {
    const bid = DI.bidRepository.create(req.body);
    await DI.orm.em.persistAndFlush(bid);
    if (DI.io) {
      DI.io.emit('bid:new', bid);
    }
    res.json(bid);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
