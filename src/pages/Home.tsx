import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import CompletedList from '../components/CompletedList';

export default function Home() {
  const [todos, setTodos] = useState<any[]>();

  const handleInsertTodo = async (text: string) => {
    const res = invoke('insert_todo', {
      text
    })
      .then(data => data)
      .catch(e => e);

    getTodos();

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

  // TODO: optimize this into one loop, not two
  const activeTodos = todos?.filter(it => !it.done);
  const completedTodos = todos?.filter(it => it.done);

  // TODO: animate between lists

  return (
    <div className="h-[84%] overflow-scroll flex flex-col justify-between items-center">
      <TodoList todos={activeTodos} />

      {completedTodos?.length ? <CompletedList todos={completedTodos} /> : null}

      <AddTodo onAddTodo={handleInsertTodo} />
    </div>
  );
}
