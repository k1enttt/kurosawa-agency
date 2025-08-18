'use client'

import React from 'react';
import { useRouter } from 'next/navigation'; // New import
import { IconPhone } from '@tabler/icons-react'; // New import

const FloatingButton = () => {
  const router = useRouter(); // New line
  return (
    <button
      className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg z-50 lg:hidden"
      onClick={() => router.push('/contact')} // Modified line
    >
      <IconPhone size={24} /> {/* Using Tabler Icon */}
    </button>
  );
};

export default FloatingButton;
