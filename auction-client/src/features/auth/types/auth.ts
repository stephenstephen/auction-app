
export interface User {
  name: string;
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload extends User {}