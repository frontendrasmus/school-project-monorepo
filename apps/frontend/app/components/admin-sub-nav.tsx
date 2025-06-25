'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AdminSubNav = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `font-medium hover:text-blue-600 ${
      pathname.startsWith(href) ? 'text-blue-700 font-semibold' : ''
    }`;

  return (
    <nav className="bg-gray-100 border-b border-gray-200 mt-16">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-8 py-2 text-sm">
          <li>
            <Link
              href="/admin/create-guide"
              className={linkClass('/admin/create-guide')}
            >
              Create Guide
            </Link>
          </li>
          <li>
            <Link
              href="/admin/create-step"
              className={linkClass('/admin/create-step')}
            >
              Create Step
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
