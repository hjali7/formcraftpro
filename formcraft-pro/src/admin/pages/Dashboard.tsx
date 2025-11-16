import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiBarChart2, FiSearch } from 'react-icons/fi';
import { useFormStore } from '../store/formStore';

interface FormListItem {
  id: number;
  title: string;
  created_at: string;
  entries_count?: number;
  views_count?: number;
  conversion_rate?: number;
}

export default function Dashboard() {
  const [forms, setForms] = useState<FormListItem[]>([]);
  const [filteredForms, setFilteredForms] = useState<FormListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewFormModal, setShowNewFormModal] = useState(false);
  const [newFormTitle, setNewFormTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedForms, setSelectedForms] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const { setCurrentForm } = useFormStore();

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    // Filter forms based on search and status
    let filtered = forms;

    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus === 'active') {
      filtered = filtered.filter(form => form.id > 0); // All forms are active for now
    } else if (filterStatus === 'inactive') {
      filtered = []; // No inactive forms for now
    } else if (filterStatus === 'trash') {
      filtered = []; // No trash for now
    }

    setFilteredForms(filtered);
  }, [forms, searchTerm, filterStatus]);

  async function fetchForms() {
    try {
      const res = await axios.get(`${window.FCP_Settings.root}fcp/v1/forms`, {
        headers: { 'X-WP-Nonce': window.FCP_Settings.nonce }
      });
      
      // Add mock data for entries, views, conversion
      const formsWithStats = res.data.map((form: FormListItem) => ({
        ...form,
        entries_count: Math.floor(Math.random() * 100),
        views_count: Math.floor(Math.random() * 500),
        conversion_rate: Math.floor(Math.random() * 100)
      }));
      
      setForms(formsWithStats);
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

  function toggleSelectForm(formId: number) {
    setSelectedForms(prev =>
      prev.includes(formId)
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  }

  function toggleSelectAll() {
    if (selectedForms.length === filteredForms.length) {
      setSelectedForms([]);
    } else {
      setSelectedForms(filteredForms.map(f => f.id));
    }
  }

  async function handleBulkAction() {
    if (!bulkAction || selectedForms.length === 0) {
      alert('لطفاً یک عملیات و حداقل یک فرم انتخاب کنید');
      return;
    }

    if (bulkAction === 'delete') {
      if (!confirm(`آیا از حذف ${selectedForms.length} فرم اطمینان دارید؟`)) return;
      
      try {
        for (const formId of selectedForms) {
          await axios.delete(`${window.FCP_Settings.root}fcp/v1/forms/${formId}`, {
            headers: { 'X-WP-Nonce': window.FCP_Settings.nonce }
          });
        }
        setSelectedForms([]);
        fetchForms();
        alert('✅ فرم‌ها با موفقیت حذف شدند');
      } catch (error) {
        console.error('Error deleting forms:', error);
        alert('❌ خطا در حذف فرم‌ها');
      }
    } else if (bulkAction === 'duplicate') {
      alert('قابلیت کپی دسته‌جمعی به زودی اضافه می‌شود');
    }
  }

  async function deleteForm(id: number) {
    if (!confirm('آیا از حذف این فرم اطمینان دارید؟')) return;
    
    try {
      await axios.delete(`${window.FCP_Settings.root}fcp/v1/forms/${id}`, {
        headers: { 'X-WP-Nonce': window.FCP_Settings.nonce }
      });
      fetchForms();
      alert('✅ فرم حذف شد');
    } catch (error) {
      console.error('Error deleting form:', error);
      alert('❌ خطا در حذف فرم');
    }
  }

  async function duplicateForm(form: FormListItem) {
    try {
      const res = await axios.post(
        `${window.FCP_Settings.root}fcp/v1/forms`,
        { title: form.title + ' (کپی)' },
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      fetchForms();
      alert('✅ فرم کپی شد');
    } catch (error) {
      console.error('Error duplicating form:', error);
      alert('❌ خطا در کپی فرم');
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
    <div className="max-w-full mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Forms</h1>
        <button
          onClick={() => setShowNewFormModal(true)}
          data-action="new-form"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 mb-0">
        <div className="flex items-center gap-6 px-4">
          <button
            onClick={() => setFilterStatus('all')}
            className={`py-3 px-2 border-b-2 transition ${
              filterStatus === 'all'
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({forms.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`py-3 px-2 border-b-2 transition ${
              filterStatus === 'active'
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Active ({forms.length})
          </button>
          <button
            onClick={() => setFilterStatus('inactive')}
            className={`py-3 px-2 border-b-2 transition ${
              filterStatus === 'inactive'
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Inactive (0)
          </button>
          <button
            onClick={() => setFilterStatus('trash')}
            className={`py-3 px-2 border-b-2 transition ${
              filterStatus === 'trash'
                ? 'border-blue-600 text-blue-600 font-medium'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Trash (0)
          </button>
        </div>
      </div>

      {/* Bulk Actions and Search */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm"
            >
              <option value="">Bulk actions</option>
              <option value="delete">Delete</option>
              <option value="duplicate">Duplicate</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={selectedForms.length === 0}
              className="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
            <span className="text-sm text-gray-600">{filteredForms.length} items</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Forms"
                className="pl-3 pr-10 py-1.5 border border-gray-300 rounded text-sm w-64"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      {filteredForms.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-600">
            {searchTerm ? 'No forms found matching your search.' : 'No forms found.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedForms.length === filteredForms.length && filteredForms.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Status ↕
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Title ↕
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  ID ↕
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Entries ↕
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Views ↕
                </th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Conversion ↕
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedForms.includes(form.id)}
                      onChange={() => toggleSelectForm(form.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editForm(form)}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {form.title}
                      </button>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          onClick={() => editForm(form)}
                          className="text-xs text-gray-600 hover:text-blue-600"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => duplicateForm(form)}
                          className="text-xs text-gray-600 hover:text-blue-600"
                          title="Duplicate"
                        >
                          Duplicate
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => window.location.hash = `#/entries/${form.id}`}
                          className="text-xs text-gray-600 hover:text-blue-600"
                          title="Entries"
                        >
                          Entries
                        </button>
                        <span className="text-gray-400">|</span>
                        <button
                          onClick={() => deleteForm(form.id)}
                          className="text-xs text-red-600 hover:text-red-800"
                          title="Trash"
                        >
                          Trash
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{form.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{form.entries_count || 0}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{form.views_count || 0}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{form.conversion_rate || 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bulk Actions Bottom */}
      {filteredForms.length > 0 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm"
            >
              <option value="">Bulk actions</option>
              <option value="delete">Delete</option>
              <option value="duplicate">Duplicate</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={selectedForms.length === 0}
              className="px-4 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
            <span className="text-sm text-gray-600">{filteredForms.length} items</span>
          </div>
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
