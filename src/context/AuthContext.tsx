import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser, UserRole } from "@/types/auth";
import { login as loginApi, signup as signupApi } from "@/lib/api";
import { AuthContext } from "@/context/AuthContextBase";

const TOKEN_KEY = "janmitram_token";
const USER_KEY = "janmitram_user";

function readInitialUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readInitialUser());
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

  async function login(email: string, password: string) {
    const result = await loginApi({ email, password });
    localStorage.setItem(TOKEN_KEY, result.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user);
    return result.user;
  }

  async function signup(name: string, email: string, password: string, role: UserRole) {
    const result = await signupApi({ name, email, password, role });
    localStorage.setItem(TOKEN_KEY, result.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user);
    return result.user;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      login,
      signup,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
