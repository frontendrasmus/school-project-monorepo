'use client';

import { useState } from 'react';
import { Search, FileText, Download } from 'lucide-react';

// Mock data for templates
const templates = [
  {
    id: 'absence-letter',
    title: 'School Absence Letter',
    category: 'Communication',
    description:
      "Template for notifying school about your child's medical absence.",
    format: 'DOCX',
  },
  {
    id: 'medical-summary',
    title: 'Medical Summary Form',
    category: 'Medical',
    description:
      "Form to summarize your child's medical history and current treatment.",
    format: 'PDF',
  },
  {
    id: 'medication-schedule',
    title: 'Medication Schedule',
    category: 'Medical',
    description:
      "Template for tracking and scheduling your child's medications.",
    format: 'PDF',
  },
  {
    id: 'school-meeting',
    title: 'School Meeting Agenda',
    category: 'Communication',
    description:
      'Template for planning and organizing school meetings about your child.',
    format: 'DOCX',
  },
  {
    id: 'progress-tracker',
    title: 'Treatment Progress Tracker',
    category: 'Medical',
    description:
      "Template for tracking your child's treatment progress and milestones.",
    format: 'PDF',
  },
  {
    id: 'support-network',
    title: 'Support Network Contact List',
    category: 'Organization',
    description:
      "Template for organizing your child's support network contacts.",
    format: 'DOCX',
  },
];

const categories = ['All', 'Communication', 'Medical', 'Organization'];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-heading-1 mb-8">Document Templates</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md text-body-2 transition-colors ${
                selectedCategory === category
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-brand-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-body-3">
                {template.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-body-3">
                <FileText className="h-4 w-4 mr-2" />
                {template.format}
              </span>
            </div>
            <h2 className="text-heading-3 mb-2">{template.title}</h2>
            <p className="text-body-1 text-subtext-color mb-4">
              {template.description}
            </p>
            <button className="inline-flex items-center text-brand-600 hover:text-brand-700">
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </button>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body-1 text-subtext-color">
            No templates found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
