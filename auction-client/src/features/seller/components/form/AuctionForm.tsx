import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auctionSchema } from '@/features/seller/schemas/auction.schema';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ItemCategory } from '@/types/enums';
import { CreateAuctionInput } from '@/features/seller/types/interface';

interface Props {
  defaultValues?: Partial<CreateAuctionInput>;
  onSubmit: (data: CreateAuctionInput) => Promise<void>;
  submitLabel?: string;
}

function getMinDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

type AuctionFormFields = Omit<CreateAuctionInput, 'seller'>;

export function AuctionForm({ defaultValues, onSubmit, submitLabel = 'Valider' }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuctionFormFields>({
    resolver: yupResolver(auctionSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: AuctionFormFields) => {
    const seller = "";
    const completeData: CreateAuctionInput = {
      ...data,
      seller,
    };
    onSubmit(completeData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label>Titre</Label>
        <Input {...register('title')} />
        <p className="text-sm text-red-500">{errors.title?.message}</p>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea {...register('description')} />
        <p className="text-sm text-red-500">{errors.description?.message}</p>
      </div>

      <div>
        <Label>Prix de départ</Label>
        <Input type="number" {...register('startPrice')} />
        <p className="text-sm text-red-500">{errors.startPrice?.message}</p>
      </div>

      <div>
        <Label>Date de fin</Label>
        <Input
          type="datetime-local"
          min={getMinDateTime()}
          {...register('terminateAt')}
        />
        <p className="text-sm text-red-500">{errors.terminateAt?.message}</p>
      </div>

      <div>
        <Label>Catégorie</Label>
        <select {...register('category')} className="w-full rounded border px-2 py-1">
          {Object.values(ItemCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p className="text-sm text-red-500">{errors.category?.message}</p>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
} 