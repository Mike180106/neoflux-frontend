export interface RegisterRequest {
  firstName: string;
  lastName: string;
  birthDate: string; // formato yyyy-mm-dd
  country: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  phone: string;
  identificationType: string;
  identificationNumber: string;
  company: string;
  email: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
