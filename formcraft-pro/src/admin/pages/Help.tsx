import React from 'react';
import { FiBook, FiVideo, FiMessageCircle, FiExternalLink, FiCode } from 'react-icons/fi';

export default function Help() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">راهنما و پشتیبانی</h1>
        <p className="text-gray-600 mt-1">منابع آموزشی و راهنمای استفاده از FormCraft Pro</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiBook className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">شروع سریع</h2>
          </div>
          <p className="text-gray-600 mb-4">
            راهنمای گام به گام برای ساخت اولین فرم خود
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            مشاهده راهنما
            <FiExternalLink size={16} />
          </button>
        </div>

        {/* Video Tutorials */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiVideo className="text-purple-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">آموزش ویدیویی</h2>
          </div>
          <p className="text-gray-600 mb-4">
            ویدیوهای آموزشی کامل برای تمام قابلیت‌ها
          </p>
          <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
            مشاهده ویدیوها
            <FiExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">مستندات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
            <h3 className="font-medium text-gray-900 mb-1">ساخت فرم</h3>
            <p className="text-sm text-gray-600">نحوه ساخت و تنظیم فرم‌ها</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
            <h3 className="font-medium text-gray-900 mb-1">انواع فیلد</h3>
            <p className="text-sm text-gray-600">راهنمای استفاده از فیلدها</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
            <h3 className="font-medium text-gray-900 mb-1">استایل دهی</h3>
            <p className="text-sm text-gray-600">سفارشی‌سازی ظاهر فرم</p>
          </a>
          <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition">
            <h3 className="font-medium text-gray-900 mb-1">مدیریت ورودی‌ها</h3>
            <p className="text-sm text-gray-600">کار با داده‌های ارسالی</p>
          </a>
        </div>
      </div>

      {/* Common Questions */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">سوالات متداول</h2>
        <div className="space-y-4">
          <details className="group">
            <summary className="cursor-pointer font-medium text-gray-900 py-2 flex items-center justify-between">
              چگونه فرم را در صفحه نمایش دهم؟
              <span className="group-open:rotate-180 transition">▼</span>
            </summary>
            <p className="text-gray-600 mt-2 pr-4">
              از Shortcode استفاده کنید: <code className="bg-gray-100 px-2 py-1 rounded">[formcraft id="1"]</code>
            </p>
          </details>

          <details className="group">
            <summary className="cursor-pointer font-medium text-gray-900 py-2 flex items-center justify-between border-t border-gray-200 pt-4">
              چگونه استایل فرم را تغییر دهم؟
              <span className="group-open:rotate-180 transition">▼</span>
            </summary>
            <p className="text-gray-600 mt-2 pr-4">
              در Form Builder، روی هر فیلد کلیک کنید و از بخش "استایل" رنگ‌ها را تغییر دهید.
            </p>
          </details>

          <details className="group">
            <summary className="cursor-pointer font-medium text-gray-900 py-2 flex items-center justify-between border-t border-gray-200 pt-4">
              چگونه ورودی‌ها را Export کنم؟
              <span className="group-open:rotate-180 transition">▼</span>
            </summary>
            <p className="text-gray-600 mt-2 pr-4">
              به صفحه ورودی‌های فرم بروید و روی دکمه "دانلود CSV" کلیک کنید.
            </p>
          </details>

          <details className="group">
            <summary className="cursor-pointer font-medium text-gray-900 py-2 flex items-center justify-between border-t border-gray-200 pt-4">
              چگونه اعلان ایمیل فعال کنم؟
              <span className="group-open:rotate-180 transition">▼</span>
            </summary>
            <p className="text-gray-600 mt-2 pr-4">
              به تنظیمات بروید و در بخش "تنظیمات ایمیل" گزینه‌های مورد نظر را فعال کنید.
            </p>
          </details>
        </div>
      </div>

      {/* Developer Resources */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <FiCode className="text-gray-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">منابع توسعه‌دهندگان</h2>
        </div>
        <div className="space-y-3">
          <a href="#" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition">
            <span className="text-gray-900">REST API Documentation</span>
            <FiExternalLink className="text-gray-400" size={18} />
          </a>
          <a href="#" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition">
            <span className="text-gray-900">Hooks & Filters</span>
            <FiExternalLink className="text-gray-400" size={18} />
          </a>
          <a href="#" className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition">
            <span className="text-gray-900">Custom Field Types</span>
            <FiExternalLink className="text-gray-400" size={18} />
          </a>
        </div>
      </div>

      {/* Support */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <FiMessageCircle size={32} />
          <div>
            <h2 className="text-2xl font-semibold">نیاز به کمک دارید؟</h2>
            <p className="text-blue-100">تیم پشتیبانی ما آماده کمک به شماست</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
            ارسال تیکت
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition border border-white">
            چت آنلاین
          </button>
        </div>
      </div>
    </div>
  );
}
