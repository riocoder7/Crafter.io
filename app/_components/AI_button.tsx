import NextImage from 'next/image'; // Renamed Image to NextImage to avoid conflict
import React from 'react';

function CrafterLogoButton() {
  return (
    <button className="flex items-center space-x-2 rounded-lg p-3 bg-gradient-to-r from-amber-500 to-slate-700 hover:bg-gradient-to-l transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
      {/* Logo Image */}
      <NextImage src="/sensor-logo.png" alt="Sensor Logo" width={40} height={40} />

      {/* Text with Gradient and Twinkling Effect */}
      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 via-gray-400 to-slate-700 bg-clip-text text-transparent twinkling">
        Crafter.io
      </h1>
    </button>
  );
}

export default CrafterLogoButton;
