import api from '@/lib/api';

import { CreateAuctionInput } from '../types/interface';

export const createAuction = async (payload: CreateAuctionInput) => {
  const { data } = await api.post('/auctions', payload);
  return data;
};

export const getMyAuctions = async (userId: string) => {
  const { data } = await api.get(`/auctions/seller/${userId}`);
  return data.auctions;
};

export const updateAuction = async (id: string, payload: CreateAuctionInput) => {
  const { data } = await api.put(`/auctions/${id}`, payload);
  return data;
};

export const deleteAuction = async (id: string): Promise<void> => {
  await api.delete(`/auctions/${id}`);
};

export const closeAuction = async (id: string): Promise<{ message: string; winnerUsername: string | null }> => {
  const { data } = await api.patch(`/auctions/${id}/close`);
  return data;
};