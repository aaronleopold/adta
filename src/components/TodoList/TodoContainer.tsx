import { motion, PanInfo, useAnimation } from 'framer-motion';
import React from 'react';
import { ITodo } from '../../@types';
import Todo from './Todo';

interface TodoContainerProps {
  height: number;
  width: number;
  index: number;
  todo: ITodo;
  onDelete(): void;
}

type DragEndEvent = MouseEvent | TouchEvent | PointerEvent;

const TodoContainer: React.FC<TodoContainerProps> = ({
  height,
  width,
  index,
  todo,
  onDelete
}) => {
  const controls = useAnimation();

  async function handleDragEnd(_: DragEndEvent, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -(width * 0.75) || velocity < -500) {
      await controls.start({ x: -width, transition: { duration: 0.2 } });
      onDelete();
    } else {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  }

  return (
    <motion.div
      className="rounded-md overflow-hidden mb-[10px]"
      style={{
        // height: TODO_HEIGHT,
        width,
        willChange: 'transform',
        cursor: 'grab'
      }}
      whileTap={{ cursor: 'grabbing' }}
      layout
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
    >
      <motion.div
        style={{ width }}
        className="rounded-md bg-gray-100 dark:bg-trout-800 shadow-sm"
        drag="x"
        dragDirectionLock
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        <Todo {...todo} />
      </motion.div>
    </motion.div>
  );
};

export default TodoContainer;
