import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { ITodo } from '../@types';
import Todo from './Todo';
import Label from './ui/Label';

interface TodoListProps {
  todos?: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="w-full flex flex-col space-y-2 p-4">
      <Label>Active</Label>
      <AnimatePresence>
        {todos?.map(todo => (
          <Todo onComplete={id => console.log(id)} key={todo.id} {...todo} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
