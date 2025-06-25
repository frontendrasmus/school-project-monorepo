import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
  siblings: {
    title: 'Supporting Siblings',
    description:
      "Help siblings cope and stay involved during their brother or sister's treatment.",
    steps: [
      {
        id: 1,
        title: 'Open Conversations',
        description: 'Regularly talk about feelings and concerns.',
      },
      {
        id: 2,
        title: 'Quality Time',
        description: 'Schedule one-on-one activities with each sibling.',
      },
      {
        id: 3,
        title: 'Involve Them',
        description:
          'Let siblings participate in simple care tasks or hospital visits if appropriate.',
      },
    ],
  },
  'hospital-stay': {
    title: 'Preparing for a Hospital Stay',
    description:
      'Essential information and tips for preparing your child for a hospital stay.',
    steps: [
      {
        id: 1,
        title: 'Pack Comfort Items',
        description:
          'Bring favorite toys, books or blankets to make the hospital feel familiar.',
      },
      {
        id: 2,
        title: 'Tour the Ward',
        description:
          'If possible, visit the ward beforehand to reduce anxiety.',
      },
      {
        id: 3,
        title: 'Explain Procedures',
        description:
          'Use age-appropriate language to describe what will happen.',
      },
    ],
  },
  'medical-terms': {
    title: 'Understanding Medical Terms',
    description: 'A glossary of common medical terms and their explanations.',
    steps: [
      {
        id: 1,
        title: 'Read the Glossary',
        description: 'Review A-Z list of terms provided by the hospital.',
      },
      {
        id: 2,
        title: 'Ask Questions',
        description: 'Always ask healthcare staff to clarify unfamiliar words.',
      },
    ],
  },
  'emotional-support': {
    title: 'Emotional Support for Parents',
    description:
      "Guidance on managing emotions and stress during your child's treatment.",
    steps: [
      {
        id: 1,
        title: 'Acknowledge Feelings',
        description:
          "It's normal to feel worried, angry or sad—recognise these emotions.",
      },
      {
        id: 2,
        title: 'Seek Peer Support',
        description: 'Join parent support groups online or in the hospital.',
      },
    ],
  },
  nutrition: {
    title: 'Nutrition During Treatment',
    description:
      'Tips for maintaining proper nutrition during medical treatment.',
    steps: [
      {
        id: 1,
        title: 'Small Frequent Meals',
        description: 'Offer nutrient-dense snacks if appetite is low.',
      },
      {
        id: 2,
        title: 'Consult a Dietician',
        description: 'Get a personalised meal plan suited for the treatment.',
      },
    ],
  },
  'school-support': {
    title: 'School Support During Treatment',
    description:
      "How to maintain your child's education during medical treatment.",
    steps: [
      {
        id: 1,
        title: 'Contact the School',
        description: 'Inform teachers about the treatment schedule early.',
      },
      {
        id: 2,
        title: 'Utilise Home-Teaching',
        description:
          'Arrange for home or hospital teaching services if available.',
      },
    ],
  },
  // Add more guide content as needed
};

type PageProps = {
  params: { guideId: string };
};

export default function GuidePage({ params }: PageProps) {
  const { guideId } = params;
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
