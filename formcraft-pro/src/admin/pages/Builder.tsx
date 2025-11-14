import React, { useEffect, useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    FCP_Settings: {
      root: string;
      nonce: string;
      pluginUrl: string;
    };
  }
}

export default function Builder() {
  const [forms, setForms] = useState<any[]>([]);
  const [title, setTitle] = useState('');

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
    }
  }

  async function createForm() {
    if (!title.trim()) return;
    try {
      await axios.post(`${window.FCP_Settings.root}fcp/v1/forms`, 
        { title }, 
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      setTitle('');
      fetchForms();
    } catch (error) {
      console.error('Error creating form:', error);
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="عنوان فرم" 
          className="border p-2 rounded w-1/2" 
        />
        <button onClick={createForm} className="btn">ایجاد فرم</button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">فرم‌ها</h2>
        {forms.length === 0 ? (
          <p className="text-gray-500">هنوز فرمی ایجاد نشده است</p>
        ) : (
          <ul className="space-y-2">
            {forms.map(f => (
              <li key={f.id} className="py-2 px-4 bg-gray-50 rounded">
                #{f.id} — {f.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
