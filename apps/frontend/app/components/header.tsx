'use client';

import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';
import { AvatarMenu } from './avatar-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const t = useTranslations('header');

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-semibold">
          {t('logo')}
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-8">
            <NavigationMenuItem>
              <Link
                href="/guides"
                className="text-lg font-medium hover:text-blue-600 transition-colors"
              >
                {t('nav.guides')}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/find-help"
                className="text-lg font-medium hover:text-blue-600 transition-colors"
              >
                {t('nav.findHelp')}
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/templates"
                className="text-lg font-medium hover:text-blue-600 transition-colors"
              >
                {t('nav.templates')}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <AvatarMenu />
      </div>
    </header>
  );
};
