import { ColumnDef } from '@tanstack/react-table';
import { Auction } from '../../types/interface';
import { AuctionDialog } from '../form/AuctionDialog';

export const auctionColumns = (
  onUpdated: (data: Auction) => Promise<void>
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
    cell: ({ row }) => (
      <AuctionDialog
        triggerLabel={<span className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm cursor-pointer">Modifier</span>}
        title="Modifier l’annonce"
        defaultValues={row.original}
        onSubmit={async (data) => {
          await onUpdated({ ...row.original, ...data });
        }}
      />
    ),
  },
];
