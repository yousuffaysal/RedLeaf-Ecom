import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// 3D Card Component for Sections
export const Card3D = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    const card = ref.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotateX: -15, y: 50 }}
      animate={isInView ? {
        opacity: 1,
        rotateX: 0,
        y: 0,
        rotateY: mousePosition.x,
        rotateZ: mousePosition.y * 0.1,
      } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={{ scale: 1.02, z: 20 }}
    >
      {children}
    </motion.div>
  );
};

// 3D Text Reveal Component
export const Text3D = ({ children, className = '', delay = 0, stagger = 0.05 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {typeof children === 'string' ? (
        children.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-2"
            variants={{
              hidden: { opacity: 0, rotateX: -90, y: 20 },
              visible: {
                opacity: 1,
                rotateX: 0,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {word}
          </motion.span>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

// 3D Floating Element
export const Float3D = ({ children, className = '', speed = 1, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: [0, -10 * speed, 0],
        rotateX: [0, 5 * speed, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        rotateY: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration: 3 + speed,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateX: {
          duration: 3 + speed,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

// Page 3D Wrapper - Main component
export default function Page3DWrapper({ children, className = '' }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        rotateX: mousePosition.y * 0.5,
        rotateY: mousePosition.x * 0.5,
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </motion.div>
  );
}

// 3D Icon Component
export const Icon3D = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotateY: -180, scale: 0 }}
      animate={isInView ? {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        rotateX: isHovered ? 15 : 0,
        rotateZ: isHovered ? 5 : 0,
        y: isHovered ? -10 : 0,
      } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, z: 30 }}
    >
      {children}
    </motion.div>
  );
};

// 3D Button Component
export const Button3D = ({ children, className = '', onClick, disabled = false }) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        z: 20,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        rotateY: -5,
        rotateX: -5,
        z: 0,
      }}
      transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.button>
  );
};