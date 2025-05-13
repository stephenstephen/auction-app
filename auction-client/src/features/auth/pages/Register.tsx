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
import { registerSchema } from '@/features/auth/validations/register.schema'
import { useMutation } from '@tanstack/react-query'
import { registerRequest } from '@/features/auth/services/auth.service'
import { User } from '@/features/auth/types/auth'

type FormData = yup.InferType<typeof registerSchema>

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      login(data.token as string, data.user as User);
      navigate("/dashboard");
    },
    onError: (error) => {
      if (import.meta.env) {
        import('axios').then(axios => {
          if (axios.default.isAxiosError(error)) {
            setError(error.response?.data?.message || 'Erreur lors de l’inscription');
          } else {
            setError('Erreur lors de l’inscription');
          }
        });
      } else {
        setError('Erreur lors de l’inscription');
      }
    },
  });

  const onSubmit = async (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Créer un compte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 space-y-2">
            <div>
              <Label className="mb-2 block">Nom complet</Label>
              <Input {...register('name')} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Nom d’utilisateur</Label>
              <Input {...register('username')} />
              {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
            </div>
            <div>
              <Label className="mb-2 block">Mot de passe</Label>
              <Input type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="flex flex-row gap-2">
              <Label className="mb-2 block">Rôle</Label>
              {/* <RadioGroup defaultValue="buyer" {...register('role')}>
                <div className="flex items-center space-x-2">
                  {/* <RadioGroupItem value="buyer" id="r1" />
                  <Label htmlFor="r1">Acheteur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <RadioGroupItem value="seller" id="r2" />
                  <Label htmlFor="r2">Vendeur</Label>
                </div>
              </RadioGroup> */}
              
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit">S'inscrire</Button>
            <p className="text-sm text-center">
              Déjà un compte ? <Link to="/login" className="underline">Se connecter</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
