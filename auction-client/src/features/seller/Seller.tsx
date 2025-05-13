import { useAuth } from "@/features/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import Layout from "@/components/Layout";

export default function Seller() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout user={user}>
      {/* Ajoute ici le contenu spécifique à l'espace vendeur si besoin */}
    </Layout>
  );
}

