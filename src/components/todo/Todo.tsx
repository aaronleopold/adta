import React, { useState } from 'react';

import { ITodo } from '../../@types';
import { Key } from '../../@types/enums';
import useToggle from '../../hooks/useToggle';
import useStore from '../../store';
import Text from '../ui/Text';
import CheckmarkButton from './CheckmarkButton';

interface TodoProps extends ITodo {}

const Todo: React.FC<TodoProps> = ({ id, text, done }) => {
  const { setTodoStatus, setTodoText } = useStore(state => state);

  const [editing, { on, off }] = useToggle(false);
  const [newValue, setNewValue] = useState(text);

  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Key.Enter || e.key === Key.Escape) {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === Key.Enter) {
        setTodoText(id, newValue);
      } else {
        setNewValue(text);
      }

      off();
    }
  };

  return (
    <>
      <div
        className="p-2 w-full h-full flex space-x-2 items-center"
        onDoubleClick={on}
      >
        <CheckmarkButton
          done={done}
          toggleDone={() => setTodoStatus(id, !done)}
        />

        {editing ? (
          <input
            className="todo-edit-input p-0 bg-transparent dark:text-gray-200 text-sm"
            type="text"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            onKeyDown={handleKeyDownEvent}
          />
        ) : (
          <Text className="cursor-default select-none">{text}</Text>
        )}
      </div>
    </>
  );
};

export default Todo;
