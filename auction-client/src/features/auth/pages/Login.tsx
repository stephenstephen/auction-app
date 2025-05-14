import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginRequest } from '@/features/auth/services/auth.service'
import { loginSchema } from '@/features/auth/schemas/login.schema'
import { User } from '@/features/auth/types/auth'

type FormData = yup.InferType<typeof loginSchema>;

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  })

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.token as string, data.user as User);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (import.meta.env) {
        import('axios').then(axios => {
          if (axios.default.isAxiosError(error)) {
            setError(error.response?.data?.message || 'Erreur de connexion');
          } else {
            setError('Erreur de connexion');
          }
        });
      } else {
        setError('Erreur de connexion');
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-2">
            <div>
              <Label>Nom d’utilisateur</Label>
              <Input {...register('username')} />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <Label>Mot de passe</Label>
              <Input type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="cursor-pointer">Se connecter</Button>
            <p className="text-sm text-center">
              Pas encore de compte ?{' '}
              <Link to="/register" className="underline">
                Créer un compte
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
