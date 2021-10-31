import { motion } from 'framer-motion';
import React from 'react';
import { ITodo } from '../@types';
import CheckmarkButton from './CheckmarkButton';
import Text from './ui/Text';

interface TodoProps extends ITodo {
  onComplete(id: number): void;
}

// https://framerbook.com/animation/example-animations/35-swipe-to-delete/

// TODO: make this prettier of an animation
const Todo: React.FC<TodoProps> = ({ id, text, done, onComplete }) => {
  return (
    <motion.div
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="flex space-x-2 items-center p-2 bg-gray-100 dark:bg-trout-800 shadow-sm rounded-md focus:outline-white"
    >
      <CheckmarkButton done={done} toggleDone={() => onComplete(id)} />
      <Text>{text}</Text>
    </motion.div>
  );
};

export default Todo;
