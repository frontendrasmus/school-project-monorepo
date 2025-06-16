'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';

type GuideImageProps = {
  guideId: string;
  title: string;
  className?: string;
};

export function GuideImage({ title, className = '' }: GuideImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Construct the image path - you would store these in the public directory
  const imagePath = `https://picsum.photos/256/144.jpg`;

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-lg bg-gray-100 ${className}`}
    >
      {!error ? (
        <Image
          src={imagePath}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
          <BookOpen className="h-12 w-12 text-blue-600" />
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
