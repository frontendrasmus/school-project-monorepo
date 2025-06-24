'use client';

import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const setLocale = (target: string) => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    setOpen(false);
    router.refresh();
  };

  const labels =
    locale === 'sv'
      ? { sv: 'Svenska', en: 'Engelska' }
      : { sv: 'Swedish', en: 'English' };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-2 py-1 border rounded flex items-center gap-1"
      >
        {labels[locale as 'sv' | 'en']}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 w-36">
          {(['sv', 'en'] as const).map((lng) => (
            <button
              key={lng}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              onClick={() => setLocale(lng)}
            >
              <Check size={14} className={lng === locale ? '' : 'invisible'} />
              {labels[lng]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
