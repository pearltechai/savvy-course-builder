
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-emerald-50 animate-gradient">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-education-primary">
          Learn Anything with AI
        </h1>
        <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed">
          Generate personalized courses on any topic with our AI education platform.
          Just search a topic and start learning right away.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="inline-flex h-9 items-center justify-center rounded-md bg-education-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-education-primary/90">
            How It Works
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
