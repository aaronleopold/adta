import React from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import useToggle from '../hooks/useToggle';

interface CheckmarkButtonProps {
  done: boolean;
  toggleDone(): void;
}

const CheckmarkButton: React.FC<CheckmarkButtonProps> = ({
  // done = true,
  toggleDone
}) => {
  const [done, { toggle }] = useToggle(false);
  const duration = 0.4;

  const checkVariants = {
    done: { pathLength: 1 },
    notDone: { pathLength: 0 }
  };

  const bgVariants: Variants = {
    done: {
      backgroundColor: 'black'
    },
    notDone: {
      backgroundColor: 'transparent'
    }
  };

  const handleClick = () => {
    toggle();
    toggleDone();
  };

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5], [0, 1]);

  return (
    <motion.span
      className="cursor-pointer p-0.5 border border-gray-200 rounded-full flex items-center justify-center"
      onClick={handleClick}
      initial={false}
      variants={bgVariants}
      transition={{ duration: 0.3 }}
      animate={done ? 'done' : 'notDone'}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 6L9 17L4 12"
          stroke="#5184f9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={done ? 'done' : 'notDone'}
          variants={checkVariants}
          style={{ pathLength, opacity }}
          transition={{ duration }}
        />
      </svg>
    </motion.span>
  );
};

export default CheckmarkButton;
