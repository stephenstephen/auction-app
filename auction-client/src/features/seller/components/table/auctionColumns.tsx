import { ColumnDef } from '@tanstack/react-table';
import { Auction } from '../../types/interface';
import { AuctionDialog } from '../form/AuctionDialog';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useAuctionActions } from '@/features/seller/hooks/useAuctionActions';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleChevronDown } from 'lucide-react';

export const auctionColumns = (
  onUpdated: (data: Auction) => Promise<void>,
  onDeleted: (id: string) => Promise<void>
): ColumnDef<Auction>[] => [
  {
    accessorKey: 'title',
    header: 'Titre',
  },
  {
    accessorKey: 'startPrice',
    header: 'Prix de départ',
  },
  {
    accessorKey: 'terminateAt',
    header: 'Fin',
    cell: ({ row }) => new Date(row.original.terminateAt).toLocaleString(),
  },
  {
    accessorKey: 'category',
    header: 'Catégorie',
  },
  {
    accessorKey: 'status',
    header: 'Statut',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const auction = row.original;
      const { handleDelete, handleUpdate, isDeleting } = useAuctionActions({
        onUpdated,
        onDeleted,
        auction,
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <CircleChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AuctionDialog
              triggerLabel={
                <DropdownMenuItem onSelect={e => e.preventDefault()}>Modifier</DropdownMenuItem>
              }
              title="Modifier l’annonce"
              defaultValues={auction}
              onSubmit={handleUpdate}
            />
            
            <ConfirmDialog
              trigger={<DropdownMenuItem className="text-red-600" onSelect={e => e.preventDefault()}>Supprimer</DropdownMenuItem>}
              title={`Supprimer l'annonce "${auction.title}" ?`}
              description="Cette action est irréversible. Voulez-vous vraiment supprimer cette annonce ?"
              confirmLabel="Supprimer"
              cancelLabel="Annuler"
              loading={isDeleting}
              onConfirm={handleDelete}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
