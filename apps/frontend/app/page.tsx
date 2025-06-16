'use client';

import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

const features: Feature[] = [
  {
    title: 'Guides',
    description: 'Step-by-step guides to help you navigate school life',
    icon: BookOpen,
    href: '/guides',
  },
  {
    title: 'Templates',
    description: 'Ready-to-use templates for school communication',
    icon: FileText,
    href: '/templates',
  },
  {
    title: 'Calendar',
    description: 'Keep track of important school dates and events',
    icon: Calendar,
    href: '/calendar',
  },
  {
    title: 'Community',
    description: 'Connect with other parents and share experiences',
    icon: Users,
    href: '/community',
  },
  {
    title: 'Messages',
    description: 'Direct communication with teachers and school staff',
    icon: MessageSquare,
    href: '/messages',
  },
  {
    title: 'Find Help',
    description: 'Get support from local resources and organizations',
    icon: HelpCircle,
    href: '/find-help',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-b from-blue-50 to-white"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/70" aria-hidden="true"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-12 mb-6">
              Supporting Your Child&apos;s Education Journey
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Access resources, connect with teachers, and find support to help
              your child succeed in school.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/onboarding-start"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/find-help"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Find Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
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
