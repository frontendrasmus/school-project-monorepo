'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MapPin, Clock } from 'lucide-react';

// Mock data for hospital details
const hospitalDetails = {
  karolinska: {
    name: 'Karolinska University Hospital',
    address: 'Eugeniavägen 3, 171 64 Solna',
    phone: '08-123 45 67',
    email: 'info@karolinska.se',
    hours: '24/7',
    services: [
      'Emergency Care',
      'Pediatrics',
      'Maternity Care',
      'Mental Health',
      'Cancer Treatment',
    ],
    description:
      "Karolinska University Hospital is one of Sweden's largest hospitals and a leading medical center in Europe. We provide comprehensive healthcare services with a focus on research and innovation.",
  },
};

export default function HospitalPage() {
  const params = useParams();
  const hospitalId = params.hospitalId as string;
  const hospital = hospitalDetails[hospitalId as keyof typeof hospitalDetails];

  if (!hospital) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-heading-1 mb-4">Hospital Not Found</h1>
        <p className="text-body-1 mb-4">
          The requested hospital could not be found.
        </p>
        <Link
          href="/find-help"
          className="inline-flex items-center text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Link
        href="/find-help"
        className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Link>

      <h1 className="text-heading-1 mb-6">{hospital.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-heading-3 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
              <div>
                <p className="text-body-1 font-medium">Address</p>
                <p className="text-subtext-color">{hospital.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
              <div>
                <p className="text-body-1 font-medium">Phone</p>
                <p className="text-subtext-color">{hospital.phone}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
              <div>
                <p className="text-body-1 font-medium">Email</p>
                <p className="text-subtext-color">{hospital.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-neutral-400 mr-3 mt-0.5" />
              <div>
                <p className="text-body-1 font-medium">Opening Hours</p>
                <p className="text-subtext-color">{hospital.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <h2 className="text-heading-3 mb-4">Available Services</h2>
          <ul className="space-y-2">
            {hospital.services.map((service) => (
              <li key={service} className="flex items-center">
                <span className="h-2 w-2 bg-brand-500 rounded-full mr-3" />
                <span className="text-body-1">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-white p-6 rounded-lg border border-neutral-200">
        <h1 className="text-heading-3 mb-4">About</h1>
        <p className="text-body-1 text-subtext-color">{hospital.description}</p>
      </div>
    </div>
  );
}
