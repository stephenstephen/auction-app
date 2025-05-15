import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="relative min-h-screen bg-gray-900 flex justify-center items-center text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?business,technology')" }}></div>
      <div className="relative z-10 text-center px-6 sm:px-12">
        <h1 className="text-5xl sm:text-6xl font-semibold mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Bienvenue sur notre plateforme d'enchères
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-80">
          Découvrez des produits uniques, enchérissez et gagnez des offres exceptionnelles.
        </p>
        <Button
          onClick={() => navigate('/login')} 
          className="px-8 py-3 text-xl bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
          Se connecter
        </Button>
      </div>
    </div>
  );
}
