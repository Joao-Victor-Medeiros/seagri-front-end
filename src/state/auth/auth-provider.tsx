import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "ADMIN" | "BENEFICIARIO";

export interface AuthUser {
  username: string;
  role: UserRole;
}

const MOCK_USERS: Array<AuthUser & { password: string; active: boolean }> = [
  { username: "fernando", password: "123456", role: "ADMIN", active: true },
  {
    username: "Eduardo",
    password: "senhaforte123",
    role: "BENEFICIARIO",
    active: false,
  },
];

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (username: string, password: string) => {
    const matchedUser = MOCK_USERS.find(
      (mockUser) =>
        mockUser.active &&
        mockUser.username.toLowerCase() === username.trim().toLowerCase() &&
        mockUser.password === password,
    );

    if (!matchedUser) {
      return false;
    }

    setUser({ username: matchedUser.username, role: matchedUser.role });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
};
