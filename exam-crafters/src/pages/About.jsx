import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      className="container-fluid px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>About ExamCrafters</h2>
      <p>ExamCrafters is a platform designed to help NEET aspirants practice multiple-choice questions effectively.</p>
    </motion.div>
  );
}

export default About;