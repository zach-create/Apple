import { motion } from 'framer-motion';

function PageCurtain() {
  return (
    <motion.div
      className="page-curtain"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
    />
  );
}

export default PageCurtain;
