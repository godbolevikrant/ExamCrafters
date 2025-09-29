import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Results() {
  const { state } = useLocation();
  const { score, total, answers } = state || { score: 0, total: 0, answers: [] };
  const navigate = useNavigate();

  return (
    <motion.div
      className="container-fluid px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Results</h2>
      <p>Score: {score} / {total}</p>
      <p>Percentage: {total > 0 ? ((score / total) * 100).toFixed(2) : 0}%</p>
      <h3>Answer Summary</h3>
      <ul className="list-group">
        {answers.map((answer, index) => (
          <li key={index} className={`list-group-item ${answer ? 'list-group-item-success' : 'list-group-item-danger'}`}>
            Question {index + 1}: {answer ? 'Correct' : 'Incorrect'}
          </li>
        ))}
      </ul>
      <motion.button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/practice')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retry
      </motion.button>
    </motion.div>
  );
}

export default Results;