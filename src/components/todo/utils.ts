import { useEffect, useState } from 'react';

export const TODO_HEIGHT = 50;

export function getHeight(items: any[]) {
  const totalHeight = items.length * TODO_HEIGHT;
  // const totalPadding = (items.length - 1) * TODO_PADDING;
  return totalHeight;
}

export function useConstraints(items: any[], width: number) {
  const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    setConstraints({
      top: width - getHeight(items),
      bottom: 0
    });
  }, [items]);

  return constraints;
}
