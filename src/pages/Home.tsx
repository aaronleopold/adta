import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api';
import TodoList from '../components/TodoList/TodoList';
import AddTodo from '../components/AddTodo';
import { ITodo } from '../@types';

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>();

  const handleInsertTodo = async (text: string) => {
    const res = await invoke('insert_todo', {
      text
    })
      .then(data => data)
      .catch(e => e);

    getTodos();

    console.log(res);
  };

  const getTodos = async () => {
    await invoke('get_todos')
      .then((data: any) => setTodos(data))
      .catch(err => console.log(err));
  };

  const testConnection = async () => {
    await invoke('test_connection').catch(err =>
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
  // const activeTodos = todos?.filter(it => !it.done);
  // const completedTodos = todos?.filter(it => it.done);

  // TODO: animate between lists
  return (
    <div className="h-[84%] w-full overflow-scroll flex flex-col justify-between items-center">
      <TodoList todos={todos} />

      <AddTodo onAddTodo={handleInsertTodo} />
    </div>
  );
}
