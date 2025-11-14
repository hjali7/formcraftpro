import React, { useState } from 'react';
import { FiUpload, FiDownload, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

export default function ImportExport() {
  const [selectedForms, setSelectedForms] = useState<number[]>([]);
  const [forms, setForms] = useState<any[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);

  React.useEffect(() => {
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
    }
  }

  async function handleExport() {
    if (selectedForms.length === 0) {
      alert('لطفاً حداقل یک فرم انتخاب کنید');
      return;
    }

    try {
      const exportData = {
        version: '1.0.0',
        date: new Date().toISOString(),
        forms: []
      };

      for (const formId of selectedForms) {
        const res = await axios.get(
          `${window.FCP_Settings.root}fcp/v1/forms/${formId}`,
          { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
        );
        exportData.forms.push(res.data);
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `formcraft-export-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);

      alert('✅ فرم‌ها با موفقیت Export شدند');
    } catch (error) {
      console.error('Error exporting:', error);
      alert('❌ خطا در Export فرم‌ها');
    }
  }

  async function handleImport() {
    if (!importFile) {
      alert('لطفاً یک فایل انتخاب کنید');
      return;
    }

    try {
      const text = await importFile.text();
      const data = JSON.parse(text);

      if (!data.forms || !Array.isArray(data.forms)) {
        throw new Error('فرمت فایل نامعتبر است');
      }

      let imported = 0;
      for (const form of data.forms) {
        try {
          await axios.post(
            `${window.FCP_Settings.root}fcp/v1/forms`,
            { title: form.title + ' (Imported)' },
            { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
          );
          imported++;
        } catch (err) {
          console.error('Error importing form:', err);
        }
      }

      alert(`✅ ${imported} فرم با موفقیت Import شدند`);
      setImportFile(null);
      fetchForms();
    } catch (error) {
      console.error('Error importing:', error);
      alert('❌ خطا در Import فرم‌ها');
    }
  }

  function toggleForm(formId: number) {
    setSelectedForms(prev =>
      prev.includes(formId)
        ? prev.filter(id => id !== formId)
        : [...prev, formId]
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">ورود/خروج اطلاعات</h1>
        <p className="text-gray-600 mt-1">Import و Export فرم‌های خود</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiDownload className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Export فرم‌ها</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            فرم‌های مورد نظر را انتخاب کنید و به فایل JSON Export کنید
          </p>

          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {forms.map(form => (
              <label key={form.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedForms.includes(form.id)}
                  onChange={() => toggleForm(form.id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-900">{form.title}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={selectedForms.length === 0}
            className="w-full flex items-center justify-center gap-2 btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiDownload size={18} />
            Export ({selectedForms.length} فرم)
          </button>
        </div>

        {/* Import Section */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiUpload className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Import فرم‌ها</h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            فایل JSON فرم‌های Export شده را آپلود کنید
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <input
              type="file"
              accept=".json"
              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
              className="hidden"
              id="import-file"
            />
            <label htmlFor="import-file" className="cursor-pointer">
              <FiUpload size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {importFile ? importFile.name : 'کلیک کنید یا فایل را بکشید'}
              </p>
            </label>
          </div>

          <button
            onClick={handleImport}
            disabled={!importFile}
            className="w-full flex items-center justify-center gap-2 btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiUpload size={18} />
            Import فرم‌ها
          </button>

          <div className="mt-4 bg-yellow-50 p-4 rounded-lg flex gap-3">
            <FiAlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-yellow-800">
              <strong>توجه:</strong> فرم‌های Import شده با عنوان "(Imported)" اضافه می‌شوند
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">راهنما</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• فایل Export شده شامل تمام فیلدها و تنظیمات فرم است</li>
          <li>• می‌توانید فرم‌ها را بین سایت‌های مختلف منتقل کنید</li>
          <li>• فایل Export شده قابل ویرایش دستی است (JSON)</li>
          <li>• ورودی‌های فرم Export نمی‌شوند</li>
        </ul>
      </div>
    </div>
  );
}
