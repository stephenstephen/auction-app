import { useEffect, useState } from 'react';
import { getMyAuctions, createAuction, updateAuction } from '../services/auction.service';
import Layout from '@/components/Layout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Auction } from '@/features/seller/types/interface';
import { AuctionDialog } from '@/features/seller/components/form/AuctionDialog';
import { auctionColumns } from '@/features/seller/components/table/auctionColumns';
import { DataTable } from '@/components/table/DataTable';

export default function SellerPage() {
  const { user } = useAuth();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const fetchAuctions = async () => {
    const data = await getMyAuctions(user?.id as string);
    setAuctions(data);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <Layout>
       <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mes annonces</h1>
          <AuctionDialog
            triggerLabel="Créer une annonce"
            title="Nouvelle annonce"
            onSubmit={async (data) => {
              await createAuction({ ...data, seller: user?.id as string });
              await fetchAuctions();
            }}
          />
        </div>

        <DataTable
          columns={auctionColumns(async (data: Auction) => {
            // On edit, data must contain the id (from row.original)
            if (data.id) {
              await updateAuction(data.id, { ...data, seller: user?.id as string });
              await fetchAuctions();
            }
          })}
          data={auctions}
        />
      </div>
    </Layout>
  );
}
