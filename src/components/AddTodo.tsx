import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants
} from 'framer-motion';
import { Plus } from 'phosphor-react';
import React, { useState } from 'react';
import { Key, KeyModifier } from '../@types/enums';
import useKeyboardHandler from '../hooks/useKeyboardHandler';
import useToggle from '../hooks/useToggle';
import Button from './ui/Button';
import Input from './ui/Input';

interface AddTodoModalProps {
  createTodo(text: string): void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ createTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo(text);
  };

  return (
    <motion.div
      layoutId="expandable-button"
      className="z-50 inline-block max-w-xs max-h-[45%] mx-auto  bg-white dark:bg-trout-900 dark:bg-theme-900 rounded-lg overflow-hidden shadow-xl w-full p-6"
    >
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Enter your task"
          fullWidth
          autoFocus={true}
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <Button fullWidth variant="primary">
          Create
        </Button>
      </form>
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

  const handleAddTodo = (text: string) => {
    onAddTodo(text);
    off();
  };

  useKeyboardHandler([
    // { key: Key.Enter, callback: open ? handleAddTodo : undefined },
    { key: Key.Escape, callback: off },
    { key: Key.N, modifier: KeyModifier.Meta, callback: on }
  ]);

  const containerVariants: Variants = {
    open: {
      bottom: '50%'
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
        <AnimateSharedLayout>
          {open ? (
            <AddTodoModal createTodo={handleAddTodo} />
          ) : (
            <AddTodoButton on={on} />
          )}
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
