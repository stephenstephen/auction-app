import api from "@/lib/api";
import { LoginPayload, RegisterPayload } from "@/features/auth/types/auth";

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);  
  return data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};
