import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  login as loginRequest,
  register as registerRequest,
} from "../api/authApi";

import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../models/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const ACCESS_TOKEN_KEY = "accessToken";
const AUTH_USER_KEY = "authUser";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapAuthResponseToUser(response: AuthResponse): AuthUser {
  return {
    id: response.userId,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    role: response.role,
  };
}

function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    return null;
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  function saveAuthentication(response: AuthResponse): void {
    const authenticatedUser = mapAuthResponseToUser(response);

    localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
    localStorage.setItem(
      AUTH_USER_KEY,
      JSON.stringify(authenticatedUser),
    );

    setUser(authenticatedUser);
  }

  async function login(request: LoginRequest): Promise<void> {
    const response = await loginRequest(request);

    saveAuthentication(response);
  }

  async function register(request: RegisterRequest): Promise<void> {
    const response = await registerRequest(request);

    saveAuthentication(response);
  }

  function logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);

    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}