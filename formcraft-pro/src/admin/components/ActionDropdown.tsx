import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiEdit2, FiCopy, FiTrash2, FiBarChart2, FiEye } from 'react-icons/fi';

interface ActionDropdownProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onViewEntries: () => void;
  onDelete: () => void;
  onPreview?: () => void;
}

export default function ActionDropdown({
  onEdit,
  onDuplicate,
  onViewEntries,
  onDelete,
  onPreview
}: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 hover:bg-gray-200 rounded transition"
        title="More actions"
      >
        <FiMoreVertical size={16} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleAction(onEdit)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <FiEdit2 size={14} />
              Edit
            </button>
            <button
              onClick={() => handleAction(onDuplicate)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <FiCopy size={14} />
              Duplicate
            </button>
            <button
              onClick={() => handleAction(onViewEntries)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <FiBarChart2 size={14} />
              View Entries
            </button>
            {onPreview && (
              <button
                onClick={() => handleAction(onPreview)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <FiEye size={14} />
                Preview
              </button>
            )}
            <div className="border-t border-gray-200 my-1"></div>
            <button
              onClick={() => handleAction(onDelete)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
