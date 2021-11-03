import create from 'zustand';

import { invoke } from '@tauri-apps/api';

import { ITodo } from './@types';

interface TodoStore {
  todos: ITodo[] | undefined;

  getTodos(): void;
  setTodos(todos: ITodo[]): void;
  createTodo(text: string): void;
  setTodoStatus(id: number, done: boolean): void;
  setTodoText(id: number, text: string): void;
  deleteTodo(id: number): void;
}

// FIXME: I should probably do something with these errors...

const useStore = create<TodoStore>((set, get) => ({
  todos: undefined,

  getTodos: async () => {
    await invoke('get_todos')
      .then((todos: any) => set({ todos: [...todos] }))
      .catch(err => console.log(err));
  },

  setTodos: todos =>
    set({
      todos
    }),

  createTodo: async text => {
    await invoke('insert_todo', { text })
      // lmao I can't believe how lazy i am sometimes but it's sqlite so not like
      // im exploding the network with my todo app
      .then(() => get().getTodos())
      .catch(err => console.log(err));
  },

  setTodoText: async (id, text) => {
    await invoke('set_todo_text', { id, text })
      // soooooo lazy lol
      .then(() => get().getTodos())
      .catch(err => console.log(err));
  },

  // this is why I got lazy with the rest of these functions...
  setTodoStatus: async (id, done) => {
    let todos = [...(get().todos ?? [])];

    if (!todos || !todos.length) return;

    let index = -1;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      let newArr: ITodo[];

      if (done) {
        const target = todos.splice(index, 1)[0];
        newArr = [...todos, { ...target, done }];
      } else {
        const target = todos[index];
        todos.splice(index, 1, { ...target, done });
        newArr = [...todos];
      }

      await invoke('set_todo_status', { id, done })
        .then((_: any) => set({ todos: newArr }))
        .catch(err => console.log(err));
    }
  },

  deleteTodo: async id => {
    await invoke('delete_todo', { id })
      .then((_: any) => {
        // I'm just lazy really lol
        get().getTodos();
      })
      .catch(err => console.log(err));
  }
}));

export default useStore;
