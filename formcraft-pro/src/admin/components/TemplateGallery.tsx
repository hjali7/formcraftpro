import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';

interface FormTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  fields: any[];
}

interface TemplateGalleryProps {
  onClose: () => void;
  onSelectTemplate: (template: FormTemplate | null) => void;
}

const templates: FormTemplate[] = [
  {
    id: 'blank',
    title: 'فرم خالی',
    description: 'شروع با یک فرم خالی و ساخت آن از ابتدا',
    icon: '📝',
    color: 'bg-gray-50',
    fields: []
  },
  {
    id: 'simple-contact',
    title: 'فرم تماس ساده',
    description: 'فرم تماس با فیلدهای پایه: نام، ایمیل و پیام',
    icon: '📧',
    color: 'bg-orange-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام خود را وارد کنید',
        required: true,
        id: 'name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'textarea',
        label: 'پیام',
        placeholder: 'پیام خود را بنویسید...',
        required: true,
        rows: 5,
        id: 'message'
      }
    ]
  },
  {
    id: 'advanced-contact',
    title: 'فرم تماس پیشرفته',
    description: 'فرم تماس کامل با فیلدهای بیشتر و گزینه‌های متنوع',
    icon: '📬',
    color: 'bg-blue-50',
    fields: [
      {
        type: 'text',
        label: 'نام',
        placeholder: 'نام',
        required: true,
        id: 'first_name'
      },
      {
        type: 'text',
        label: 'نام خانوادگی',
        placeholder: 'نام خانوادگی',
        required: true,
        id: 'last_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'tel',
        label: 'شماره تماس',
        placeholder: '09123456789',
        required: false,
        id: 'phone'
      },
      {
        type: 'select',
        label: 'موضوع',
        required: true,
        options: ['پشتیبانی فنی', 'فروش', 'سوال عمومی', 'سایر'],
        id: 'subject'
      },
      {
        type: 'textarea',
        label: 'پیام',
        placeholder: 'پیام خود را بنویسید...',
        required: true,
        rows: 5,
        id: 'message'
      }
    ]
  },
  {
    id: 'contest-entry',
    title: 'فرم شرکت در مسابقه',
    description: 'فرم ثبت‌نام برای مسابقات و قرعه‌کشی',
    icon: '🎁',
    color: 'bg-green-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'full_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'tel',
        label: 'شماره موبایل',
        placeholder: '09123456789',
        required: true,
        id: 'phone'
      },
      {
        type: 'checkbox',
        label: 'قوانین و مقررات را می‌پذیرم',
        required: true,
        id: 'terms'
      },
      {
        type: 'checkbox',
        label: 'مایل به دریافت خبرنامه هستم',
        required: false,
        id: 'newsletter'
      }
    ]
  },
  {
    id: 'donation',
    title: 'فرم اهدا',
    description: 'فرم دریافت کمک‌های مالی و اهدا',
    icon: '💝',
    color: 'bg-pink-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'donor_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'number',
        label: 'مبلغ اهدا (تومان)',
        placeholder: '100000',
        required: true,
        min: 10000,
        id: 'amount'
      },
      {
        type: 'radio',
        label: 'نوع اهدا',
        required: true,
        options: ['یکبار', 'ماهانه', 'سالانه'],
        id: 'donation_type'
      },
      {
        type: 'textarea',
        label: 'پیام (اختیاری)',
        placeholder: 'پیام خود را بنویسید...',
        required: false,
        rows: 3,
        id: 'message'
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'فرم سفارش محصول',
    description: 'فرم ثبت سفارش برای فروشگاه‌های آنلاین',
    icon: '🛒',
    color: 'bg-cyan-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'customer_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'tel',
        label: 'شماره تماس',
        placeholder: '09123456789',
        required: true,
        id: 'phone'
      },
      {
        type: 'select',
        label: 'محصول',
        required: true,
        options: ['محصول 1', 'محصول 2', 'محصول 3'],
        id: 'product'
      },
      {
        type: 'number',
        label: 'تعداد',
        placeholder: '1',
        required: true,
        min: 1,
        id: 'quantity'
      },
      {
        type: 'textarea',
        label: 'آدرس',
        placeholder: 'آدرس کامل پستی',
        required: true,
        rows: 3,
        id: 'address'
      }
    ]
  },
  {
    id: 'stripe-checkout',
    title: 'فرم پرداخت Stripe',
    description: 'فرم پرداخت آنلاین با درگاه Stripe',
    icon: '💳',
    color: 'bg-indigo-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'customer_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'number',
        label: 'مبلغ (تومان)',
        placeholder: '100000',
        required: true,
        min: 1000,
        id: 'amount'
      },
      {
        type: 'text',
        label: 'توضیحات',
        placeholder: 'توضیحات پرداخت',
        required: false,
        id: 'description'
      }
    ]
  },
  {
    id: 'paypal-checkout',
    title: 'فرم پرداخت PayPal',
    description: 'فرم پرداخت آنلاین با درگاه PayPal',
    icon: '💰',
    color: 'bg-yellow-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'customer_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'number',
        label: 'مبلغ (دلار)',
        placeholder: '10',
        required: true,
        min: 1,
        id: 'amount'
      },
      {
        type: 'select',
        label: 'ارز',
        required: true,
        options: ['USD', 'EUR', 'GBP'],
        id: 'currency'
      }
    ]
  },
  {
    id: 'employment',
    title: 'فرم درخواست استخدام',
    description: 'فرم ثبت‌نام برای موقعیت‌های شغلی',
    icon: '💼',
    color: 'bg-purple-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'applicant_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'tel',
        label: 'شماره تماس',
        placeholder: '09123456789',
        required: true,
        id: 'phone'
      },
      {
        type: 'select',
        label: 'موقعیت شغلی',
        required: true,
        options: ['برنامه‌نویس', 'طراح', 'مدیر پروژه', 'سایر'],
        id: 'position'
      },
      {
        type: 'file',
        label: 'رزومه (PDF)',
        required: true,
        accept: '.pdf',
        id: 'resume'
      },
      {
        type: 'textarea',
        label: 'معرفی خود',
        placeholder: 'درباره خود و تجربیات خود بنویسید...',
        required: true,
        rows: 5,
        id: 'cover_letter'
      }
    ]
  },
  {
    id: 'event-registration',
    title: 'فرم ثبت‌نام رویداد',
    description: 'فرم ثبت‌نام برای رویدادها و کنفرانس‌ها',
    icon: '📅',
    color: 'bg-teal-50',
    fields: [
      {
        type: 'text',
        label: 'نام و نام خانوادگی',
        placeholder: 'نام کامل',
        required: true,
        id: 'attendee_name'
      },
      {
        type: 'email',
        label: 'ایمیل',
        placeholder: 'example@email.com',
        required: true,
        id: 'email'
      },
      {
        type: 'tel',
        label: 'شماره تماس',
        placeholder: '09123456789',
        required: true,
        id: 'phone'
      },
      {
        type: 'select',
        label: 'نوع بلیت',
        required: true,
        options: ['عادی', 'VIP', 'دانشجویی'],
        id: 'ticket_type'
      },
      {
        type: 'number',
        label: 'تعداد شرکت‌کنندگان',
        placeholder: '1',
        required: true,
        min: 1,
        max: 10,
        id: 'attendees_count'
      },
      {
        type: 'textarea',
        label: 'نیازهای ویژه (اختیاری)',
        placeholder: 'نیازهای غذایی، دسترسی و...',
        required: false,
        rows: 3,
        id: 'special_requirements'
      }
    ]
  }
];

export default function TemplateGallery({ onClose, onSelectTemplate }: TemplateGalleryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const handleUseTemplate = () => {
    onSelectTemplate(selectedTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">انتخاب قالب فرم</h2>
            <p className="text-sm text-gray-600 mt-1">
              یک قالب آماده انتخاب کنید یا با فرم خالی شروع کنید
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                  selectedTemplate?.id === template.id
                    ? 'border-blue-600 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {/* Template Preview */}
                <div className={`${template.color} rounded-t-lg p-6 flex items-center justify-center h-40 relative overflow-hidden`}>
                  {template.id === 'blank' ? (
                    <div className="flex items-center justify-center w-full h-full">
                      <FiPlus size={48} className="text-gray-400" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl">{template.icon}</div>
                    </div>
                  )}
                  
                  {/* Preview/Use Button on Hover */}
                  {hoveredTemplate === template.id && template.id !== 'blank' && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                        }}
                        className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-100 transition text-sm font-medium"
                      >
                        پیش‌نمایش
                      </button>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 bg-white rounded-b-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
                </div>

                {/* Selected Indicator */}
                {selectedTemplate?.id === template.id && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between rounded-b-lg">
          <div className="text-sm text-gray-600">
            {selectedTemplate ? (
              <span>
                <strong>{selectedTemplate.title}</strong> انتخاب شده
              </span>
            ) : (
              <span>یک قالب را انتخاب کنید</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
            >
              انصراف
            </button>
            <button
              onClick={handleUseTemplate}
              disabled={!selectedTemplate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              استفاده از قالب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
