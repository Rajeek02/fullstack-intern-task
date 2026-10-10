import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { favoritesApi } from '../api/services';
import { getErrorMessage } from '../api/client';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load the user's favorites whenever the logged-in user changes
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    let active = true;
    setLoading(true);
    favoritesApi
      .list()
      .then((res) => active && setFavorites(res.data))
      .catch((err) => active && toast.error(getErrorMessage(err)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [user]);

  const ids = useMemo(() => new Set(favorites.map((t) => t.id)), [favorites]);

  // Optimistic update: UI changes instantly, rolls back if the API call fails
  const toggle = useCallback(
    async (template) => {
      const isFav = ids.has(template.id);
      const previous = favorites;
      setFavorites(isFav ? favorites.filter((t) => t.id !== template.id) : [{ ...template, is_favorite: true }, ...favorites]);
      try {
        if (isFav) await favoritesApi.remove(template.id);
        else await favoritesApi.add(template.id);
        toast.success(isFav ? 'Removed from favorites' : 'Saved to favorites', { icon: isFav ? '💔' : '💜' });
      } catch (err) {
        setFavorites(previous);
        toast.error(getErrorMessage(err));
      }
    },
    [ids, favorites]
  );

  const value = useMemo(() => ({ favorites, ids, loading, toggle }), [favorites, ids, loading, toggle]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return ctx;
};
