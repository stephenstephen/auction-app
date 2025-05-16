import { useState } from 'react';
import { toast } from 'sonner';

import { AuctionStatus } from "@/types/enums";

import { Auction } from '../types/interface';
import { closeAuction } from '../services/auction.service';

interface UseAuctionActionsProps {
  onUpdated: (data: Auction) => Promise<void>;
  onDeleted: (id: string) => Promise<void>;
  auction: Auction;
}


export function useAuctionActions({ onUpdated, onDeleted, auction }: UseAuctionActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleted(auction.id);
      toast.success('Annonce supprimée avec succès.');
    } catch (err) {
      console.error(err);
      toast.error('Une erreur est survenue pendant la suppression.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (data: Partial<Auction>) => {
    try {
      await onUpdated({ ...auction, ...data });
      toast.success('Annonce mise à jour avec succès.');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    }
  };

  const handleClose = async () => {
    try {
      setIsClosing(true);
      const res = await closeAuction(auction.id);
      toast.success(
        res.winnerUsername
          ? `Enchère clôturée — Gagnant : ${res.winnerUsername}`
          : 'Enchère clôturée sans enchères.'
      );
      await onUpdated({ ...auction, status: AuctionStatus.FINISHED });
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la clôture.');
    } finally {
      setIsClosing(false);
    }
  };

  return {
    isDeleting,
    isClosing,
    handleDelete,
    handleUpdate,
    handleClose,
  };
}
