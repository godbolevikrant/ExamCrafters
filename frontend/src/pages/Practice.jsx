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
  const [started, setStarted] = useState(false);
  const [examType, setExamType] = useState('');
  const [paperSet, setPaperSet] = useState('');
  const [questions, setQuestions] = useState([]);

  const questionBanks = {
    NEET: {
      'A-1': [
        {
          question: 'NEET A-1: What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
          correctAnswer: 'Mitochondria',
        },
        {
          question: 'NEET A-1: Which gas is most abundant in the Earth’s atmosphere?',
          options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
          correctAnswer: 'Nitrogen',
        },
      ],
      'A-2': [
        {
          question: 'NEET A-2: Which organ filters blood in humans?',
          options: ['Heart', 'Liver', 'Kidneys', 'Lungs'],
          correctAnswer: 'Kidneys',
        },
        {
          question: 'NEET A-2: DNA stands for?',
          options: ['Deoxyribonucleic Acid', 'Dinuclear Acid', 'Ribonucleic Acid', 'None'],
          correctAnswer: 'Deoxyribonucleic Acid',
        },
      ],
      'A-3': [
        {
          question: 'NEET A-3: The functional unit of kidney is?',
          options: ['Neuron', 'Nephron', 'Alveoli', 'Neurilemma'],
          correctAnswer: 'Nephron',
        },
        {
          question: 'NEET A-3: Which vitamin is synthesized in the skin?',
          options: ['Vitamin A', 'Vitamin D', 'Vitamin C', 'Vitamin K'],
          correctAnswer: 'Vitamin D',
        },
      ],
    },
    JEE: {
      'A-1': [
        {
          question: 'JEE A-1: What is the derivative of sin(x)?',
          options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
          correctAnswer: 'cos(x)',
        },
        {
          question: 'JEE A-1: Unit of electric current is?',
          options: ['Newton', 'Volt', 'Ampere', 'Coulomb'],
          correctAnswer: 'Ampere',
        },
      ],
      'A-2': [
        {
          question: 'JEE A-2: Integral of 2x dx is?',
          options: ['x^2 + C', '2x + C', 'x + C', 'x^2/2 + C'],
          correctAnswer: 'x^2 + C',
        },
        {
          question: 'JEE A-2: SI unit of force?',
          options: ['Joule', 'Pascal', 'Newton', 'Watt'],
          correctAnswer: 'Newton',
        },
      ],
      'A-3': [
        {
          question: 'JEE A-3: Speed of light in vacuum is approximately?',
          options: ['3×10^8 m/s', '3×10^6 m/s', '3×10^5 km/s', '3×10^7 m/s'],
          correctAnswer: '3×10^8 m/s',
        },
        {
          question: 'JEE A-3: The pH of neutral water at 25°C is?',
          options: ['6', '7', '8', '9'],
          correctAnswer: '7',
        },
      ],
    },
  };

  const availableSets = ['A-1', 'A-2', 'A-3'];

  const startPractice = () => {
    if (!examType || !paperSet) return;
    const selected = questionBanks[examType]?.[paperSet] || [];
    setQuestions(selected);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setStarted(true);
  };

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
      {!started ? (
        <div className="w-100 py-4">
          <h2 className="fw-bold mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
            Choose Exam and Paper Set
          </h2>
          <div className="row g-4 m-0 justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-3 home-card">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Exam</h5>
                    <div className="d-flex gap-3 flex-wrap">
                      <motion.button
                        className={`btn ${examType === 'NEET' ? 'btn-primary' : 'btn-outline-dark'} rounded-pill px-4`}
                        onClick={() => { setExamType('NEET'); setPaperSet(''); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        NEET
                      </motion.button>
                      <motion.button
                        className={`btn ${examType === 'JEE' ? 'btn-primary' : 'btn-outline-dark'} rounded-pill px-4`}
                        onClick={() => { setExamType('JEE'); setPaperSet(''); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        JEE
                      </motion.button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h5 className="fw-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Paper Set</h5>
                    <div className="d-flex gap-2 flex-wrap">
                      {availableSets.map((setId) => (
                        <motion.button
                          key={setId}
                          className={`btn ${paperSet === setId ? 'btn-primary' : 'btn-outline-dark'} rounded-pill px-4`}
                          onClick={() => setPaperSet(setId)}
                          disabled={!examType}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {setId}
                        </motion.button>
                      ))}
                    </div>
                    {!examType && (
                      <small className="d-block mt-2" style={{ color: 'var(--color-muted)' }}>
                        Select an exam first to choose a paper set.
                      </small>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <motion.button
                      className="btn btn-primary rounded-pill px-4"
                      onClick={startPractice}
                      disabled={!examType || !paperSet}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Practice
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 px-3">
            <div>
              <span className="badge-soft">{examType}</span>
              <span className="ms-2 badge-soft">{paperSet}</span>
            </div>
            <small style={{ color: 'var(--color-muted)' }}>
              Question {currentQuestion + 1} of {questions.length}
            </small>
          </div>
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
        </>
      )}
    </div>
  );
}

export default Practice;