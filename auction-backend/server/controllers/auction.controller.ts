import { Request, Response } from 'express';
import { DI } from '../app';
import { QueryOrder } from '@mikro-orm/core';

export const getBuyerAuctions = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const [auctions] = await DI.auctionRepository.findAndCount(
    {
      $not: { seller: req.params.id },
    },
    {
      populate: ['seller'],
      orderBy: { terminateAt: QueryOrder.ASC },
      limit: Number(limit),
      offset: Number(page) * Number(limit),
    },
  );
  res.json(auctions);
};

export const getSellerAuctions = async (req: Request, res: Response) => {
  const auctions = await DI.auctionRepository.find({
    seller: req.params.id,
  });
  res.json(auctions);
};

export const createAuction = async (req: Request, res: Response) => {
  try {
    const auction = DI.auctionRepository.create(req.body);
    await DI.orm.em.persistAndFlush(auction);
    res.json(auction);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};
