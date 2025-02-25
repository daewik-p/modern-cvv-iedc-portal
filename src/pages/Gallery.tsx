
import React from 'react';

const photos = [
  { src: '/execom/daewik.jpg', alt: 'Photo 1' },
  { src: '/execom/wall1.jpg', alt: 'Photo 2' },
  { src: '/execom/wall6.webp', alt: 'Photo 3' },
  { src: '/execom/wall3.webp', alt: 'Photo 4' },
  { src: '/execom/wall4.webp', alt: 'Photo 5' },
  { src: '/execom/wall5.jpg', alt: 'Photo 6' },
];

const Gallery = () => {
  return (
    <div className="min-h-screen py-16 mt-16 fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 slide-in">
          Activity Arena
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
