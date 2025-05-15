import { Request, Response } from 'express';
import { DI } from '../app';
import { QueryOrder } from '@mikro-orm/core';
import { AuctionStatus } from '../../database/types/types';

export const getBuyerAuctions = async (req: Request, res: Response) => {
  const { page = 0, limit = 10 } = req.query;
  const [auctions, totalCount] = await DI.auctionRepository.findAndCount(
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
  res.json({ auctions, totalCount });
};

export const getSellerAuctions = async (req: Request, res: Response) => {
  const { page = 0, limit = 10 } = req.query;
  const [auctions, totalCount] = await DI.auctionRepository.findAndCount(
    {
      seller: req.params.id,
    },
    {
      populate: ['seller'],
      orderBy: { terminateAt: QueryOrder.ASC },
      limit: Number(limit),
      offset: Number(page) * Number(limit),
    },
  );
  res.json({ auctions, totalCount });
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

export const updateAuction = async (req: Request, res: Response) => {
  try {
    const auction = await DI.auctionRepository.findOne({ id: req.params.id });
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    DI.auctionRepository.assign(auction, req.body);
    await DI.orm.em.persistAndFlush(auction);
    res.json(auction);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const deleteAuction = async (req: Request, res: Response) => {
  try {
    const auction = await DI.auctionRepository.findOne({ id: req.params.id });
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    await DI.auctionRepository.removeAndFlush(auction);
    res.json({ message: 'Auction deleted successfully' });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
};

export const closeAuction = async (req: Request, res: Response) => {
  const auctionRepo = DI.auctionRepository;
  const bidRepo = DI.bidRepository;

  if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
    return res.status(401).json({ message: 'Utilisateur non authentifié ou token invalide' });
  }

  const auction = await auctionRepo.findOne({
    id: req.params.id,
    seller: req.user.id,
  }, { populate: ['bids'] });

  if (!auction) return res.status(404).json({ message: 'Enchère introuvable' });
  if (auction.status !== 'ON_GOING') return res.status(400).json({ message: 'Enchère déjà clôturée' });

  const highestBid = await bidRepo.findOne(
    { auction: auction.id },
    { orderBy: { price: 'desc' }, populate: ['bidder'] }
  );

  auction.status = AuctionStatus.FINISHED;
  auction.terminateAt = new Date();

  if (highestBid) {
    auction.winnerId = highestBid.bidder.id;
  }

  await DI.orm.em.flush();

  return res.json({ message: 'Enchère clôturée', winner: highestBid?.bidder?.username ?? null });
};
