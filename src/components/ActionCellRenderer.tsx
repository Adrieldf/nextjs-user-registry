import React from 'react';
import { FiSearch, FiTrash } from 'react-icons/fi';

interface ActionCellRendererProps {
  data: any; 
  onView: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ data, onView, onDelete }) => {
  return (
    <div className="flex space-x-2 align-middle justify-center pt-1">
      <button
        onClick={() => onView(data.id)}
        className="p-2 bg-slate-500 text-white rounded text-xs"
        title="View/Edit"
      >
        <FiSearch size={12} />
      </button>
      <button
        onClick={() => onDelete(data.id)}
        className="p-2 bg-slate-500 text-white rounded text-xs"
        title="Delete"
      >
        <FiTrash size={12} />
      </button>
    </div>
  );
};

export default ActionCellRenderer;
