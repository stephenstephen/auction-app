import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AuctionForm } from './AuctionForm';
import { Button } from '@/components/ui/button';
import { CreateAuctionInput } from '../../types/interface';
import { useState } from 'react';

import React from 'react';
import { formatDateTimeLocal } from '@/lib/utils';

interface Props {
  triggerLabel: React.ReactNode;
  title: string;
  defaultValues?: Partial<CreateAuctionInput>;
  onSubmit: (data: CreateAuctionInput) => Promise<void>;
}

export function AuctionDialog({ triggerLabel, title, defaultValues, onSubmit }: Props) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: CreateAuctionInput) => {
    await onSubmit(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {typeof triggerLabel === 'string' ? (
          <Button type="submit" className="cursor-pointer">{triggerLabel}</Button>
        ) : (
          triggerLabel
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <AuctionForm
          defaultValues={defaultValues ? {
            ...defaultValues,
            terminateAt: defaultValues.terminateAt ? formatDateTimeLocal(defaultValues.terminateAt) : '',
          } : undefined}
          onSubmit={handleSubmit}
          submitLabel={typeof triggerLabel === 'string' ? triggerLabel : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}