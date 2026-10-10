import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TOKEN_KEY } from '../api/client';
import { authApi } from '../api/services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));

  // On first load, validate the stored token and restore the session
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    authApi
      .me()
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setBooting(false));
  }, []);

  // Global logout when any API call reports an expired token
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, []);

  const persist = useCallback((data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
  }, []);

  const login = useCallback(async (payload) => persist(await authApi.login(payload)), [persist]);
  const register = useCallback(async (payload) => persist(await authApi.register(payload)), [persist]);
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, booting, isAuthenticated: Boolean(user), login, register, logout }),
    [user, booting, login, register, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
