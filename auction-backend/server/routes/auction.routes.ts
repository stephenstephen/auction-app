import { Router } from 'express'
import { getBuyerAuctions } from '../controllers/auction.controller';
import { getSellerAuctions } from '../controllers/auction.controller';
import { createAuction } from '../controllers/auction.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router()

router.get('/buyer/:id', getBuyerAuctions)
router.get('/seller/:id', getSellerAuctions)
router.post('/', createAuction, authMiddleware as any)

export const AuctionController = router
