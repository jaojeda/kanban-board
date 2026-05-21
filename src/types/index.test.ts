import { describe, it, expect } from 'vitest';
import { COLUMN_DEFS } from './index';
import type { BoardState, Card, Column } from './index';

describe('COLUMN_DEFS', () => {
  it('defines exactly three columns', () => {
    expect(COLUMN_DEFS).toHaveLength(3);
  });

  it('has columns in order: todo, in-progress, done', () => {
    expect(COLUMN_DEFS.map((c) => c.id)).toEqual(['todo', 'in-progress', 'done']);
  });

  it('initialises every column with an empty cardIds array', () => {
    COLUMN_DEFS.forEach((col) => {
      expect(col.cardIds).toEqual([]);
    });
  });

  it('has a non-empty label on every column', () => {
    COLUMN_DEFS.forEach((col) => {
      expect(col.label.length).toBeGreaterThan(0);
    });
  });
});

describe('BoardState shape', () => {
  it('accepts a valid board state at runtime', () => {
    const card: Card = {
      id: 'card-1',
      title: 'Test card',
      priority: 'medium',
      createdAt: Date.now(),
    };

    const column: Column = {
      id: 'todo',
      label: 'To Do',
      cardIds: ['card-1'],
    };

    const state: BoardState = {
      columns: [column],
      cards: { 'card-1': card },
    };

    expect(state.columns[0]?.cardIds).toContain('card-1');
    expect(state.cards['card-1']?.title).toBe('Test card');
  });

  it('allows cards with optional description omitted', () => {
    const card: Card = {
      id: 'c1',
      title: 'No description',
      priority: 'low',
      createdAt: 0,
    };
    expect(card.description).toBeUndefined();
  });

  it('allows cards with description present', () => {
    const card: Card = {
      id: 'c2',
      title: 'With description',
      description: 'Some detail',
      priority: 'high',
      createdAt: 0,
    };
    expect(card.description).toBe('Some detail');
  });
});
