import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      className="btn btn-outline-secondary"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </motion.button>
  );
}

export default ThemeToggle;