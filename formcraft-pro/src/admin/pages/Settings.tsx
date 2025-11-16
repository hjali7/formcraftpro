import React, { useState } from 'react';
import { FiSave, FiMail, FiShield, FiGlobe, FiDatabase } from 'react-icons/fi';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General
    deleteOnUninstall: false,
    disableCSS: false,
    noConflictMode: false,
    currencyFormat: 'USD',
    
    // Email
    fromName: 'FormCraft Pro',
    fromEmail: 'noreply@example.com',
    emailNotifications: true,
    
    // reCAPTCHA
    recaptchaEnabled: false,
    recaptchaSiteKey: '',
    recaptchaSecretKey: '',
    
    // Advanced
    ajaxSubmit: true,
    saveIP: true,
    saveUserAgent: false,
    outputCSS: true,
    outputHTML5: true,
  });

  function handleSave() {
    // Save settings logic
    alert('✅ تنظیمات ذخیره شد');
  }

  const tabs = [
    { id: 'general', label: 'عمومی', icon: FiGlobe },
    { id: 'email', label: 'ایمیل', icon: FiMail },
    { id: 'recaptcha', label: 'reCAPTCHA', icon: FiShield },
    { id: 'advanced', label: 'پیشرفته', icon: FiDatabase },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure FormCraft Pro plugin settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="flex gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Configure basic plugin settings</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Currency
                </label>
                <select
                  value={settings.currencyFormat}
                  onChange={(e) => setSettings({...settings, currencyFormat: e.target.value})}
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">Pound Sterling (£)</option>
                  <option value="IRR">Iranian Rial (﷼)</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Select the default currency for pricing fields</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Form Options</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.noConflictMode}
                      onChange={(e) => setSettings({...settings, noConflictMode: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">No-Conflict Mode</span>
                      <p className="text-sm text-gray-600">Set to ON to prevent extraneous scripts and styles from being printed on FormCraft admin pages</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.outputCSS}
                      onChange={(e) => setSettings({...settings, outputCSS: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Output CSS</span>
                      <p className="text-sm text-gray-600">Set to OFF to disable output of form CSS</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.outputHTML5}
                      onChange={(e) => setSettings({...settings, outputHTML5: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Output HTML5</span>
                      <p className="text-sm text-gray-600">Set to ON to enable HTML5 field output</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Uninstall</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.deleteOnUninstall}
                    onChange={(e) => setSettings({...settings, deleteOnUninstall: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded mt-1"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Delete Data on Uninstall</span>
                    <p className="text-sm text-gray-600">Check this box if you would like FormCraft to completely remove all of its data when the plugin is deleted</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Email Settings */}
        {activeTab === 'email' && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Email Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Configure email notification settings</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Name
                </label>
                <input
                  type="text"
                  value={settings.fromName}
                  onChange={(e) => setSettings({...settings, fromName: e.target.value})}
                  placeholder="FormCraft Pro"
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">The name that will appear in the "From" field of notification emails</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  value={settings.fromEmail}
                  onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                  placeholder="noreply@example.com"
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">The email address that will appear in the "From" field of notification emails</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded mt-1"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Enable Email Notifications</span>
                    <p className="text-sm text-gray-600">Send email notifications when forms are submitted</p>
                  </div>
                </label>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Note:</strong> Individual form notification settings can be configured in the form editor
                </p>
              </div>
            </div>
          </div>
        )}

        {/* reCAPTCHA Settings */}
        {activeTab === 'recaptcha' && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Google reCAPTCHA</h2>
              <p className="text-sm text-gray-600 mt-1">Protect your forms from spam with Google reCAPTCHA</p>
            </div>
            
            <div className="p-6 space-y-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.recaptchaEnabled}
                  onChange={(e) => setSettings({...settings, recaptchaEnabled: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded mt-1"
                />
                <div>
                  <span className="font-medium text-gray-900">Enable reCAPTCHA</span>
                  <p className="text-sm text-gray-600">Add reCAPTCHA protection to your forms</p>
                </div>
              </label>

              {settings.recaptchaEnabled && (
                <>
                  <div className="border-t border-gray-200 pt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Key
                      </label>
                      <input
                        type="text"
                        value={settings.recaptchaSiteKey}
                        onChange={(e) => setSettings({...settings, recaptchaSiteKey: e.target.value})}
                        placeholder="6Lc..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                      />
                      <p className="text-sm text-gray-500 mt-1">Your reCAPTCHA site key</p>
                    </div>
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
                      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                    <p className="text-sm text-gray-500 mt-1">Your reCAPTCHA secret key</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Get your keys:</strong> Visit 
                      <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener" className="font-medium underline mx-1">
                        Google reCAPTCHA
                      </a>
                      to register your site and get your keys
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === 'advanced' && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Advanced Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Configure advanced plugin options</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Form Submission</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.ajaxSubmit}
                      onChange={(e) => setSettings({...settings, ajaxSubmit: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Enable AJAX Form Submission</span>
                      <p className="text-sm text-gray-600">Submit forms without page reload for better user experience</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Data Collection</h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.saveIP}
                      onChange={(e) => setSettings({...settings, saveIP: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Save User IP Address</span>
                      <p className="text-sm text-gray-600">Store the IP address of form submitters for spam prevention</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.saveUserAgent}
                      onChange={(e) => setSettings({...settings, saveUserAgent: e.target.checked})}
                      className="w-4 h-4 text-blue-600 rounded mt-1"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Save User Agent</span>
                      <p className="text-sm text-gray-600">Store browser and device information</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Privacy Notice:</strong> Collecting IP addresses and user agent data may require disclosure in your privacy policy
                </p>
              </div>
            </div>
          </div>
        )}

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
