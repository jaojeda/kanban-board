import type { Column as ColumnType } from '../types';

interface Props {
  column: ColumnType;
}

export function Column({ column }: Props) {
  return (
    <div className="flex flex-col w-80 bg-gray-100 rounded-lg p-4 gap-3">
      <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        {column.label}
      </h2>
      <div className="flex flex-col gap-2 min-h-32">
        {/* Cards rendered here in future slices */}
      </div>
    </div>
  );
}
