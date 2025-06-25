'use client';

import { AdminSubNav } from '@/app/components/admin-sub-nav';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepModal, type StepInput } from '@/app/components/step-modal';

export default function CreateGuidePage() {
  return (
    <>
      <AdminSubNav />
      <div className="container mx-auto px-4 py-16 mt-4">
        <h1 className="text-3xl font-bold mb-4">Admin</h1>
        <h3 className="text-2xl font-bold mb-4">Create Guide</h3>

        <CreateGuideForm />
      </div>
    </>
  );
}

const categories = [
  'child, 2 to 5 years',
  'child, 6 to 10 years',
  'high-school',
  'adult',
  'physical disability',
  'neurological disability',
  'get diagnosis',
  'teacher',
] as const;

function CreateGuideForm() {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>(
    categories[0],
  );
  const [existingSteps, setExistingSteps] = useState<
    { id: string; title: string }[]
  >([]);
  const [selectedStepIds, setSelectedStepIds] = useState<string[]>([]);
  const [newSteps, setNewSteps] = useState<StepInput[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Fetch steps from API on mount
  useEffect(() => {
    void fetch('/api/steps')
      .then(async (r) => {
        if (r.ok) {
          const data = (await r.json()) as { id: string; title: string }[];
          setExistingSteps(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStepIds.length === 0 && newSteps.length === 0) {
      alert('Please add or create at least one step');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          introduction,
          author,
          categoryId: await getCategoryId(category),
          steps: newSteps,
          existingStepIds: selectedStepIds,
        }),
      });

      if (!res.ok) throw new Error('Failed to create guide');
      router.push('/guides');
    } catch (err) {
      console.error(err);
      alert('Error saving guide');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium" htmlFor="guide-name">
          Name
        </label>
        <input
          id="guide-name"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="My awesome guide"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="guide-intro">
          Introduction
        </label>
        <textarea
          id="guide-intro"
          className="w-full border rounded px-3 py-2"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          required
          placeholder="Short introduction to the guide"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="guide-author">
          Author
        </label>
        <input
          id="guide-author"
          className="w-full border rounded px-3 py-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium" htmlFor="guide-category">
          Category
        </label>
        <select
          id="guide-category"
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as (typeof categories)[number])
          }
          title="Select category"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {existingSteps.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Insert existing step</h4>
          <ul className="space-y-2">
            {existingSteps.map((s: { id: string; title: string }) => (
              <li
                key={s.id}
                className="flex items-center justify-between border rounded px-3 py-2"
              >
                <span>{s.title}</span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedStepIds((prev: string[]): string[] =>
                      prev.includes(s.id) ? prev : [...prev, s.id],
                    )
                  }
                  disabled={selectedStepIds.includes(s.id)}
                  className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50"
                >
                  {selectedStepIds.includes(s.id) ? 'Inserted' : 'Insert'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Display selected new steps summary */}
      {newSteps.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">New steps to create</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {newSteps.map(({ title }, idx: number) => (
              <li key={idx}>{title}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Create Step modal trigger */}
      <StepModal
        triggerLabel="Create Step"
        onCreated={(step: StepInput) => setNewSteps(newSteps.concat(step))}
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {submitting ? 'Creating...' : 'Create Guide'}
      </button>
    </form>
  );
}

async function getCategoryId(title: string): Promise<string> {
  // Simple fetch to categories API if exists; fallback to slug lookup later.
  // For now, assume title is unique and backend will upsert.
  return fetch(`/api/categories?title=${encodeURIComponent(title)}`)
    .then(async (r) => {
      if (r.ok) {
        const { id } = (await r.json()) as { id: string };
        return id;
      }
      return '';
    })
    .catch(() => '');
}
