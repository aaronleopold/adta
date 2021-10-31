import React from 'react';
import { motion, useMotionValue, useTransform, Variants } from 'framer-motion';
import useToggle from '../hooks/useToggle';
import clsx from 'clsx';

interface CheckmarkButtonProps {
  done: boolean;
  toggleDone(): void;
}

const CheckmarkButton: React.FC<CheckmarkButtonProps> = ({
  // done = true,
  toggleDone
}) => {
  const [done, { toggle }] = useToggle(false);

  const checkVariants = {
    done: { pathLength: 1 },
    notDone: { pathLength: 0 }
  };

  const bgVariants: Variants = {
    done: {
      backgroundColor: '#0A82FA'
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
    <span
      className={clsx(
        done ? 'bg-blue-500' : 'bg-gray-50 dark:bg-transparent',
        'cursor-pointer p-0.5 border border-gray-200 dark:border-trout-500 rounded-full transition duration-200'
      )}
      onClick={handleClick}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          className="text-gray-50"
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={done ? 'done' : 'notDone'}
          variants={checkVariants}
          style={{ pathLength, opacity }}
          transition={{ duration: 0.35 }}
        />
      </svg>
    </span>
  );
};

export default CheckmarkButton;
