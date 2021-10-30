import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants
} from 'framer-motion';
import { Plus } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Key, KeyModifier } from '../@types/enums';
import useKeyboardHandler from '../hooks/useKeyboardHandler';
import useToggle from '../hooks/useToggle';
import Heading from './ui/Heading';

interface AddTodoModalProps {
  off(): void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ off }) => {
  return (
    <motion.div
      layoutId="expandable-button"
      className="z-50 max-w-xs max-h-[45%] mx-auto inline-block bg-white dark:bg-theme-900 rounded-lg overflow-hidden shadow-xl w-full p-6"
    >
      <Heading>Create a new Todo:</Heading>
    </motion.div>
  );
};

interface AddTodoButtonProps {
  on(): void;
}

const AddTodoButton: React.FC<AddTodoButtonProps> = ({ on }) => {
  return (
    <motion.button
      onClick={on}
      className="rounded-full p-3 bg-blue-500 text-gray-50"
      layoutId="expandable-button"
    >
      <Plus className="h-8 w-8" />
    </motion.button>
  );
};

interface AddTodoProps {
  onAddTodo(text: string): void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [open, { on, off }] = useToggle(false);
  const [text, setText] = useState('fff');

  const handleAddTodo = useCallback(() => {
    console.log(text);
  }, [text]);

  useEffect(() => {
    return () => setText('');
  }, []);

  useKeyboardHandler([
    { key: Key.Enter, callback: open ? handleAddTodo : undefined },
    { key: Key.Escape, callback: off },
    { key: Key.N, modifier: KeyModifier.Meta, callback: on }
  ]);

  const containerVariants: Variants = {
    open: {
      top: '30%'
    },
    closed: {
      bottom: '2.5%'
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ bottom: '2.5%' }}
        animate={open ? 'open' : 'closed'}
        variants={containerVariants}
        transition={{
          y: { type: 'keyframes' },
          duration: 0.45
        }}
        className="z-50 fixed w-full flex justify-center"
      >
        <AnimateSharedLayout type="crossfade">
          {open ? <AddTodoModal off={off} /> : <AddTodoButton on={on} />}
        </AnimateSharedLayout>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            className="fixed z-10 inset-0 bg-gray-400"
            onClick={off}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTodo;
