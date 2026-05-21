import { useState } from 'react';
import type { Priority } from '../types';

interface CardFields {
  title: string;
  description?: string;
  priority: Priority;
}

interface Props {
  onAdd: (card: CardFields) => void;
  onCancel: () => void;
}

export function AddCardForm({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [titleError, setTitleError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    const card: CardFields = { title: title.trim(), priority };
    if (description.trim()) card.description = description.trim();
    onAdd(card);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setTitleError(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white rounded-md shadow-sm p-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="card-title" className="text-xs font-medium text-gray-600">
          Title
        </label>
        <input
          id="card-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError(false);
          }}
          placeholder="Card title"
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        {titleError && (
          <span className="text-xs text-red-500">Title is required</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="card-description" className="text-xs font-medium text-gray-600">
          Description
        </label>
        <textarea
          id="card-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          rows={2}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="card-priority" className="text-xs font-medium text-gray-600">
          Priority
        </label>
        <select
          id="card-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="flex-1 text-xs font-medium bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 text-xs font-medium bg-gray-100 text-gray-600 rounded px-2 py-1 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
