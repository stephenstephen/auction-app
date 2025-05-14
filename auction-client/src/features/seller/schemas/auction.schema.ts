import * as yup from 'yup';
import { ItemCategory } from '@/types/enums';

export const auctionSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  startPrice: yup.number().required().min(1),
  terminateAt: yup.string()
    .required()
    .test('is-future-date', 'La date de fin doit être dans le futur.', function(value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const now = new Date();
      return selectedDate > now;
    }),
  category: yup.mixed<ItemCategory>().oneOf(Object.values(ItemCategory)).required(),
});