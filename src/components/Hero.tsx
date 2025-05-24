
import React from 'react';

const Hero = () => {
  return (
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50">
      <div className="container px-4 sm:px-6 md:px-8 flex flex-col items-center text-center space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          Learn Anything with AI
        </h1>
        <p className="max-w-xl sm:max-w-2xl text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2">
          Generate personalized courses on any topic with our AI education platform.
          Just search a topic and start learning right away.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="inline-flex h-10 sm:h-12 items-center justify-center rounded-xl bg-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
            How It Works
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
