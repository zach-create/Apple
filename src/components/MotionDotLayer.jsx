import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function MotionDotLayer() {
  const { flyingDots, dismissFlyingDot } = useCart();

  return (
    <div className="motion-dot-layer" aria-hidden="true">
      {flyingDots.map((dot) => (
        <motion.span
          key={dot.id}
          className="flying-dot"
          initial={{
            x: dot.startX,
            y: dot.startY,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: dot.endX,
            y: dot.endY,
            scale: 0.3,
            opacity: [1, 1, 0.2],
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => dismissFlyingDot(dot.id)}
        />
      ))}
    </div>
  );
}

export default MotionDotLayer;
