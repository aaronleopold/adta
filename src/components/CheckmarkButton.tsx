import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';

interface CheckmarkButtonProps {
  done: boolean;
  toggleDone(): void;
}

const CheckmarkButton: React.FC<CheckmarkButtonProps> = ({
  done,
  toggleDone
}) => {
  const checkVariants = {
    done: { pathLength: 1 },
    notDone: { pathLength: 0 }
  };

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5], [0, 1]);

  return (
    <button
      className={clsx(
        done ? 'bg-blue-500' : 'bg-gray-100 dark:bg-transparent',
        'z-10 p-0.5 border border-gray-200 dark:border-trout-500 rounded-full transition duration-200'
      )}
      onClick={toggleDone}
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
    </button>
  );
};

export default CheckmarkButton;
