import { useEffect } from 'react';
import { socket } from '@/lib/socket';
import { toast } from 'sonner';
import { User } from '@/features/auth/types/auth';

export function useAuctionSocket(user?: User | null) {
  useEffect(() => {
    if (!user) return;

    socket.emit('auth', user.id);

    const handleAuctionWon = (data: any) => {
      if (data.winnerId === user.id) {
        console.log('⚡ Notification gagnant :', data);
        toast.success(`Bravo ${data.winnerUsername}, vous avez remporté l'enchère "${data.title}" !`);
      }
    };

    socket.on('auction:won', handleAuctionWon);

    return () => {
      socket.off('auction:won', handleAuctionWon);
    };
  }, [user]);
}
