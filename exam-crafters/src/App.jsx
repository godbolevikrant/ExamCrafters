import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import { motion } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <Navbar />
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
        </Routes>
      </motion.div>
      <Footer />
    </div>
  );
}

export default App;