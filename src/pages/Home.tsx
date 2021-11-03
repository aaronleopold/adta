import React, { useEffect } from 'react';
import TodoList from '../components/todo/TodoList';
import AddTodo from '../components/AddTodo';
import useStore from '../store';
import shallow from 'zustand/shallow';

export default function Home() {
  const { todos, getTodos } = useStore(state => state, shallow);

  useEffect(() => {
    if (!todos) {
      getTodos();
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <TodoList />
      <AddTodo />
    </div>
  );
}
