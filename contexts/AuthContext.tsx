import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api, setSessionToken } from "../services/api";

const TOKEN_KEY = "auth-session-token";
const USER_KEY = "auth-user-profile";
const BASE = "https://nextwork.ai";

async function refreshProfile(currentUser: AuthUser | null): Promise<AuthUser | null> {
  try {
    const portfolio = await api.getPortfolio();
    const base = currentUser ?? { name: "", initials: "?", avatarUrl: "", bio: "", email: "", joinedLabel: "" };
    const name = portfolio.ownerName || base.name;
    const initials =
      name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase() || "?";
    return {
      ...base,
      name,
      initials,
      avatarUrl: portfolio.ownerPicture ? `${BASE}${portfolio.ownerPicture}` : base.avatarUrl,
      bio: portfolio.description || base.bio,
    };
  } catch {
    return currentUser;
  }
}

export interface AuthUser {
  name: string;
  initials: string;
  avatarUrl: string;
  bio: string;
  email: string;
  joinedLabel: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  loading: boolean;
  user: AuthUser | null;
  sessionToken: string | null;
  login: (token: string, user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [sessionToken, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Restore session from SecureStore on app start
  useEffect(() => {
    async function restore() {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_KEY),
          SecureStore.getItemAsync(USER_KEY),
        ]);

        if (storedToken) {
          setSessionToken(storedToken);
          setToken(storedToken);
          const cached = storedUser ? (JSON.parse(storedUser) as AuthUser) : null;
          if (cached) setUser(cached);
          setLoading(false);

          // Background refresh — picks up any missing avatar/name without blocking launch
          refreshProfile(cached).then(async (fresh) => {
            if (fresh) {
              setUser(fresh);
              await SecureStore.setItemAsync(USER_KEY, JSON.stringify(fresh)).catch(() => {});
            }
          });
          return;
        }
      } catch {
        // SecureStore unavailable (e.g. simulator) — start as guest
      }
      setLoading(false);
    }
    restore();
  }, []);

  const login = useCallback(async (token: string, profile: AuthUser) => {
    setSessionToken(token);
    setToken(token);
    setUser(profile);
    try {
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, token),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(profile)),
      ]);
    } catch {
      // Persist failure is non-fatal — session works for this launch
    }
  }, []);

  const logout = useCallback(async () => {
    setSessionToken("");
    setToken(null);
    setUser(null);
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
      ]);
    } catch {
      // Best-effort cleanup
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!sessionToken,
        loading,
        user,
        sessionToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
