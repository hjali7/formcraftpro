import React, { useState } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FormField, useFormStore } from '../store/formStore';

interface FieldEditorProps {
  field: FormField;
  onClose: () => void;
}

export default function FieldEditor({ field, onClose }: FieldEditorProps) {
  const { updateField } = useFormStore();
  const [localField, setLocalField] = useState(field);

  function handleUpdate(updates: Partial<FormField>) {
    const updated = { ...localField, ...updates };
    setLocalField(updated);
    updateField(field.id, updates);
  }

  function addOption() {
    const newOptions = [...(localField.options || []), `گزینه ${(localField.options?.length || 0) + 1}`];
    handleUpdate({ options: newOptions });
  }

  function updateOption(index: number, value: string) {
    const newOptions = [...(localField.options || [])];
    newOptions[index] = value;
    handleUpdate({ options: newOptions });
  }

  function removeOption(index: number) {
    const newOptions = localField.options?.filter((_, i) => i !== index);
    handleUpdate({ options: newOptions });
  }

  const needsOptions = ['select', 'radio', 'checkbox'].includes(field.type);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">تنظیمات فیلد</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            برچسب فیلد
          </label>
          <input
            type="text"
            value={localField.label}
            onChange={(e) => handleUpdate({ label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Placeholder */}
        {['text', 'email', 'textarea', 'number'].includes(field.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن راهنما (Placeholder)
            </label>
            <input
              type="text"
              value={localField.placeholder || ''}
              onChange={(e) => handleUpdate({ placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Required */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={localField.required}
              onChange={(e) => handleUpdate({ required: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">فیلد اجباری</span>
          </label>
        </div>

        {/* Options for select, radio, checkbox */}
        {needsOptions && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                گزینه‌ها
              </label>
              <button
                onClick={addOption}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
              >
                <FiPlus size={14} />
                افزودن
              </button>
            </div>
            <div className="space-y-2">
              {(localField.options || []).map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            عرض فیلد
          </label>
          <select
            value={localField.styles?.width || '100%'}
            onChange={(e) => handleUpdate({ 
              styles: { ...localField.styles, width: e.target.value }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="100%">تمام عرض (100%)</option>
            <option value="75%">سه چهارم (75%)</option>
            <option value="50%">نصف (50%)</option>
            <option value="25%">یک چهارم (25%)</option>
          </select>
        </div>

        {/* Validation for number */}
        {field.type === 'number' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداقل مقدار
              </label>
              <input
                type="number"
                value={localField.validation?.min || ''}
                onChange={(e) => handleUpdate({
                  validation: { ...localField.validation, min: Number(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                حداکثر مقدار
              </label>
              <input
                type="number"
                value={localField.validation?.max || ''}
                onChange={(e) => handleUpdate({
                  validation: { ...localField.validation, max: Number(e.target.value) }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Styling */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">استایل</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                رنگ برچسب
              </label>
              <input
                type="color"
                value={localField.styles?.labelColor || '#374151'}
                onChange={(e) => handleUpdate({
                  styles: { ...localField.styles, labelColor: e.target.value }
                })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                رنگ حاشیه
              </label>
              <input
                type="color"
                value={localField.styles?.borderColor || '#D1D5DB'}
                onChange={(e) => handleUpdate({
                  styles: { ...localField.styles, borderColor: e.target.value }
                })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
