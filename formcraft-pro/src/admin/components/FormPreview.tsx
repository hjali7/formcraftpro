import React from 'react';
import { FiX } from 'react-icons/fi';
import { useFormStore } from '../store/formStore';

interface FormPreviewProps {
  onClose: () => void;
}

export default function FormPreview({ onClose }: FormPreviewProps) {
  const { currentForm } = useFormStore();

  if (!currentForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">پیش‌نمایش فرم</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form Preview */}
        <div className="flex-1 overflow-y-auto p-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {currentForm.fields.map((field) => (
              <div key={field.id} style={{ width: field.styles?.width }}>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: field.styles?.labelColor || '#374151' }}
                >
                  {field.label}
                  {field.required && <span className="text-red-500 mr-1">*</span>}
                </label>

                {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    min={field.validation?.min}
                    max={field.validation?.max}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: field.styles?.borderColor || '#D1D5DB' }}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: field.styles?.borderColor || '#D1D5DB' }}
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: field.styles?.borderColor || '#D1D5DB' }}
                  >
                    <option value="">انتخاب کنید...</option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'radio' ? (
                  <div className="space-y-2">
                    {field.options?.map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={field.id}
                          value={opt}
                          required={field.required && i === 0}
                          className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === 'checkbox' ? (
                  <div className="space-y-2">
                    {field.options?.map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={opt}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : field.type === 'date' ? (
                  <input
                    type="date"
                    required={field.required}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: field.styles?.borderColor || '#D1D5DB' }}
                  />
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    required={field.required}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: field.styles?.borderColor || '#D1D5DB' }}
                  />
                ) : null}
              </div>
            ))}

            <div className="pt-4">
              <button
                type="submit"
                className="btn w-full"
              >
                {currentForm.settings.submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
