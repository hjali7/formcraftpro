import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiBarChart2 } from 'react-icons/fi';
import { useFormStore } from '../store/formStore';

interface FormListItem {
  id: number;
  title: string;
  created_at: string;
}

export default function Dashboard() {
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState('');
  const { setCurrentForm } = useFormStore();

  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    try {
      const res = await axios.get(`${window.FCP_Settings.root}fcp/v1/forms`, {
        headers: { 'X-WP-Nonce': window.FCP_Settings.nonce }
      });
      setForms(res.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createForm() {
    if (!newFormTitle.trim()) return;
    
    try {
      const res = await axios.post(
        `${window.FCP_Settings.root}fcp/v1/forms`,
        { title: newFormTitle },
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      
      setNewFormTitle('');
      setShowNewFormModal(false);
      fetchForms();
      
      // Navigate to builder
      const newForm = {
        id: res.data.id,
        title: newFormTitle,
        fields: [],
        settings: {
          submitButtonText: 'ارسال',
          successMessage: 'فرم با موفقیت ارسال شد'
        }
      };
      setCurrentForm(newForm);
      window.location.hash = '#/builder';
    } catch (error) {
      console.error('Error creating form:', error);
    }
  }

  async function deleteForm(id: number) {
    if (!confirm('آیا از حذف این فرم اطمینان دارید؟')) return;
    
    try {
      await axios.delete(`${window.FCP_Settings.root}fcp/v1/forms/${id}`, {
        headers: { 'X-WP-Nonce': window.FCP_Settings.nonce }
      });
      fetchForms();
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  }

  async function editForm(form: FormListItem) {
    try {
      const res = await axios.get(
        `${window.FCP_Settings.root}fcp/v1/forms/${form.id}`,
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      
      const formData = {
        id: res.data.id,
        title: res.data.title,
        fields: res.data.fields.map((f: any) => f.field_meta),
        settings: res.data.settings || {
          submitButtonText: 'ارسال',
          successMessage: 'فرم با موفقیت ارسال شد'
        }
      };
      
      setCurrentForm(formData);
      window.location.hash = '#/builder';
    } catch (error) {
      console.error('Error loading form:', error);
      alert('خطا در بارگذاری فرم');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">داشبورد فرم‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت و ساخت فرم‌های خود</p>
        </div>
        <button
          onClick={() => setShowNewFormModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <FiPlus size={20} />
          فرم جدید
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">تعداد فرم‌ها</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{forms.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiBarChart2 size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">فرم‌های فعال</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{forms.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiBarChart2 size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">کل ورودی‌ها</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiBarChart2 size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      {forms.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">هنوز فرمی ساخته نشده</h3>
            <p className="text-gray-600 mb-6">برای شروع، اولین فرم خود را بسازید</p>
            <button
              onClick={() => setShowNewFormModal(true)}
              className="btn inline-flex items-center gap-2"
            >
              <FiPlus size={18} />
              ساخت فرم جدید
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">عنوان فرم</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">تاریخ ایجاد</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">ورودی‌ها</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {forms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{form.title}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(form.created_at).toLocaleDateString('fa-IR')}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">0</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editForm(form)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="ویرایش"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          window.location.hash = `#/entries/${form.id}`;
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                        title="ورودی‌ها"
                      >
                        <FiBarChart2 size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                        title="کپی"
                      >
                        <FiCopy size={18} />
                      </button>
                      <button
                        onClick={() => deleteForm(form.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                        title="حذف"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Form Modal */}
      {showNewFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">ساخت فرم جدید</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان فرم
              </label>
              <input
                type="text"
                value={newFormTitle}
                onChange={(e) => setNewFormTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createForm()}
                placeholder="مثال: فرم تماس با ما"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
              <button
                onClick={() => {
                  setShowNewFormModal(false);
                  setNewFormTitle('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
              >
                انصراف
              </button>
              <button
                onClick={createForm}
                disabled={!newFormTitle.trim()}
                className="btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ساخت فرم
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
