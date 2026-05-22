import { useState } from 'react';
import { COLUMN_DEFS } from '../types';
import type { BoardState, ColumnId, Priority } from '../types';

interface AddCardFields {
  title: string;
  description?: string;
  priority: Priority;
}

const initialState: BoardState = {
  columns: COLUMN_DEFS.map((col) => ({ ...col })),
  cards: {},
};

export function useBoard() {
  const [state, setState] = useState<BoardState>(initialState);

  function addCard(columnId: ColumnId, fields: AddCardFields) {
    const id = crypto.randomUUID();
    const card = {
      id,
      title: fields.title,
      priority: fields.priority,
      createdAt: Date.now(),
      ...(fields.description !== undefined ? { description: fields.description } : {}),
    };

    setState((prev) => ({
      cards: { ...prev.cards, [id]: card },
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? { ...col, cardIds: [...col.cardIds, id] }
          : col
      ),
    }));
  }

  return { columns: state.columns, cards: state.cards, addCard };
}
