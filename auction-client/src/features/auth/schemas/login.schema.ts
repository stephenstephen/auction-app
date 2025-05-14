import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string()
    .required("Nom d'utilisateur requis"),
  password: yup.string()
    .min(6, "Au moins 6 caractères")
    .required("Mot de passe requis"),
});