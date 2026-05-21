export type Priority = 'low' | 'medium' | 'high';

export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Card {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  createdAt: number;
}

export interface Column {
  id: ColumnId;
  label: string;
  cardIds: string[];
}

export interface BoardState {
  columns: Column[];
  cards: Record<string, Card>;
}

export const COLUMN_DEFS: Column[] = [
  { id: 'todo', label: 'To Do', cardIds: [] },
  { id: 'in-progress', label: 'In Progress', cardIds: [] },
  { id: 'done', label: 'Done', cardIds: [] },
];
