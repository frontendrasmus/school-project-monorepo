import { useTranslations } from 'next-intl';

export default function AdminPage() {
  const t = useTranslations('avatar');
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-4">{t('admin')}</h1>
      <p className="text-gray-600">Admin area placeholder.</p>
    </div>
  );
}
