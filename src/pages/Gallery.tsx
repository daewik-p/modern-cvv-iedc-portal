import React from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 mt-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Activity Arena
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;