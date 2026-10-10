import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

/** Shared favorite logic: guests are sent to /login, logged-in users toggle optimistically. */
export default function useFavoriteAction(template) {
  const { isAuthenticated } = useAuth();
  const { ids, toggle } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const isFavorite = ids.has(template.id);

  const onClick = (e) => {
    e?.stopPropagation();
    if (!isAuthenticated) {
      toast('Log in to save favorites', { icon: '🔐' });
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    toggle(template);
  };

  return { isFavorite, onClick };
}
