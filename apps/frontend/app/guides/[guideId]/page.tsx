'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

// Mock data for guide content
const guideContent = {
  'morning-routine': {
    title: 'Creating an Effective Morning Routine',
    description:
      'Help your child start the day right with these structured steps.',
    steps: [
      {
        id: 1,
        title: 'Prepare the Night Before',
        description:
          'Set out clothes, pack backpack, and prepare lunch to reduce morning stress.',
      },
      {
        id: 2,
        title: 'Wake Up Early',
        description:
          'Start the day 15 minutes before your child to prepare yourself first.',
      },
      {
        id: 3,
        title: 'Consistent Wake-Up Time',
        description:
          'Wake your child at the same time every day to establish a natural rhythm.',
      },
      {
        id: 4,
        title: 'Morning Hygiene',
        description:
          'Guide through bathroom routine, teeth brushing, and face washing.',
      },
      {
        id: 5,
        title: 'Healthy Breakfast',
        description:
          'Provide a nutritious breakfast with protein, whole grains, and fruits.',
      },
      {
        id: 6,
        title: 'Final Check',
        description:
          'Review backpack, homework, and any special items needed for the day.',
      },
    ],
  },
  'teacher-meeting': {
    title: 'Preparing for Teacher Meetings',
    description:
      'Make the most out of parent-teacher conferences with this guide.',
    steps: [
      {
        id: 1,
        title: 'Review Previous Notes',
        description:
          'Go through any previous meeting notes or communications with the teacher.',
      },
      {
        id: 2,
        title: 'Prepare Questions',
        description:
          "Write down specific questions about your child's progress and needs.",
      },
      {
        id: 3,
        title: 'Gather Information',
        description:
          'Collect relevant documents, report cards, or work samples to discuss.',
      },
      {
        id: 4,
        title: 'Set Goals',
        description: 'Think about what you want to achieve from the meeting.',
      },
      {
        id: 5,
        title: 'Plan Your Time',
        description:
          'Arrive early and be mindful of the time allocated for the meeting.',
      },
    ],
  },
  // Add more guide content as needed
};

type PageProps = {
  params: Promise<{ guideId: string }>;
};

export default function GuidePage({ params }: PageProps) {
  const { guideId } = use(params);
  const guide = guideContent[guideId as keyof typeof guideContent];

  if (!guide) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-4">Guide Not Found</h1>
        <p className="text-gray-600 mb-6">
          The requested guide could not be found.
        </p>
        <Link href="/guides" className="text-blue-600 hover:text-blue-800">
          Back to Guides
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link
        href="/guides"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Guides
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
        <p className="text-gray-600 mb-8">{guide.description}</p>

        <div className="space-y-8">
          {guide.steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  {step.id}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
