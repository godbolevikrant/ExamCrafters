import { useState } from 'react';
import McqCard from '../components/McqCard';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Practice() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
      correctAnswer: 'Mitochondria',
    },
    {
      question: 'Which gas is most abundant in the Earth’s atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
      correctAnswer: 'Nitrogen',
    },
  ];

  const handleAnswer = (isCorrect) => {
    setAnswers([...answers, isCorrect]);
    if (isCorrect) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/results', { state: { score, total: questions.length, answers } });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="container-fluid px-0">
      <ProgressBar progress={((currentQuestion + 1) / questions.length) * 100} />
      <McqCard
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        onAnswer={handleAnswer}
        correctAnswer={questions[currentQuestion].correctAnswer}
      />
      <div className="d-flex justify-content-between">
        <motion.button
          className="btn btn-secondary"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Previous
        </motion.button>
        <motion.button
          className="btn btn-primary"
          onClick={nextQuestion}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </motion.button>
      </div>
    </div>
  );
}

export default Practice;