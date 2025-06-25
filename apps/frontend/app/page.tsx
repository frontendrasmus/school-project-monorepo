'use client';

import Link from 'next/link';
import {
  BookOpen,
  FileText,
  HelpCircle,
  LucideIcon,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export default function HomePage() {
  const t = useTranslations('home');

  const features: Feature[] = [
    {
      title: t('features.guides.title'),
      description: t('features.guides.desc'),
      icon: BookOpen,
      href: '/guides',
    },
    {
      title: t('features.templates.title'),
      description: t('features.templates.desc'),
      icon: FileText,
      href: '/templates',
    },
    {
      title: t('features.findHelp.title'),
      description: t('features.findHelp.desc'),
      icon: HelpCircle,
      href: '/find-help',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('/moren-hsu-unsplash.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0" aria-hidden="true"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center min-h-80">
            <h1 className="inline-block text-4xl md:text-5xl font-bold bg-white text-black px-2 mt-12 mb-6">
              {t('hero.title')}
            </h1>
            <p className="inline-block text-xl bg-white text-black px-2 mb-8">
              {t('hero.text')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/guides"
                className="group flex items-center gap-4 px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <div>
                  <span className="block font-semibold">
                    {t('actions.getStarted.title')}
                  </span>
                  <span className="block text-sm opacity-80">
                    {t('actions.getStarted.body')}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/find-help"
                className="group flex items-center gap-4 px-6 py-4 bg-white text-blue-500 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                <div>
                  <span className="block font-semibold">
                    {t('actions.findSupport.title')}
                  </span>
                  <span className="block text-sm opacity-80">
                    {t('actions.findSupport.body')}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('featuresHeader')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: Feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
