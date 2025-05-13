import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
    } else {
      setIsLoading(false)
    }
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className={cn("h-8 w-8 animate-spin text-muted-foreground")} />
      </div>
    )
  }
  return <>{children}</>
}
