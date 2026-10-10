import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProtectedRoute, GuestRoute } from './components/RouteGuards';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/favorites" element={<Favorites />} />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
