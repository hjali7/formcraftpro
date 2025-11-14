import React from 'react';
import { FiType, FiMail, FiAlignLeft, FiList, FiCircle, FiCheckSquare, FiHash, FiCalendar, FiUpload } from 'react-icons/fi';
import { FormField } from '../store/formStore';

interface FieldPaletteProps {
  onAddField: (type: FormField['type']) => void;
}

const fieldTypes = [
  { type: 'text' as const, label: 'فیلد متنی', icon: FiType, color: 'blue' },
  { type: 'email' as const, label: 'ایمیل', icon: FiMail, color: 'purple' },
  { type: 'textarea' as const, label: 'متن چند خطی', icon: FiAlignLeft, color: 'green' },
  { type: 'select' as const, label: 'لیست کشویی', icon: FiList, color: 'yellow' },
  { type: 'radio' as const, label: 'دکمه رادیویی', icon: FiCircle, color: 'pink' },
  { type: 'checkbox' as const, label: 'چک‌باکس', icon: FiCheckSquare, color: 'indigo' },
  { type: 'number' as const, label: 'عدد', icon: FiHash, color: 'red' },
  { type: 'date' as const, label: 'تاریخ', icon: FiCalendar, color: 'teal' },
  { type: 'file' as const, label: 'آپلود فایل', icon: FiUpload, color: 'orange' },
];

export default function FieldPalette({ onAddField }: FieldPaletteProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 px-2">فیلدهای فرم</h3>
      <div className="space-y-2">
        {fieldTypes.map((field) => {
          const Icon = field.icon;
          return (
            <button
              key={field.type}
              onClick={() => onAddField(field.type)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition group"
            >
              <div className={`p-2 rounded-lg bg-${field.color}-100 text-${field.color}-600 group-hover:bg-${field.color}-200`}>
                <Icon size={18} />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                {field.label}
              </span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          💡 <strong>نکته:</strong> فیلدها را با کشیدن و رها کردن مرتب کنید
        </p>
      </div>
    </div>
  );
}
