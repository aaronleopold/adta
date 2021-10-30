import React from 'react';
import { ITodo } from '../@types';
import CheckmarkButton from './CheckmarkButton';
import Text from './ui/Text';

interface TodoProps extends ITodo {
  onComplete(id: number): void;
}

const Todo: React.FC<TodoProps> = ({ id, text, done, onComplete }) => {
  return (
    <div className="flex space-x-2 items-center p-2 bg-gray-100 rounded-md">
      <CheckmarkButton />
      <Text>
        {id} - {text}
      </Text>
    </div>
  );
};

export default Todo;
