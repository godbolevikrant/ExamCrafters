import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import StudentPanel from './pages/StudentPanel';
import DashboardLayout from './layouts/DashboardLayout';
import AdminProfile from './pages/AdminProfile';
import AdminSettings from './pages/AdminSettings';
import StudentProfile from './pages/StudentProfile';
import StudentSettings from './pages/StudentSettings';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/admin') || location.pathname.startsWith('/student');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      {!hideChrome && <Navbar />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<DashboardLayout variant="admin" />}>
            <Route index element={<AdminPanel />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="/student" element={<DashboardLayout variant="student" />}>
            <Route index element={<StudentPanel />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Routes>
      </motion.div>
      {!hideChrome && <Footer />}
    </div>
  );
}

export default App;