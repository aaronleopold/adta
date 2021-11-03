import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import useStore from '../../store';
import shallow from 'zustand/shallow';
import TodoListContainer from './TodoListContainer';

const TodoList: React.FC = () => {
  const { todos, deleteTodo } = useStore(state => state, shallow);

  const handleDeleteTodo = (id: number) => {
    if (!todos) return;

    deleteTodo(id);
  };

  return (
    <div className="h-[84%] overflow-y-scroll w-full flex flex-col space-y-2 p-4">
      <AnimatePresence>
        {todos && (
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
                    todos={todos}
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
