import { useState } from 'react';
import { toast } from 'sonner';
import { Auction } from '../types/interface';

interface UseAuctionActionsProps {
  onUpdated: (data: Auction) => Promise<void>;
  onDeleted: (id: string) => Promise<void>;
  auction: Auction;
}

export function useAuctionActions({ onUpdated, onDeleted, auction }: UseAuctionActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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

  return {
    isDeleting,
    handleDelete,
    handleUpdate,
  };
}
