'use client';

import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const COUNTRIES = [
  { value: 'sweden', label: 'Sweden' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'norway', label: 'Norway' },
  { value: 'finland', label: 'Finland' },
  { value: 'germany', label: 'Germany' },
] as const;

type Country = (typeof COUNTRIES)[number]['value'];

const SWEDISH_REGIONS = [
  'Norrbottens län',
  'Västerbottens län',
  'Jämtlands län',
  'Västernorrlands län',
  'Gävleborgs län',
  'Dalarnas län',
  'Uppsala län',
  'Värmlands län',
  'Västmanlands län',
  'Stockholms län',
  'Örebro län',
  'Södermanlands län',
  'Östergötlands län',
  'Jönköpings län',
  'Västra Götalands län',
  'Gotlands län',
  'Kronobergs län',
  'Hallands län',
  'Kalmar län',
  'Blekinge län',
  'Skåne län',
] as const;

type Region = (typeof SWEDISH_REGIONS)[number];

export default function OnboardingSuccess() {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: 'sweden' as Country,
      region: undefined as Region | undefined,
    },
    onSubmit: async ({ value }) => {
      setError('');
      try {
        // TODO: Implement API call to save user information
        console.log('Form submitted:', value);
        const searchParams = new URLSearchParams({
          firstName: value.firstName,
          lastName: value.lastName,
        });
        router.push(`/dashboard?${searchParams.toString()}`);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to save information';
        setError(errorMessage);
      }
    },
  });

  const selectedCountry = form.getFieldValue('country');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Sign up successful!</h1>
        <p className="text-green-600 mb-2">Email verified</p>
        <p className="text-gray-600 mb-6">
          To help you find the right information, we need some additional
          information to help you on your way.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="firstName" className="block mb-2 font-medium">
              First Name
            </label>
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) => {
                  if (value.length === 0) return 'First name is required';
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors.join(', ')}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-2 font-medium">
              Last Name
            </label>
            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) => {
                  if (value.length === 0) return 'Last name is required';
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors.join(', ')}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <div>
            <label htmlFor="country" className="block mb-2 font-medium">
              Country
            </label>
            <form.Field
              name="country"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Country is required';
                  return undefined;
                },
              }}
            >
              {(field) => (
                <>
                  <select
                    id="country"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as Country)
                    }
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors.join(', ')}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>

          {selectedCountry && selectedCountry === 'sweden' && (
            <div>
              <label htmlFor="region" className="block mb-2 font-medium">
                Region
              </label>
              <form.Field
                name="region"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Region is required for Sweden';
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <>
                    <select
                      id="region"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value as Region)
                      }
                    >
                      <option value="">Select a region</option>
                      {SWEDISH_REGIONS.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <div className="text-red-600 text-sm mt-1">
                        {field.state.meta.errors.join(', ')}
                      </div>
                    )}
                  </>
                )}
              </form.Field>
            </div>
          )}

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
