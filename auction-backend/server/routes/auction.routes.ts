import { Router } from 'express'
import { closeAuction, getBuyerAuctions } from '../controllers/auction.controller';
import { getSellerAuctions } from '../controllers/auction.controller';
import { createAuction } from '../controllers/auction.controller';
import { deleteAuction } from '../controllers/auction.controller';
import { authMiddleware } from '../middleware/authMiddleware';
import { updateAuction } from '../controllers/auction.controller';

const router = Router()

router.get('/buyer/:id', authMiddleware, getBuyerAuctions)
router.get('/seller/:id', authMiddleware, getSellerAuctions)
router.post('/', authMiddleware, createAuction)
router.put('/:id', authMiddleware, updateAuction)
router.delete('/:id', authMiddleware, deleteAuction)
router.patch('/:id/close', authMiddleware, closeAuction)

export const AuctionController = router
