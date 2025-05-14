import { Router } from 'express'
import { getBuyerAuctions } from '../controllers/auction.controller';
import { getSellerAuctions } from '../controllers/auction.controller';
import { createAuction } from '../controllers/auction.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { updateAuction } from '../controllers/auction.controller';

const router = Router()

router.get('/buyer/:id', authMiddleware, getBuyerAuctions)
router.get('/seller/:id', authMiddleware, getSellerAuctions)
router.post('/', authMiddleware, createAuction)
router.put('/:id', authMiddleware, updateAuction)

export const AuctionController = router
