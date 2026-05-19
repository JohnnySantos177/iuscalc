export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'super_admin';
  plan: 'standard' | 'premium';
  phone?: string;
  created_at: string;
  trial_end_date?: string;
  nomeEscritorio?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  confirmPassword: string;
}

export interface PasswordResetData {
  email: string;
}
