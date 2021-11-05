import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { ITodo } from '../../@types';
import TodoContainer from './TodoContainer';
import { useConstraints } from './utils';

interface TodoListContainerProps {
  height: number;
  width: number;
  todos: ITodo[];
  onDelete(index: number): void;
}

const TodoListContainer: React.FC<TodoListContainerProps> = ({
  height,
  width,
  todos,
  onDelete
}) => {
  const { bottom } = useConstraints(todos, width);
  const controls = useAnimation();

  return (
    <motion.div
      drag="y"
      dragDirectionLock
      dragConstraints={{ top: 0, bottom }}
      animate={controls}
    >
      {todos.map((todo, index) => {
        return (
          <TodoContainer
            key={todo.id}
            index={index}
            width={width}
            height={height}
            todo={todo}
            onDelete={() => onDelete(todo.id)}
          />
        );
      })}
    </motion.div>
  );
};

export default TodoListContainer;
