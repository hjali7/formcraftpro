import React, { useState } from 'react';
import { FiBook, FiVideo, FiMessageCircle, FiExternalLink, FiCode, FiLifeBuoy, FiFileText, FiZap, FiSearch } from 'react-icons/fi';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: FiBook },
    { id: 'getting-started', label: 'Getting Started', icon: FiZap },
    { id: 'forms', label: 'Forms', icon: FiFileText },
    { id: 'fields', label: 'Fields', icon: FiCode },
    { id: 'entries', label: 'Entries', icon: FiLifeBuoy },
  ];

  const helpTopics = [
    {
      category: 'getting-started',
      title: 'Creating Your First Form',
      description: 'Learn how to create and publish your first form in minutes',
      link: '#'
    },
    {
      category: 'getting-started',
      title: 'Using Form Templates',
      description: 'Start quickly with pre-built form templates',
      link: '#'
    },
    {
      category: 'forms',
      title: 'Form Settings',
      description: 'Configure form behavior, notifications, and confirmations',
      link: '#'
    },
    {
      category: 'forms',
      title: 'Embedding Forms',
      description: 'Add forms to your pages and posts using shortcodes',
      link: '#'
    },
    {
      category: 'forms',
      title: 'Form Styling',
      description: 'Customize the appearance of your forms',
      link: '#'
    },
    {
      category: 'fields',
      title: 'Field Types',
      description: 'Overview of all available field types',
      link: '#'
    },
    {
      category: 'fields',
      title: 'Conditional Logic',
      description: 'Show or hide fields based on user input',
      link: '#'
    },
    {
      category: 'fields',
      title: 'Field Validation',
      description: 'Set up validation rules for your fields',
      link: '#'
    },
    {
      category: 'entries',
      title: 'Managing Entries',
      description: 'View, edit, and export form submissions',
      link: '#'
    },
    {
      category: 'entries',
      title: 'Exporting Data',
      description: 'Export entries to CSV or other formats',
      link: '#'
    },
  ];

  const faqs = [
    {
      question: 'How do I display a form on my website?',
      answer: 'Use the shortcode [formcraft id="X"] where X is your form ID. You can find the shortcode in the form list or form editor.'
    },
    {
      question: 'Can I customize the form styling?',
      answer: 'Yes! You can customize colors, fonts, spacing, and more in the form editor. You can also add custom CSS in the settings.'
    },
    {
      question: 'How do I export form entries?',
      answer: 'Go to the Entries page, select the form, and click the "Export CSV" button. You can also filter entries before exporting.'
    },
    {
      question: 'Can I receive email notifications?',
      answer: 'Yes! Configure email notifications in Settings → Email. You can also set up per-form notifications in the form editor.'
    },
    {
      question: 'How do I add reCAPTCHA to my forms?',
      answer: 'Go to Settings → reCAPTCHA, enable it, and add your site and secret keys from Google reCAPTCHA.'
    },
    {
      question: 'Can I import/export forms?',
      answer: 'Yes! Use the Import/Export page to export forms as JSON and import them on other sites.'
    },
    {
      question: 'How do I delete form data when uninstalling?',
      answer: 'Go to Settings → General and enable "Delete Data on Uninstall" option.'
    },
    {
      question: 'What are the system requirements?',
      answer: 'WordPress 5.0+, PHP 7.4+, and MySQL 5.6+. Check System Status page for detailed information.'
    },
  ];

  const filteredTopics = helpTopics.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFaqs = faqs.filter(faq =>
    searchTerm === '' ||
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Find answers and get help with FormCraft Pro</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search help articles, FAQs, and documentation..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="#" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition group">
          <FiBook size={32} className="mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">Documentation</h3>
          <p className="text-blue-100 text-sm">Complete guides and tutorials</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            Read Docs <FiExternalLink size={16} />
          </div>
        </a>

        <a href="#" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition group">
          <FiVideo size={32} className="mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">Video Tutorials</h3>
          <p className="text-purple-100 text-sm">Step-by-step video guides</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            Watch Videos <FiExternalLink size={16} />
          </div>
        </a>

        <a href="#" className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition group">
          <FiMessageCircle size={32} className="mb-3 group-hover:scale-110 transition" />
          <h3 className="text-xl font-semibold mb-2">Get Support</h3>
          <p className="text-green-100 text-sm">Contact our support team</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            Contact Us <FiExternalLink size={16} />
          </div>
        </a>
      </div>

      {/* Help Topics */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Help Topics</h2>
          <p className="text-sm text-gray-600 mt-1">Browse articles by category</p>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'border-blue-600 text-blue-600 font-medium'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics List */}
        <div className="p-6">
          {filteredTopics.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No articles found matching your search</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTopics.map((topic, index) => (
                <a
                  key={index}
                  href={topic.link}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-600 mt-1">Quick answers to common questions</p>
        </div>

        <div className="p-6">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No FAQs found matching your search</p>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="cursor-pointer font-medium text-gray-900 py-3 flex items-center justify-between hover:text-blue-600 transition">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-2 pb-3 pr-4 border-b border-gray-100">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Developer Resources */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiCode className="text-gray-600" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Developer Resources</h2>
              <p className="text-sm text-gray-600">Technical documentation for developers</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">REST API Documentation</h3>
                <p className="text-sm text-gray-600 mt-1">Integrate with external services</p>
              </div>
              <FiExternalLink className="text-gray-400 group-hover:text-blue-600" size={18} />
            </a>

            <a href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Hooks & Filters</h3>
                <p className="text-sm text-gray-600 mt-1">Extend plugin functionality</p>
              </div>
              <FiExternalLink className="text-gray-400 group-hover:text-blue-600" size={18} />
            </a>

            <a href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Custom Field Types</h3>
                <p className="text-sm text-gray-600 mt-1">Create your own field types</p>
              </div>
              <FiExternalLink className="text-gray-400 group-hover:text-blue-600" size={18} />
            </a>

            <a href="#" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group">
              <div>
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Code Snippets</h3>
                <p className="text-sm text-gray-600 mt-1">Ready-to-use code examples</p>
              </div>
              <FiExternalLink className="text-gray-400 group-hover:text-blue-600" size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <FiLifeBuoy size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-1">Still Need Help?</h2>
              <p className="text-blue-100">Our support team is here to assist you</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href="https://looparc.ir/support" target="_blank" rel="noopener" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
              Submit Ticket
            </a>
            <a href="https://looparc.ir" target="_blank" rel="noopener" className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition border border-white border-opacity-30">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
