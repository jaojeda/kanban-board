import type { Card as CardType, ColumnId } from '../types';
import { COLUMN_DEFS } from '../types';

interface Props {
  card: CardType;
  columnId: ColumnId;
  onDelete?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

const priorityStyles: Record<CardType['priority'], string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const columnIndex = (id: ColumnId) => COLUMN_DEFS.findIndex((c) => c.id === id);

export function Card({ card, columnId, onDelete, onMoveLeft, onMoveRight }: Props) {
  const idx = columnIndex(columnId);
  const isFirst = idx === 0;
  const isLast = idx === COLUMN_DEFS.length - 1;

  return (
    <div className="bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-800">{card.title}</span>
        <button
          aria-label="Delete card"
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 text-xs shrink-0"
        >
          ✕
        </button>
      </div>

      {card.description && (
        <p data-testid="card-description" className="text-xs text-gray-500">
          {card.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[card.priority]}`}>
          {card.priority}
        </span>

        <div className="flex gap-1">
          {!isFirst && (
            <button
              aria-label="Move left"
              onClick={onMoveLeft}
              className="text-gray-400 hover:text-gray-600 text-xs px-1"
            >
              ←
            </button>
          )}
          {!isLast && (
            <button
              aria-label="Move right"
              onClick={onMoveRight}
              className="text-gray-400 hover:text-gray-600 text-xs px-1"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
