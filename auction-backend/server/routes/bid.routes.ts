import { Router } from 'express'
import { createBid } from '../controllers/bid.controller';

const router = Router()

router.post('/', createBid)

export const BidController = router

