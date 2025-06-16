import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Parent Application',
  description: 'A platform for school parents',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-default-font bg-default-background`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen bg-neutral-50">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
