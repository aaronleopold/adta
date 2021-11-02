import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ITodo } from '../../@types';
import TodoListContainer from './TodoListContainer';

interface TodoListProps {
  todos: ITodo[] | undefined;
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  // FIXME: remove this fake removal and make it real
  const [todoos, setTodoos] = useState(todos);

  const handleDeleteTodo = (index: number) => {
    if (!todoos) return;

    const newItems = [...todoos];
    newItems.splice(index, 1);

    setTodoos(newItems);
  };

  useEffect(() => {
    setTodoos(todos);
  }, [todos]);

  console.log(todoos);

  return (
    <div className="h-full w-full  flex flex-col space-y-2 p-4">
      <AnimatePresence>
        {todoos && (
          <AutoSizer style={{ width: '100%', height: '100%' }}>
            {({ height, width }) => {
              return (
                <motion.div
                  className="rounded-md bg-transparent relative"
                  style={{
                    width,
                    height,
                    transform: 'translateZ(0)'
                  }}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                >
                  <TodoListContainer
                    height={height}
                    width={width}
                    todos={todoos}
                    onDelete={handleDeleteTodo}
                  />
                </motion.div>
              );
            }}
          </AutoSizer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
