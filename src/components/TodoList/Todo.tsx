import React, { useState } from 'react';
import { ITodo } from '../../@types';
import { Key } from '../../@types/enums';
import useToggle from '../../hooks/useToggle';
import CheckmarkButton from './CheckmarkButton';
import Text from '../ui/Text';

interface TodoProps extends ITodo {}

const Todo: React.FC<TodoProps> = ({ text }) => {
  const [editing, { on, off }] = useToggle(false);
  const [newValue, setNewValue] = useState(text);

  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Key.Enter || e.key === Key.Escape) {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === Key.Enter) {
        // handleChangeTodoText();
        alert('TODO');
      }

      off();
    }
  };

  return (
    <div
      className="p-2 w-full h-full flex space-x-2 items-center"
      onDoubleClick={on}
    >
      <CheckmarkButton done={false} toggleDone={() => {}} />

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
  );
};

export default Todo;
