import { Column } from "./components/Column";
import { useBoard } from "./hooks/useBoard";

export function App() {
  const { columns, addCard } = useBoard();

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Kanban Board</h1>
      <div className="flex gap-6 items-start">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddCard={(fields) => addCard(column.id, fields)}
          />
        ))}
      </div>
    </div>
  );
}
