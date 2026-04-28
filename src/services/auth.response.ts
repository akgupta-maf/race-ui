export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Country {
  id: number;
  name: string;
}

export interface UserDetails {
  id: number;
  name: string;
  email: string;
  role: Role;
  countries: Country[];
}

export interface LoginResponse {
  status: number;
  access_token: string;
  user: UserDetails;
  message: string;
}
