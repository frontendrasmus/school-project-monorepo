'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function DashboardContent() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome, {firstName ?? ''} {lastName ?? ''}!
        </h1>
        <p className="text-gray-600 mb-12">
          {
            "This is your dashboard where you'll find all your important information."
          }
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Your recommended actions:
        </h2>

        <div className="space-y-6">
          {/* Healthcare Contact Points Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact points for healthcare near you
              </h3>
              <p className="text-gray-600 mb-6">
                {
                  "Based on your location, we've found these healthcare facilities that can provide support for your child's needs."
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      Karolinska University Hospital
                    </h4>
                    <p className="text-sm text-gray-600">
                      Eugeniavägen 3, 171 64 Solna
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Specializes in: Pediatrics, Mental Health</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      {"Astrid Lindgren Children's Hospital"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Eugeniavägen 23, 171 64 Solna
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Specializes in: Pediatric Care, Child Development</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                href="/find-help"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Recommended Next Actions Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Recommended next actions for your child
              </h3>
              <p className="text-gray-600 mb-6">
                {
                  "Based on your child's profile and needs, here are the recommended next steps to ensure proper support and care."
                }
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Schedule Initial Assessment</h4>
                    <p className="text-sm text-gray-600">
                      Book an appointment with a pediatric specialist for a
                      comprehensive evaluation
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Priority: High</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">
                      Review School Support Options
                    </h4>
                    <p className="text-sm text-gray-600">
                      Explore available educational support programs and
                      accommodations
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Priority: Medium</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Link
                href="/guides"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div />}>
      <DashboardContent />
    </Suspense>
  );
}
