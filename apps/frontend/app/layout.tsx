import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { Providers } from './providers';
import { cookies, headers } from 'next/headers';
import { AbstractIntlMessages } from 'next-intl';
import svMessages from './messages/sv.json';
import enMessages from './messages/en.json';

const inter = Inter({ subsets: ['latin'] });

const LOCALES = ['sv', 'en'] as const;

function detectLocale(): 'sv' | 'en' {
  const cookie = cookies().get('NEXT_LOCALE')?.value;
  if (cookie && LOCALES.includes(cookie as (typeof LOCALES)[number]))
    return cookie as 'sv' | 'en';

  const accept = headers().get('accept-language');
  if (accept) {
    const preferred = accept.split(',')[0]?.split('-')[0];
    if (LOCALES.includes(preferred as (typeof LOCALES)[number]))
      return preferred as 'sv' | 'en';
  }
  return 'sv';
}

export const metadata: Metadata = {
  title: 'School Parent Application',
  description: 'A platform for school parents',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const locale = detectLocale();
  const messages: AbstractIntlMessages =
    locale === 'sv'
      ? (svMessages as AbstractIntlMessages)
      : (enMessages as AbstractIntlMessages);

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} text-default-font bg-default-background`}
      >
        <Providers messages={messages} locale={locale}>
          <Header />
          <main className="min-h-screen bg-neutral-50">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
