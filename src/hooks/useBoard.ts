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

  function deleteCard(columnId: ColumnId, cardId: string) {
    setState((prev) => {
      const column = prev.columns.find((c) => c.id === columnId);
      if (!column?.cardIds.includes(cardId)) return prev;

      const { [cardId]: _, ...remainingCards } = prev.cards;
      return {
        cards: remainingCards,
        columns: prev.columns.map((col) =>
          col.id === columnId
            ? { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) }
            : col
        ),
      };
    });
  }

  return { columns: state.columns, cards: state.cards, addCard, deleteCard };
}
