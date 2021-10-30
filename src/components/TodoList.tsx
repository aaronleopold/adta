import React, { useState } from 'react';
import { ITodo } from '../@types';
import Todo from './Todo';

interface TodoListProps {
  todos?: ITodo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="w-full flex flex-col space-y-2 p-4">
      {todos?.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
