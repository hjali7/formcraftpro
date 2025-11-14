import React, { useState } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { useFormStore } from '../store/formStore';

interface FormSettingsProps {
  onClose: () => void;
}

export default function FormSettings({ onClose }: FormSettingsProps) {
  const { currentForm, updateFormSettings } = useFormStore();
  const [settings, setSettings] = useState(currentForm?.settings || {
    submitButtonText: 'ارسال',
    successMessage: 'فرم با موفقیت ارسال شد',
    redirectUrl: ''
  });

  function handleSave() {
    updateFormSettings(settings);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">تنظیمات فرم</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Submit Button Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن دکمه ارسال
            </label>
            <input
              type="text"
              value={settings.submitButtonText}
              onChange={(e) => setSettings({ ...settings, submitButtonText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Success Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              پیام موفقیت
            </label>
            <textarea
              value={settings.successMessage}
              onChange={(e) => setSettings({ ...settings, successMessage: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              این پیام بعد از ارسال موفق فرم نمایش داده می‌شود
            </p>
          </div>

          {/* Redirect URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              آدرس هدایت بعد از ارسال (اختیاری)
            </label>
            <input
              type="url"
              value={settings.redirectUrl || ''}
              onChange={(e) => setSettings({ ...settings, redirectUrl: e.target.value })}
              placeholder="https://example.com/thank-you"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              اگر خالی باشد، پیام موفقیت نمایش داده می‌شود
            </p>
          </div>

          {/* Email Notifications */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">اعلان‌های ایمیل</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    ارسال ایمیل به مدیر بعد از هر ارسال
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل مدیر
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    ارسال ایمیل تایید به کاربر
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">تنظیمات پیشرفته</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    فعال‌سازی Google reCAPTCHA
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    ذخیره ورودی‌ها در دیتابیس
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    نمایش پیام‌های خطا
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            انصراف
          </button>
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
