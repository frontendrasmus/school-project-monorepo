import { prisma } from '@/app/utils/prisma';

export const dynamic = 'force-dynamic';

interface TestItem {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function TestItemsPage() {
  const testItems: TestItem[] = await prisma.testItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Items</h1>
      <ul className="space-y-2">
        {testItems.map((item) => (
          <li key={item.id} className="p-2 border rounded">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-500">
              Created: {new Date(item.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
