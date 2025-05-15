import cron from 'node-cron';
import { DI } from '../app';
import { AuctionStatus } from '../../database/types/types';

export function startAuctionCron() {
  cron.schedule('* * * * *', async () => {
    console.log('[CRON] Vérification des enchères à clôturer...');

    const auctions = await DI.auctionRepository.find({
      status: AuctionStatus.ON_GOING,
      terminateAt: { $lte: new Date() },
    }, { populate: ['bids', 'bids.bidder'] });

    for (const auction of auctions) {
      const highestBid = auction.bids.toArray().sort((a, b) => b.price - a.price)[0];

      auction.status = AuctionStatus.FINISHED;
      auction.terminateAt = new Date();

      if (highestBid) {
        auction.winnerId = highestBid.bidder.id;
        DI.io?.to(highestBid.bidder.id).emit('auction:won', {
          title: auction.title,
          price: highestBid.price,
        });
        console.log(`→ Enchère "${auction.title}" remportée par ${highestBid.bidder.username}.`);
      }

      await DI.orm.em.flush();
      DI.io?.emit('auction:closed', {
        title: auction.title,
        price: highestBid?.price ?? null,
        winnerUsername: highestBid?.bidder?.username ?? null,
      });
      console.log(`→ Enchère "${auction.title}" clôturée automatiquement.`);
    }
  });
}
