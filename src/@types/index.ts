import React from 'react';

export interface ITodo {
  id: number;
  text: string;
  done: boolean;
  date_created: string;
  date_completed?: string;
}

export interface DefaultProps {
  children: React.ReactNode;
}
