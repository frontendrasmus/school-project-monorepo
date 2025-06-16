'use client';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function OnboardingStart() {
  const router = useRouter();
  const [error, setError] = useState('');
  const submittedRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: 'Signup failed' }));
        throw new Error(errorData.message || 'Signup failed');
      }
      return res;
    },
  });

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      setError('');
      submittedRef.current = true;
      if (!validateEmail(value.email)) {
        setError('Please enter a valid email address.');
        return;
      }
      try {
        await mutation.mutateAsync(value.email);
        router.push('/onboarding-success');
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Signup failed';
        setError(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <h1 className="text-2xl font-bold mb-6">Sign up</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (value.length === 0 || value.length >= 3) {
                  return validateEmail(value)
                    ? undefined
                    : 'Please enter a valid email address.';
                }
                return undefined;
              },
              onSubmit: ({ value }) => {
                if (!validateEmail(value)) {
                  return 'Please enter a valid email address.';
                }
                return undefined;
              },
            }}
          >
            {(field) => {
              const showError =
                !field.state.meta.isValid &&
                (field.state.value.length >= 3 || submittedRef.current) &&
                field.state.meta.errors.length > 0;
              return (
                <>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      // Reset submit flag on change
                      submittedRef.current = false;
                    }}
                  />
                  {showError && (
                    <div className="text-red-600 text-sm mt-1" role="alert">
                      {field.state.meta.errors.join(', ')}
                    </div>
                  )}
                </>
              );
            }}
          </form.Field>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
