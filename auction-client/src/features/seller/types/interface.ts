import { AuctionStatus, ItemCategory } from "@/types/enums"

export interface Auction {
  id: string
  title: string
  description: string
  category: ItemCategory
  startPrice: number
  terminateAt: string
  status: AuctionStatus
}

export interface CreateAuctionInput {
  seller: string;
  title: string;
  description: string;
  startPrice: number;
  terminateAt: string;
  category: ItemCategory;
}
