import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useToggle from '../hooks/useToggle';

const CheckmarkButton = () => {
  const duration = 0.4;

  const variants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 }
  };

  const [isClicked, { toggle }] = useToggle(false);

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0, 0.5], [0, 1]);

  return (
    <span
      className="cursor-pointer p-0.5 border border-gray-200 rounded-full"
      onClick={toggle}
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
          animate={isClicked ? 'clicked' : 'unclicked'}
          variants={variants}
          style={{ pathLength, opacity }}
          transition={{ duration }}
        />
      </svg>
    </span>
  );
};

export default CheckmarkButton;
