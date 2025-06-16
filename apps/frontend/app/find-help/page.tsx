'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

// Mock data for hospitals
const hospitals = [
  {
    id: 'karolinska',
    name: 'Karolinska University Hospital',
    city: 'Stockholm',
    specialty: 'General Medicine',
  },
  {
    id: 'sahlgrenska',
    name: 'Sahlgrenska University Hospital',
    city: 'Gothenburg',
    specialty: 'Pediatrics',
  },
  {
    id: 'skane',
    name: 'Skåne University Hospital',
    city: 'Lund',
    specialty: 'Neurology',
  },
  {
    id: 'akademiska',
    name: 'Akademiska Hospital',
    city: 'Uppsala',
    specialty: 'Research',
  },
  {
    id: 'orebro',
    name: 'Örebro University Hospital',
    city: 'Örebro',
    specialty: 'Cardiology',
  },
  {
    id: 'linkoping',
    name: 'Linköping University Hospital',
    city: 'Linköping',
    specialty: 'Oncology',
  },
  {
    id: 'umea',
    name: 'Umeå University Hospital',
    city: 'Umeå',
    specialty: 'Orthopedics',
  },
  {
    id: 'sundsvall',
    name: 'Sundsvall Hospital',
    city: 'Sundsvall',
    specialty: 'Emergency Care',
  },
  {
    id: 'gavle',
    name: 'Gävle Hospital',
    city: 'Gävle',
    specialty: 'Pediatrics',
  },
  {
    id: 'falun',
    name: 'Falun Hospital',
    city: 'Falun',
    specialty: 'General Medicine',
  },
];

export default function FindHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-heading-1 mb-8">Find Hospital Support</h1>

      {/* Search bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          type="text"
          placeholder="Search hospitals by name, city, or specialty..."
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredHospitals.map((hospital) => (
          <Link
            key={hospital.id}
            href={`/find-help/${hospital.id}`}
            className="block p-6 bg-white rounded-lg border border-neutral-200 hover:border-brand-500 hover:shadow-md transition-all"
          >
            <h2 className="text-heading-3 mb-2">{hospital.name}</h2>
            <div className="flex gap-4 text-subtext-color">
              <span>{hospital.city}</span>
              <span>•</span>
              <span>{hospital.specialty}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
