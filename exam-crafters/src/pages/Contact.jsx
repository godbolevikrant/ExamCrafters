import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div
      className="container-fluid px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Contact Us</h2>
      <p>Email: support@examcrafters.com</p>
      <p>Phone: +91 123-456-7890</p>
    </motion.div>
  );
}

export default Contact;