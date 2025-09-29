import { useState } from 'react';
import { motion } from 'framer-motion';

function McqCard({ question, options, onAnswer, correctAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onAnswer(option === correctAnswer);
  };

  return (
    <motion.div
      className="card mb-4 mcq-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body p-4">
        <h5 className="card-title mb-3">{question}</h5>
        {options.map((option, index) => (
          <motion.button
            key={index}
            className={`btn ${selectedOption === option ? 'btn-success' : 'btn-outline-light'} w-100 mb-2`}
            onClick={() => handleSelect(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default McqCard;