import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <a
        href="/dashboard"
        onClick={e => { e.preventDefault(); navigate('/dashboard'); }}
        className="text-lg font-semibold hover:underline hover:text-blue-800 transition-colors duration-200"
      >
        🏷️ Enchères App
      </a>
      <div className="flex gap-3 items-center">
        <a
          href="/seller"
          onClick={e => { e.preventDefault(); navigate('/seller'); }}
          className="text-blue-700 hover:underline hover:text-blue-900 font-medium transition-colors duration-200"
        >
          Espace Vendeur
        </a>
        <a
          href="/buyer"
          onClick={e => { e.preventDefault(); navigate('/buyer'); }}
          className="text-purple-700 hover:underline hover:text-purple-900 font-medium transition-colors duration-200"
        >
          Espace Acheteur
        </a>
        <Button variant="destructive" onClick={() => { logout(); navigate("/login") }}>
          Déconnexion
        </Button>
      </div>
    </header>
  )
}
