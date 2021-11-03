import { motion, useAnimation, useMotionValue } from 'framer-motion';
import React, { useEffect } from 'react';
import { ITodo } from '../../@types';
import TodoContainer from './TodoContainer';
import { getHeight, useConstraints } from './utils';

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
  const y = useMotionValue(0);

  const { bottom } = useConstraints(todos, width);
  const controls = useAnimation();
  // const totalScroll = getHeight(todos);
  // const scrollContainer = height;

  // useEffect(() => {
  //   const newScrollHeight = getHeight(todos);
  //   const bottomOffset = -y.get() + scrollContainer;
  //   const bottomWillBeVisible = newScrollHeight < bottomOffset;
  //   const isScrollHeightLarger = newScrollHeight >= scrollContainer;

  //   // if (bottomWillBeVisible && isScrollHeightLarger) {
  //   //   controls.start({ y: -newScrollHeight + scrollContainer });
  //   // }
  // }, [todos]);

  return (
    <motion.div
      // style={{ y: y, height: totalScroll }}
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
