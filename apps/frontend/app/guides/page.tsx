'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

// Mock data for guides
const guides = [
  {
    id: 'hospital-stay',
    title: 'Preparing for a Hospital Stay',
    category: 'Hospital Care',
    description:
      'Essential information and tips for preparing your child for a hospital stay.',
  },
  {
    id: 'medical-terms',
    title: 'Understanding Medical Terms',
    category: 'Education',
    description: 'A glossary of common medical terms and their explanations.',
  },
  {
    id: 'emotional-support',
    title: 'Emotional Support for Parents',
    category: 'Mental Health',
    description:
      "Guidance on managing emotions and stress during your child's treatment.",
  },
  {
    id: 'nutrition',
    title: 'Nutrition During Treatment',
    category: 'Health',
    description:
      'Tips for maintaining proper nutrition during medical treatment.',
  },
  {
    id: 'school-support',
    title: 'School Support During Treatment',
    category: 'Education',
    description:
      "How to maintain your child's education during medical treatment.",
  },
  {
    id: 'siblings',
    title: 'Supporting Siblings',
    category: 'Family',
    description:
      "Guidance on helping siblings cope with their brother or sister's illness.",
  },
];

const categories = [
  'All',
  'Hospital Care',
  'Education',
  'Mental Health',
  'Health',
  'Family',
];

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-heading-1 mb-8">Parent Guides</h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search guides..."
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

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.id}`}
            className="block p-6 bg-white rounded-lg border border-neutral-200 hover:border-brand-500 hover:shadow-md transition-all"
          >
            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-body-3 mb-4">
              {guide.category}
            </span>
            <h2 className="text-heading-3 mb-2">{guide.title}</h2>
            <p className="text-body-1 text-subtext-color">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-body-1 text-subtext-color">
            No guides found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
