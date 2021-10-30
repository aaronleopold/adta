import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';

export default function Home() {
  const [todos, setTodos] = useState<any[]>();

  const toggleTheme = () => {
    document.querySelector('html')?.classList.toggle('dark');
  };

  const handleInsertTodo = async (text: string) => {
    const res = invoke('insert_todo', {
      text
    })
      .then(data => data)
      .catch(e => e);

    console.log(res);
  };

  const getTodos = async () => {
    invoke('get_todos')
      .then((data: any) => setTodos(data))
      .catch(err => console.log(err));
  };

  const testConnection = async () => {
    invoke('test_connection').catch(err =>
      console.log('Error with DB connection:', err)
    );
  };

  useEffect(() => {
    testConnection();
    if (!todos) {
      getTodos();
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <TodoList todos={todos} />

      <AddTodo onAddTodo={handleInsertTodo} />
    </div>
  );
}
