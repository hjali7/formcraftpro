import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiMove, FiTrash2, FiCopy } from 'react-icons/fi';
import { FormField, useFormStore } from '../store/formStore';

interface SortableFieldProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SortableField({ field, isSelected, onSelect }: SortableFieldProps) {
  const { removeField, addField } = useFormStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleDuplicate(e: React.MouseEvent) {
    e.stopPropagation();
    const newField = {
      ...field,
      id: `field-${Date.now()}`,
      label: `${field.label} (کپی)`
    };
    addField(newField);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirm('آیا از حذف این فیلد اطمینان دارید؟')) {
      removeField(field.id);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group relative p-4 rounded-lg border-2 transition cursor-pointer ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute right-2 top-2 p-2 cursor-move opacity-0 group-hover:opacity-100 transition"
      >
        <FiMove className="text-gray-400" />
      </div>

      {/* Field Content */}
      <div className="pr-8">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 mr-1">*</span>}
          </label>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={handleDuplicate}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
              title="کپی"
            >
              <FiCopy size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
              title="حذف"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        {/* Field Preview */}
        {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
          <input
            type={field.type}
            placeholder={field.placeholder || ''}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            style={{ width: field.styles?.width }}
          />
        ) : field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder || ''}
            disabled
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            style={{ width: field.styles?.width }}
          />
        ) : field.type === 'select' ? (
          <select
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            style={{ width: field.styles?.width }}
          >
            <option>انتخاب کنید...</option>
            {field.options?.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        ) : field.type === 'radio' ? (
          <div className="space-y-2">
            {(field.options || ['گزینه 1', 'گزینه 2']).map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" disabled className="text-blue-600" />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        ) : field.type === 'checkbox' ? (
          <div className="space-y-2">
            {(field.options || ['گزینه 1', 'گزینه 2']).map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="checkbox" disabled className="text-blue-600 rounded" />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        ) : field.type === 'date' ? (
          <input
            type="date"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            style={{ width: field.styles?.width }}
          />
        ) : field.type === 'file' ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50">
            <p className="text-sm text-gray-600">فایل را اینجا بکشید یا کلیک کنید</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
