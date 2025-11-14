import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEye, FiTrash2, FiDownload, FiFilter } from 'react-icons/fi';

interface Entry {
  id: number;
  form_id: number;
  form_title?: string;
  entry_data: Record<string, any>;
  created_at: string;
}

export default function AllEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<number | 'all'>('all');
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch forms
      const formsRes = await axios.get(
        `${window.FCP_Settings.root}fcp/v1/forms`,
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      setForms(formsRes.data);

      // Fetch all entries
      const allEntries: Entry[] = [];
      for (const form of formsRes.data) {
        try {
          const entriesRes = await axios.get(
            `${window.FCP_Settings.root}fcp/v1/forms/${form.id}/entries`,
            { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
          );
          entriesRes.data.forEach((entry: Entry) => {
            entry.form_title = form.title;
            allEntries.push(entry);
          });
        } catch (err) {
          console.error(`Error fetching entries for form ${form.id}:`, err);
        }
      }
      
      // Sort by date (newest first)
      allEntries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setEntries(allEntries);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEntry(entryId: number) {
    if (!confirm('آیا از حذف این ورودی اطمینان دارید؟')) return;

    try {
      await axios.delete(
        `${window.FCP_Settings.root}fcp/v1/entries/${entryId}`,
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      setEntries(entries.filter(e => e.id !== entryId));
      alert('✅ ورودی حذف شد');
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('❌ خطا در حذف ورودی');
    }
  }

  function exportAllToCSV() {
    if (filteredEntries.length === 0) return;

    const fieldNames = new Set<string>();
    filteredEntries.forEach(entry => {
      Object.keys(entry.entry_data).forEach(key => fieldNames.add(key));
    });

    const headers = ['شناسه', 'فرم', 'تاریخ', ...Array.from(fieldNames)];
    let csv = headers.join(',') + '\n';

    filteredEntries.forEach(entry => {
      const row = [
        entry.id,
        entry.form_title || '',
        new Date(entry.created_at).toLocaleDateString('fa-IR'),
        ...Array.from(fieldNames).map(field => {
          const value = entry.entry_data[field];
          return Array.isArray(value) ? value.join('; ') : (value || '');
        })
      ];
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `all-entries-${Date.now()}.csv`;
    link.click();
  }

  const filteredEntries = entries.filter(entry => {
    const matchesForm = selectedForm === 'all' || entry.form_id === selectedForm;
    const matchesSearch = searchTerm === '' || 
      JSON.stringify(entry.entry_data).toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.form_title?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesForm && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">تمام ورودی‌ها</h1>
        <p className="text-gray-600 mt-1">مدیریت تمام ورودی‌های دریافتی از فرم‌ها</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">کل ورودی‌ها</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{entries.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">فرم‌های فعال</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{forms.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-600">امروز</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {entries.filter(e => {
              const today = new Date().toDateString();
              return new Date(e.created_at).toDateString() === today;
            }).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در ورودی‌ها..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="min-w-[200px]">
            <select
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">همه فرم‌ها</option>
              {forms.map(form => (
                <option key={form.id} value={form.id}>{form.title}</option>
              ))}
            </select>
          </div>
          <button
            onClick={exportAllToCSV}
            disabled={filteredEntries.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            <FiDownload size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Entries Table */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <p className="text-gray-600">
            {searchTerm || selectedForm !== 'all' ? 'نتیجه‌ای یافت نشد' : 'هنوز ورودی ثبت نشده است'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">شناسه</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">فرم</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">تاریخ</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">فیلدها</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">#{entry.id}</td>
                  <td className="px-6 py-4 text-gray-900">{entry.form_title}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(entry.created_at).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {Object.keys(entry.entry_data).length} فیلد
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="مشاهده"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
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

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  ورودی #{selectedEntry.id}
                </h2>
                <p className="text-sm text-gray-600">{selectedEntry.form_title}</p>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">تاریخ ارسال</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {new Date(selectedEntry.created_at).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                {Object.entries(selectedEntry.entry_data).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      {key.replace('fcp_field_', '').replace(/-/g, ' ')}
                    </p>
                    <p className="text-gray-900">
                      {Array.isArray(value) ? value.join(', ') : value || '-'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => deleteEntry(selectedEntry.id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                حذف
              </button>
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
