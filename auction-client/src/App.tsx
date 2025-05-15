import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Buyer from './features/buyer/Buyer';
import SellerPage from './features/seller/pages/SellerPage';
import Dashboard from './pages/Dashboard';
import { ProtectedRoute } from '@/features/auth/guards/ProtectedRoute';
import { Toaster, toast } from 'sonner';
import { socket } from '@/lib/socket';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';

export default function App() {

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    socket.emit('auth', user.id);

    socket.on('auction:won', (data) => {
      console.log('⚡ Notification gagnant :', data);
      toast.success(`Bravo ${data.winnerUsername}, vous avez remporté l'enchère "${data.title}" !`);    });

    return () => {
      socket.off('auction:won');
    };
  }, [user]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/seller"
          element={<ProtectedRoute> <SellerPage /> </ProtectedRoute>}
        />
        <Route
          path="/buyer"
          element={<ProtectedRoute> <Buyer /> </ProtectedRoute>}
        />
      </Routes>
      <Toaster richColors position="bottom-right" closeButton />
    </div>
  );
}