
import { useState, useEffect } from 'react';
import McqCard from '../components/McqCard';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';
import { FaBookOpen, FaLightbulb, FaSmile } from 'react-icons/fa';
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
  const [paperSets, setPaperSets] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('/api/papersets')
      .then(res => res.json())
      .then(data => setPaperSets(Array.isArray(data) ? data : []))
      .catch(() => setPaperSets([]));
  }, []);

  const startPractice = () => {
    if (!paperSet) return;
    const selectedSet = Array.isArray(paperSets) ? paperSets.find(set => set._id === paperSet) : null;
    setQuestions(selectedSet ? selectedSet.questions : []);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setStarted(true);
    setFeedback('');
  };

  const handleAnswer = (isCorrect) => {
    setAnswers([...answers, isCorrect]);
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Correct! Great job!');
    } else {
      setFeedback('Oops! Try the next one.');
    }
    setTimeout(() => setFeedback(''), 1200);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback('');
    } else {
      setStarted(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setFeedback('');
    }
  };

  // Generate 100 paper sets labeled A-001 to A-100 for UI
  const generatedPaperSets = examType
    ? Array.from({ length: 100 }, (_, i) => ({
        _id: `A-${String(i + 1).padStart(3, '0')}`,
        title: `A-${String(i + 1).padStart(3, '0')}`
      }))
    : [];

  return (
    <div className="container py-4 px-2 px-md-5">
      <div className="text-center mb-4">
        <FaBookOpen size={40} className="text-primary mb-2" />
        <h1 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Practice Zone</h1>
        <p className="lead ">Sharpen your skills with real exam questions. Every attempt makes you better!</p>
      </div>
      {!started ? (
        <div className="row justify-content-center">
          <div className="col-lg-7 col-md-10">
            <div className="card border-0 shadow-lg rounded-4 mb-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3 text-secondary">Select Exam</h4>
                <div className="d-flex gap-3 mb-4 justify-content-center">
                  <motion.button
                    className={`btn ${examType === 'NEET' ? 'btn-purple' : 'btn-outline-purple'} rounded-pill px-4 fw-semibold`}
                    style={{ backgroundColor: examType === 'NEET' ? '#7c3aed' : 'transparent', color: examType === 'NEET' ? '#fff' : '#7c3aed', borderColor: '#7c3aed' }}
                    onClick={() => { setExamType('NEET'); setPaperSet(''); }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    NEET
                  </motion.button>
                  <motion.button
                    className={`btn ${examType === 'JEE' ? 'btn-teal' : 'btn-outline-teal'} rounded-pill px-4 fw-semibold`}
                    style={{ backgroundColor: examType === 'JEE' ? '#14b8a6' : 'transparent', color: examType === 'JEE' ? '#fff' : '#14b8a6', borderColor: '#14b8a6' }}
                    onClick={() => { setExamType('JEE'); setPaperSet(''); }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    JEE
                  </motion.button>
                </div>
                <h4 className="fw-bold mb-3 text-secondary">Select a Paper Set</h4>
                {examType === '' && (
                  <div className="text-muted text-center mb-3">Please select an exam type above.</div>
                )}
                <div className="d-flex gap-2 flex-wrap mb-4">
                  {generatedPaperSets.map((set, idx) => (
                    <motion.button
                      key={set._id}
                      className={`btn ${paperSet === set._id ? (idx % 2 === 0 ? 'btn-orange' : 'btn-blue') : (idx % 2 === 0 ? 'btn-outline-orange' : 'btn-outline-blue')} rounded-pill px-4 fw-semibold`}
                      style={{ backgroundColor: paperSet === set._id ? (idx % 2 === 0 ? '#fb923c' : '#3b82f6') : 'transparent', color: paperSet === set._id ? '#fff' : (idx % 2 === 0 ? '#fb923c' : '#3b82f6'), borderColor: idx % 2 === 0 ? '#fb923c' : '#3b82f6' }}
                      onClick={() => setPaperSet(set._id)}
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {set.title}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  className="btn rounded-pill px-4 w-100"
                  style={{ backgroundColor: '#22c55e', color: '#fff', borderColor: '#22c55e' }}
                  onClick={startPractice}
                  disabled={!paperSet}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLightbulb className="me-2" /> Start Practice
                </motion.button>
              </div>
            </div>
            {answers.length > 0 && !started && (
              <div className="card border-0 shadow-sm rounded-4 mt-3">
                <div className="card-body text-center">
                  <FaSmile size={32} className="text-success mb-2" />
                  <h5 className="fw-bold mb-2">Session Summary</h5>
                  <p className="mb-1">You answered <span className="fw-bold">{score}</span> out of <span className="fw-bold">{answers.length}</span> correctly.</p>
                  <button className="btn btn-outline-secondary rounded-pill px-4" style={{ borderColor: '#7c3aed', color: '#7c3aed' }} onClick={() => setAnswers([])}>Clear Summary</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-11">
            <div className="card border-0 shadow-lg rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-info text-dark px-3 py-2">{examType} Paper: {paperSet}</span>
                  <span className="text-muted">Question {currentQuestion + 1} of {questions.length}</span>
                </div>
                <ProgressBar progress={((currentQuestion + 1) / questions.length) * 100} />
                <div className="mt-4 mb-3">
                  <McqCard
                    question={questions[currentQuestion]?.question}
                    options={questions[currentQuestion]?.options}
                    onAnswer={handleAnswer}
                    correctAnswer={questions[currentQuestion]?.correctAnswer}
                  />
                </div>
                {feedback && (
                  <motion.div
                    className={`alert ${feedback.includes('Correct') ? 'alert-success' : 'alert-warning'} text-center fw-semibold`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {feedback}
                  </motion.div>
                )}
                <div className="d-flex justify-content-between mt-4">
                  <motion.button
                    className="btn rounded-pill px-4"
                    style={{ backgroundColor: '#7c3aed', color: '#fff', borderColor: '#7c3aed' }}
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    className="btn rounded-pill px-4"
                    style={{ backgroundColor: '#fb923c', color: '#fff', borderColor: '#fb923c' }}
                    onClick={nextQuestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Practice;