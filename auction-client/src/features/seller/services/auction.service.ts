import api from '@/lib/api';
import { CreateAuctionInput } from '../types/interface';

export const createAuction = async (payload: CreateAuctionInput) => {
  const { data } = await api.post('/auctions', payload);
  return data;
};

export const getMyAuctions = async (userId: string) => {
  const { data } = await api.get(`/auctions/seller/${userId}`);
  return data;
};

export const updateAuction = async (id: string, payload: CreateAuctionInput) => {
  const { data } = await api.put(`/auctions/${id}`, payload);
  return data;
};
