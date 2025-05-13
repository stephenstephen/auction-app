
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required('Le nom est requis'),
  username: yup.string().required("Le nom d'utilisateur est requis"),
  password: yup.string().min(6, '6 caractères minimum').required('Mot de passe requis'),
})