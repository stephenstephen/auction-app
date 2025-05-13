import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full text-center animate__animated animate__fadeInDown">
        <h1 className="text-4xl font-bold mb-2 text-blue-700">Bienvenue, {user.name} !</h1>
        <p className="text-lg text-gray-700 mb-8">Heureux de vous retrouver sur votre espace personnel.</p>
        <div className="flex flex-col gap-4">
          <Button className="w-full" onClick={() => navigate("/seller")}>Espace Vendeur</Button>
          <Button className="w-full" onClick={() => navigate("/buyer")}>Espace Acheteur</Button>
        </div>
        <div className="mt-8 text-gray-400 text-sm">Plateforme d'enchères moderne ✨</div>
      </div>
    </div>
  );
}
