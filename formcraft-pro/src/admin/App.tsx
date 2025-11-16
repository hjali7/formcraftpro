import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import Entries from './pages/Entries';
import AllEntries from './pages/AllEntries';
import Settings from './pages/Settings';
import ImportExport from './pages/ImportExport';
import SystemStatus from './pages/SystemStatus';
import Help from './pages/Help';
import axios from 'axios';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [entriesFormId, setEntriesFormId] = useState<number | null>(null);
  const [entriesFormTitle, setEntriesFormTitle] = useState('');

  useEffect(() => {
    const handleRouting = () => {
      // Check URL parameter for page
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page');
      const hash = window.location.hash.slice(1);
      
      console.log('Current page:', page, 'Hash:', hash);
      
      if (hash === '/builder') {
        setCurrentPage('builder');
      } else if (hash === '/new') {
        setCurrentPage('dashboard');
      } else if (hash.startsWith('/entries/')) {
        const formId = parseInt(hash.split('/')[2]);
        if (formId) {
          loadFormForEntries(formId);
        }
      } else if (page === 'formcraft-pro-settings') {
        setCurrentPage('settings');
      } else if (page === 'formcraft-pro-import-export') {
        setCurrentPage('import-export');
      } else if (page === 'formcraft-pro-system-status') {
        setCurrentPage('system-status');
      } else if (page === 'formcraft-pro-help') {
        setCurrentPage('help');
      } else if (page === 'formcraft-pro-new') {
        setCurrentPage('dashboard');
        // Trigger new form modal after a short delay
        setTimeout(() => {
          const newFormBtn = document.querySelector('[data-action="new-form"]') as HTMLElement;
          if (newFormBtn) newFormBtn.click();
        }, 100);
      } else if (page === 'formcraft-pro-entries') {
        setCurrentPage('all-entries');
      } else if (page === 'formcraft-pro' || !page) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('dashboard');
      }
    };

    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    
    return () => window.removeEventListener('hashchange', handleRouting);
  }, []);

  async function loadFormForEntries(formId: number) {
    try {
      const res = await axios.get(
        `${window.FCP_Settings.root}fcp/v1/forms/${formId}`,
        { headers: { 'X-WP-Nonce': window.FCP_Settings.nonce } }
      );
      setEntriesFormId(formId);
      setEntriesFormTitle(res.data.title);
      setCurrentPage('entries');
    } catch (error) {
      console.error('Error loading form:', error);
      alert('خطا در بارگذاری فرم');
      window.location.hash = '#/dashboard';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'builder' && <FormBuilder />}
      {currentPage === 'entries' && entriesFormId && (
        <Entries
          formId={entriesFormId}
          formTitle={entriesFormTitle}
          onBack={() => window.location.hash = '#/dashboard'}
        />
      )}
      {currentPage === 'settings' && <Settings />}
      {currentPage === 'import-export' && <ImportExport />}
      {currentPage === 'system-status' && <SystemStatus />}
      {currentPage === 'help' && <Help />}
      {currentPage === 'all-entries' && <AllEntries />}
    </div>
  );
}
