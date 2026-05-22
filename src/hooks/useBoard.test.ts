import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useBoard } from './useBoard';
import { COLUMN_DEFS } from '../types';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useBoard', () => {
  describe('initial state', () => {
    it('returns three columns matching COLUMN_DEFS', () => {
      const { result } = renderHook(() => useBoard());
      expect(result.current.columns).toEqual(COLUMN_DEFS);
    });

    it('starts with no cards', () => {
      const { result } = renderHook(() => useBoard());
      expect(result.current.cards).toEqual({});
    });
  });

  describe('addCard', () => {
    it('adds the card to the cards record', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      expect(Object.values(result.current.cards)).toHaveLength(1);
    });

    it('stores the correct title and priority on the card', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      const card = Object.values(result.current.cards)[0];
      expect(card).toMatchObject({ title: 'Buy milk', priority: 'low' });
    });

    it('includes description on the card when provided', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', {
          title: 'Buy milk',
          description: 'Whole milk only',
          priority: 'low',
        });
      });

      const card = Object.values(result.current.cards)[0];
      expect(card.description).toBe('Whole milk only');
    });

    it('omits description from the card when not provided', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      const card = Object.values(result.current.cards)[0];
      expect(card.description).toBeUndefined();
    });

    it('generates a string id for the card', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      const card = Object.values(result.current.cards)[0];
      expect(typeof card.id).toBe('string');
      expect(card.id.length).toBeGreaterThan(0);
    });

    it('generates unique ids across multiple cards', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Card A', priority: 'low' });
        result.current.addCard('todo', { title: 'Card B', priority: 'low' });
      });

      const ids = Object.keys(result.current.cards);
      expect(ids[0]).not.toBe(ids[1]);
    });

    it('sets createdAt using Date.now()', () => {
      vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      const card = Object.values(result.current.cards)[0];
      expect(card.createdAt).toBe(1_700_000_000_000);
    });

    it("appends the card's id to the target column's cardIds", () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('in-progress', { title: 'Work item', priority: 'high' });
      });

      const cardId = Object.keys(result.current.cards)[0];
      const column = result.current.columns.find((c) => c.id === 'in-progress')!;
      expect(column.cardIds).toContain(cardId);
    });

    it('does not add the card id to other columns', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Buy milk', priority: 'low' });
      });

      const cardId = Object.keys(result.current.cards)[0];
      const otherColumns = result.current.columns.filter((c) => c.id !== 'todo');
      otherColumns.forEach((col) => {
        expect(col.cardIds).not.toContain(cardId);
      });
    });

    it('preserves insertion order within a column', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'First', priority: 'low' });
        result.current.addCard('todo', { title: 'Second', priority: 'medium' });
        result.current.addCard('todo', { title: 'Third', priority: 'high' });
      });

      const column = result.current.columns.find((c) => c.id === 'todo')!;
      const titles = column.cardIds.map((id) => result.current.cards[id].title);
      expect(titles).toEqual(['First', 'Second', 'Third']);
    });

    it('tracks cards in different columns independently', () => {
      const { result } = renderHook(() => useBoard());

      act(() => {
        result.current.addCard('todo', { title: 'Todo card', priority: 'low' });
        result.current.addCard('done', { title: 'Done card', priority: 'high' });
      });

      const todo = result.current.columns.find((c) => c.id === 'todo')!;
      const done = result.current.columns.find((c) => c.id === 'done')!;
      expect(todo.cardIds).toHaveLength(1);
      expect(done.cardIds).toHaveLength(1);
      expect(todo.cardIds[0]).not.toBe(done.cardIds[0]);
    });
  });
});
