'use client';

import {
  Root as DialogRoot,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Title as DialogTitle,
  Close as DialogClose,
} from '@radix-ui/react-dialog';
import { useState } from 'react';

export type StepInput = {
  title: string;
  description: string;
  externalUrl?: string;
  markdown?: string;
  id?: string; // present if persisted
};

interface StepModalProps {
  triggerLabel?: string;
  onCreated: (step: StepInput) => void;
  persist?: boolean;
}

export function StepModal({
  triggerLabel = 'Create New Step',
  onCreated,
  persist = false,
}: StepModalProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setExternalUrl('');
    setMarkdown('');
  };

  const handleSave = async () => {
    if (!title || !description)
      return alert('Title and description are required');

    setSubmitting(true);
    try {
      let step: StepInput = { title, description, externalUrl, markdown };

      if (persist) {
        const res = await fetch('/api/steps', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(step),
        });
        if (!res.ok) throw new Error('Failed to save step');
        step = (await res.json()) as StepInput;
      }

      onCreated(step);
      setOpen(false);
      reset();
    } catch (err) {
      console.error(err);
      alert('Error saving step');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/40" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white p-6 rounded shadow-lg focus:outline-none">
          <DialogTitle className="text-xl font-bold mb-4">New Step</DialogTitle>

          <div className="space-y-4 max-h-[70vh] overflow-auto pr-2">
            <div>
              <label className="block mb-1 font-medium" htmlFor="step-title">
                Title
              </label>
              <input
                id="step-title"
                className="w-full border rounded px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="step-desc">
                Description
              </label>
              <textarea
                id="step-desc"
                className="w-full border rounded px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="step-url">
                External URL (optional)
              </label>
              <input
                id="step-url"
                className="w-full border rounded px-3 py-2"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="step-markdown">
                Markdown JSON (optional)
              </label>
              <textarea
                id="step-markdown"
                className="w-full border rounded px-3 py-2 font-mono text-sm"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder={'{"blocks":[]}'}
                rows={4}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <DialogClose asChild>
              <button
                className="px-4 py-2 rounded border"
                disabled={submitting}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={() => void handleSave()}
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Step'}
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
