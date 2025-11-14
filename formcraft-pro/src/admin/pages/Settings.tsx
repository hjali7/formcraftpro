import React, { useState } from 'react';
import { FiSave, FiMail, FiShield, FiGlobe, FiDatabase } from 'react-icons/fi';

export default function Settings() {
  const [settings, setSettings] = useState({
    // General
    deleteOnUninstall: false,
    disableCSS: false,
    
    // Email
    fromName: '',
    fromEmail: '',
    emailNotifications: true,
    
    // reCAPTCHA
    recaptchaEnabled: false,
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
    
    // Advanced
    ajaxSubmit: true,
    saveIP: true,
    saveUserAgent: false,
  });

  function handleSave() {
    // Save settings logic
    alert('✅ تنظیمات ذخیره شد');
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">تنظیمات</h1>
        <p className="text-gray-600 mt-1">تنظیمات عمومی پلاگین FormCraft Pro</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiGlobe className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">تنظیمات عمومی</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.deleteOnUninstall}
                onChange={(e) => setSettings({...settings, deleteOnUninstall: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-medium text-gray-900">حذف داده‌ها هنگام حذف پلاگین</span>
                <p className="text-sm text-gray-600">تمام فرم‌ها و ورودی‌ها حذف خواهند شد</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.disableCSS}
                onChange={(e) => setSettings({...settings, disableCSS: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-medium text-gray-900">غیرفعال کردن CSS پیش‌فرض</span>
                <p className="text-sm text-gray-600">برای استفاده از استایل سفارشی</p>
              </div>
            </label>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiMail className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">تنظیمات ایمیل</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام فرستنده
              </label>
              <input
                type="text"
                value={settings.fromName}
                onChange={(e) => setSettings({...settings, fromName: e.target.value})}
                placeholder="FormCraft Pro"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل فرستنده
              </label>
              <input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                placeholder="noreply@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="font-medium text-gray-900">فعال‌سازی اعلان‌های ایمیل</span>
            </label>
          </div>
        </div>

        {/* reCAPTCHA Settings */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiShield className="text-purple-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Google reCAPTCHA</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.recaptchaEnabled}
                onChange={(e) => setSettings({...settings, recaptchaEnabled: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="font-medium text-gray-900">فعال‌سازی reCAPTCHA</span>
            </label>

            {settings.recaptchaEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Key
                  </label>
                  <input
                    type="text"
                    value={settings.recaptchaSiteKey}
                    onChange={(e) => setSettings({...settings, recaptchaSiteKey: e.target.value})}
                    placeholder="6Lc..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={settings.recaptchaSecretKey}
                    onChange={(e) => setSettings({...settings, recaptchaSecretKey: e.target.value})}
                    placeholder="6Lc..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 برای دریافت کلیدها به 
                    <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener" className="font-medium underline mx-1">
                      Google reCAPTCHA
                    </a>
                    مراجعه کنید
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiDatabase className="text-orange-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">تنظیمات پیشرفته</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.ajaxSubmit}
                onChange={(e) => setSettings({...settings, ajaxSubmit: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-medium text-gray-900">ارسال فرم با AJAX</span>
                <p className="text-sm text-gray-600">بدون رفرش صفحه</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.saveIP}
                onChange={(e) => setSettings({...settings, saveIP: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-medium text-gray-900">ذخیره IP کاربر</span>
                <p className="text-sm text-gray-600">برای جلوگیری از اسپم</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.saveUserAgent}
                onChange={(e) => setSettings({...settings, saveUserAgent: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-medium text-gray-900">ذخیره User Agent</span>
                <p className="text-sm text-gray-600">اطلاعات مرورگر کاربر</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 btn"
          >
            <FiSave size={18} />
            ذخیره تنظیمات
          </button>
        </div>
      </div>
    </div>
  );
}
