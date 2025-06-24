'use client';

import { useState, useEffect } from 'react';

type ApiResponse = {
  message: string;
};

function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>).message === 'string'
  );
}

export default function DevPage() {
  const [apiStatus, setApiStatus] = useState<string>('Checking...');
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const raw = (await response.json()) as unknown;
        if (!isApiResponse(raw)) {
          throw new Error('Invalid API response');
        }
        setApiStatus(raw.message);
        setApiError(null);
      } catch (error) {
        setApiStatus('Error');
        setApiError(
          error instanceof Error ? error.message : 'Unknown error occurred',
        );
      }
    };

    void checkApiStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Development Status
          </h1>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                API Status
              </h2>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    apiStatus === 'OK' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-gray-700">{apiStatus}</span>
              </div>
              {apiError && (
                <p className="mt-2 text-sm text-red-600">Error: {apiError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
