'use client';

import Link from 'next/link';
import { ArrowLeft, Copy } from 'lucide-react';
import { useState } from 'react';

// Mock data for template content
const templateContent = {
  'email-teacher': {
    title: 'Teacher Email Template',
    description: 'Professional email template for communicating with teachers.',
    content: `Subject: [Your Child's Name] - [Specific Topic/Concern]

Dear [Teacher's Name],

I hope this email finds you well. I am writing regarding my child, [Child's Name], who is in your [Subject/Class] class.

[Specific concern or question]

I would appreciate any insights or suggestions you might have regarding this matter.

Thank you for your time and attention to this matter.

Best regards,
[Your Name]
[Your Contact Information]`,
  },
  'weekly-schedule': {
    title: 'Weekly Schedule Template',
    description: "Organize your child's weekly activities and commitments.",
    content: `Weekly Schedule for [Child's Name]

Monday:
- Morning Routine: [Time]
- School: [Time]
- After-School Activities: [Activity and Time]
- Homework: [Time]
- Bedtime: [Time]

Tuesday:
- Morning Routine: [Time]
- School: [Time]
- After-School Activities: [Activity and Time]
- Homework: [Time]
- Bedtime: [Time]

[Continue for Wednesday through Sunday]`,
  },
  'homework-tracker': {
    title: 'Homework Tracker',
    description: 'Keep track of assignments and due dates.',
    content: `Homework Tracker

Subject: [Subject Name]
Assignment: [Assignment Name]
Due Date: [Due Date]
Status: [Not Started/In Progress/Completed]
Notes: [Any additional notes or requirements]`,
  },
  'reading-log': {
    title: 'Reading Log Template',
    description: "Track your child's reading progress and goals.",
    content: `Reading Log

Book Title: [Title]
Author: [Author]
Date Started: [Date]
Date Completed: [Date]
Pages Read: [Number]
Minutes Read: [Number]
Notes: [Child's thoughts or parent's observations]`,
  },
  'medical-info': {
    title: 'Medical Information Form',
    description: 'Important medical information for school records.',
    content: `Medical Information Form

Student Name: [Full Name]
Date of Birth: [DOB]
Grade: [Grade]

Emergency Contacts:
1. [Name] - [Relationship] - [Phone]
2. [Name] - [Relationship] - [Phone]

Medical Conditions:
- [List any medical conditions]

Allergies:
- [List any allergies]

Medications:
- [List any medications]

Insurance Information:
Provider: [Name]
Policy Number: [Number]
Group Number: [Number]`,
  },
  'parent-teacher-meeting': {
    title: 'Parent-Teacher Meeting Notes',
    description: 'Template for taking notes during parent-teacher meetings.',
    content: `Parent-Teacher Meeting Notes

Date: [Date]
Teacher: [Name]
Subject: [Subject]

Academic Progress:
- [Notes about academic performance]

Social Development:
- [Notes about social skills and behavior]

Areas of Strength:
- [List strengths]

Areas for Improvement:
- [List areas needing improvement]

Action Items:
- [List specific actions to take]

Follow-up Date: [Date]`,
  },
};

export default function TemplatePage({
  params,
}: {
  params: { templateId: string };
}) {
  const [copied, setCopied] = useState(false);
  const template =
    templateContent[params.templateId as keyof typeof templateContent];

  if (!template) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
        <p className="text-gray-600 mb-6">
          The requested template could not be found.
        </p>
        <Link href="/templates" className="text-blue-600 hover:text-blue-800">
          Back to Templates
        </Link>
      </div>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link
        href="/templates"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Templates
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
            <p className="text-gray-600">{template.description}</p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Template'}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm">
          {template.content}
        </div>
      </div>
    </div>
  );
}
