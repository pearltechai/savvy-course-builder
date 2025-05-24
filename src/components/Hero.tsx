
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
          Learn Anything with AI
        </h1>
        <p className="max-w-2xl text-gray-600 text-lg md:text-xl leading-relaxed">
          Generate personalized courses on any topic with our AI education platform.
          Just search a topic and start learning right away.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
            How It Works
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
