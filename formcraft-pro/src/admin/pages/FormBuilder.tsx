import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { FiSave, FiEye, FiSettings, FiArrowLeft } from 'react-icons/fi';
import { useFormStore, FormField } from '../store/formStore';
import FieldPalette from '../components/FieldPalette';
import SortableField from '../components/SortableField';
import FieldEditor from '../components/FieldEditor';
import FormPreview from '../components/FormPreview';
import FormSettings from '../components/FormSettings';

export default function FormBuilder() {
  const { currentForm, reorderFields, addField } = useFormStore();
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!currentForm) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600 mb-4">لطفاً یک فرم انتخاب کنید</p>
          <button
            onClick={() => window.location.hash = '#/dashboard'}
            className="btn"
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const oldIndex = currentForm.fields.findIndex(f => f.id === active.id);
      const newIndex = currentForm.fields.findIndex(f => f.id === over.id);
      
      const newFields = arrayMove(currentForm.fields, oldIndex, newIndex);
      reorderFields(newFields);
    }
  }

  function handleAddField(type: FormField['type']) {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: getDefaultLabel(type),
      placeholder: '',
      required: false,
      styles: {
        width: '100%'
      }
    };
    
    addField(newField);
  }

  function getDefaultLabel(type: FormField['type']): string {
    const labels: Record<FormField['type'], string> = {
      text: 'فیلد متنی',
      email: 'ایمیل',
      textarea: 'متن چند خطی',
      select: 'لیست کشویی',
      radio: 'دکمه رادیویی',
      checkbox: 'چک‌باکس',
      number: 'عدد',
      date: 'تاریخ',
      file: 'آپلود فایل'
    };
    return labels[type];
  }

  async function saveForm() {
    if (!currentForm) return;
    
    try {
      await axios.put(
        `${window.FCP_Settings.root}fcp/v1/forms/${currentForm.id}`,
        {
          title: currentForm.title,
          fields: currentForm.fields,
          settings: currentForm.settings
        },
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      
      alert('✅ فرم با موفقیت ذخیره شد');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('❌ خطا در ذخیره فرم');
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.hash = '#/dashboard'}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FiArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{currentForm.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-600">ویرایش فرم</p>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded">
                  <code className="text-xs text-blue-700 font-mono">
                    [formcraft id="{currentForm.id}"]
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`[formcraft id="${currentForm.id}"]`);
                      alert('✅ Shortcode کپی شد!');
                    }}
                    className="text-blue-600 hover:text-blue-700 text-xs"
                    title="کپی Shortcode"
                  >
                    کپی
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FiSettings size={18} />
              تنظیمات
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <FiEye size={18} />
              پیش‌نمایش
            </button>
            <button
              onClick={saveForm}
              className="flex items-center gap-2 btn"
            >
              <FiSave size={18} />
              ذخیره فرم
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Field Palette */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <FieldPalette onAddField={handleAddField} />
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {currentForm.fields.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">فرم خالی است</h3>
                  <p className="text-gray-600">فیلدهای مورد نظر را از سمت راست اضافه کنید</p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={currentForm.fields.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-4">
                      {currentForm.fields.map((field) => (
                        <SortableField
                          key={field.id}
                          field={field}
                          isSelected={selectedField?.id === field.id}
                          onSelect={() => setSelectedField(field)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>

        {/* Field Editor */}
        {selectedField && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <FieldEditor
              field={selectedField}
              onClose={() => setSelectedField(null)}
            />
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <FormPreview onClose={() => setShowPreview(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <FormSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
