'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormItem {
  label: string;
  type: string;
  ariaLabel: string;
  options?: string[];
}

export default function ContactForm() {
  const t = useTranslations('form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const formItems: FormItem[] = [
    {
      label: t('title'),
      type: 'text',
      ariaLabel: 'title'
    },
    {
      label: t('slug'),
      type: 'text',
      ariaLabel: 'slug'
    },
    {
      label: t('author'),
      type: 'text',
      ariaLabel: 'author'
    },
    {
      label: t('tags'),
      type: 'select',
      ariaLabel: 'tags',
      options: [
        t('categories.productivity'),
        t('categories.study'),
        t('categories.wellness'),
        t('categories.technology')
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    console.log('Form data:', Object.fromEntries(formData.entries()));

    try {
      // Aquí iría la lógica de envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      setStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary-blue">
        {t('newPost')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formItems.map((item, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={item.ariaLabel} className="block text-sm font-medium text-gray-700">
              {item.label}
            </label>
            
            {item.type === 'select' ? (
              <select
                id={item.ariaLabel}
                name={item.ariaLabel}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
                defaultValue=""
              >
                <option value="" disabled>{t('selectCategory')}</option>
                {item.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={item.type}
                id={item.ariaLabel}
                name={item.ariaLabel}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-4 py-2 text-white bg-primary-blue rounded-md hover:bg-primary-purple transition-colors duration-300 disabled:opacity-50"
        >
          {status === 'loading' ? t('saving') : t('save')}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">{t('messages.saved')}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-center">{t('messages.error')}</p>
        )}
      </form>
    </div>
  );
}