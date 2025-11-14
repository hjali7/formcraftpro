import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowLeft, FiDownload, FiTrash2, FiEye } from 'react-icons/fi';

interface Entry {
  id: number;
  form_id: number;
  entry_data: Record<string, any>;
  created_at: string;
}

interface EntriesProps {
  formId: number;
  formTitle: string;
  onBack: () => void;
}

export default function Entries({ formId, formTitle, onBack }: EntriesProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    fetchEntries();
  }, [formId]);

  async function fetchEntries() {
    try {
      const res = await axios.get(
        `${window.FCP_Settings.root}fcp/v1/forms/${formId}/entries`,
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  }

  function exportToCSV() {
    if (entries.length === 0) return;

    // Get all unique field names
    const fieldNames = new Set<string>();
    entries.forEach(entry => {
      Object.keys(entry.entry_data).forEach(key => fieldNames.add(key));
    });

    // Create CSV header
    const headers = ['شناسه', 'تاریخ', ...Array.from(fieldNames)];
    let csv = headers.join(',') + '\n';

    // Add rows
    entries.forEach(entry => {
      const row = [
        entry.id,
        new Date(entry.created_at).toLocaleDateString('fa-IR'),
        ...Array.from(fieldNames).map(field => {
          const value = entry.entry_data[field];
          return Array.isArray(value) ? value.join('; ') : (value || '');
        })
      ];
      csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Download
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `entries-${formId}-${Date.now()}.csv`;
    link.click();
  }

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ورودی‌های فرم</h1>
            <p className="text-gray-600">{formTitle}</p>
          </div>
        </div>

        {entries.length > 0 && (
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload size={18} />
            دانلود CSV
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">تعداد کل ورودی‌ها</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{entries.length}</p>
          </div>
        </div>
      </div>

      {/* Entries List */}
      {entries.length === 0 ? (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
          <p className="text-gray-600">هنوز ورودی ثبت نشده است</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">شناسه</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">تاریخ ارسال</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">تعداد فیلدها</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">#{entry.id}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(entry.created_at).toLocaleDateString('fa-IR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {Object.keys(entry.entry_data).length} فیلد
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="مشاهده جزئیات"
                    >
                      <FiEye size={18} />
                    </button>
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
              <h2 className="text-xl font-semibold text-gray-900">
                جزئیات ورودی #{selectedEntry.id}
              </h2>
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

            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
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
