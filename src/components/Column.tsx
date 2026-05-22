import { useState } from 'react';
import type { Column as ColumnType, Priority } from '../types';
import { AddCardForm } from './AddCardForm';

interface AddCardFields {
  title: string;
  description?: string;
  priority: Priority;
}

interface Props {
  column: ColumnType;
  onAddCard: (fields: AddCardFields) => void;
}

export function Column({ column, onAddCard }: Props) {
  const [showForm, setShowForm] = useState(false);

  function handleAdd(fields: AddCardFields) {
    onAddCard(fields);
    setShowForm(false);
  }

  return (
    <div className="flex flex-col w-80 bg-gray-100 rounded-lg p-4 gap-3">
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {column.label}
      </h2>
      <div className="flex flex-col gap-2 min-h-32">
        {/* Cards rendered here in future slices */}
      </div>
      {showForm ? (
        <AddCardForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded px-2 py-1 text-left"
        >
          + Add card
        </button>
      )}
    </div>
  );
}
