import { Column } from "./components/Column";
import { COLUMN_DEFS } from "./types";
import type { BoardState } from "./types";

const initialState: BoardState = {
  columns: COLUMN_DEFS,
  cards: {},
};

export function App() {
  const { columns } = initialState;

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Kanban Board</h1>
      <div className="flex gap-6 items-start">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
}
