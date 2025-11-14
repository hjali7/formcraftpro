import React from 'react';
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiCopy } from 'react-icons/fi';

export default function SystemStatus() {
  const systemInfo = {
    wordpress: {
      version: '6.4.2',
      multisite: false,
      memory_limit: '256M',
      debug_mode: false,
    },
    server: {
      php_version: '8.1.0',
      mysql_version: '8.0.32',
      server_software: 'Apache/2.4.54',
      max_upload_size: '64M',
      max_post_size: '64M',
      max_execution_time: '300',
    },
    plugin: {
      version: '1.0.0',
      database_version: '1.0.0',
      forms_count: 5,
      entries_count: 127,
    }
  };

  function copyToClipboard() {
    const text = JSON.stringify(systemInfo, null, 2);
    navigator.clipboard.writeText(text);
    alert('✅ اطلاعات سیستم کپی شد');
  }

  function StatusIcon({ status }: { status: 'success' | 'warning' | 'error' }) {
    if (status === 'success') return <FiCheckCircle className="text-green-600" size={20} />;
    if (status === 'warning') return <FiAlertCircle className="text-yellow-600" size={20} />;
    return <FiXCircle className="text-red-600" size={20} />;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">وضعیت سیستم</h1>
          <p className="text-gray-600 mt-1">اطلاعات سیستم و محیط سرور</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          <FiCopy size={18} />
          کپی اطلاعات
        </button>
      </div>

      <div className="space-y-6">
        {/* WordPress Environment */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">محیط وردپرس</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نسخه وردپرس</span>
              <div className="flex items-center gap-2">
                <StatusIcon status="success" />
                <span className="font-medium">{systemInfo.wordpress.version}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">حالت Multisite</span>
              <span className="font-medium">{systemInfo.wordpress.multisite ? 'فعال' : 'غیرفعال'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">محدودیت حافظه</span>
              <div className="flex items-center gap-2">
                <StatusIcon status="success" />
                <span className="font-medium">{systemInfo.wordpress.memory_limit}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">حالت Debug</span>
              <span className="font-medium">{systemInfo.wordpress.debug_mode ? 'فعال' : 'غیرفعال'}</span>
            </div>
          </div>
        </div>

        {/* Server Environment */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">محیط سرور</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نسخه PHP</span>
              <div className="flex items-center gap-2">
                <StatusIcon status="success" />
                <span className="font-medium">{systemInfo.server.php_version}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نسخه MySQL</span>
              <div className="flex items-center gap-2">
                <StatusIcon status="success" />
                <span className="font-medium">{systemInfo.server.mysql_version}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نرم‌افزار سرور</span>
              <span className="font-medium">{systemInfo.server.server_software}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">حداکثر حجم آپلود</span>
              <span className="font-medium">{systemInfo.server.max_upload_size}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">حداکثر حجم POST</span>
              <span className="font-medium">{systemInfo.server.max_post_size}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">زمان اجرای اسکریپت</span>
              <span className="font-medium">{systemInfo.server.max_execution_time}s</span>
            </div>
          </div>
        </div>

        {/* Plugin Information */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">اطلاعات پلاگین</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نسخه پلاگین</span>
              <span className="font-medium">{systemInfo.plugin.version}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">نسخه دیتابیس</span>
              <span className="font-medium">{systemInfo.plugin.database_version}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-700">تعداد فرم‌ها</span>
              <span className="font-medium">{systemInfo.plugin.forms_count}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700">تعداد ورودی‌ها</span>
              <span className="font-medium">{systemInfo.plugin.entries_count}</span>
            </div>
          </div>
        </div>

        {/* Requirements Check */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">بررسی نیازمندی‌ها</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <span className="text-gray-700">PHP نسخه 7.4 یا بالاتر</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <span className="text-gray-700">MySQL نسخه 5.6 یا بالاتر</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <span className="text-gray-700">WordPress نسخه 5.8 یا بالاتر</span>
            </div>
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <span className="text-gray-700">حافظه PHP حداقل 128MB</span>
            </div>
          </div>
        </div>

        {/* Database Tables */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">جداول دیتابیس</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">wp_fcp_forms</code>
            </div>
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">wp_fcp_fields</code>
            </div>
            <div className="flex items-center gap-3 py-2">
              <StatusIcon status="success" />
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">wp_fcp_entries</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
