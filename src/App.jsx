import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import NaturalPage from './pages/NaturalPage';
import SpecialPage from './pages/SpecialPage';
import DetailPage from './pages/DetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { fetchOrchids } from './redux/slices/orchidSlice';
import useTheme from './hooks/useTheme';
import './index.css';

function App() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(fetchOrchids());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/natural" element={<NaturalPage />} />
        <Route path="/special" element={<SpecialPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/detail" element={<Navigate to="/detail/1" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
