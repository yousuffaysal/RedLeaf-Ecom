import React, { useState, useEffect } from 'react';
import BIRST_LOGO from '../../assets/BIRST_LOGO.svg';

const Loading = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Hide loading screen after completion
          setTimeout(() => {
            setIsVisible(false);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-deep-teal via-mint-green to-light-sky-blue flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8">
          <div className="relative">
            <img
              src={BIRST_LOGO}
              alt="BIRSTBD Logo"
              className="w-48 h-48 md:w-64 md:h-64 mx-auto object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="relative w-20 h-20 mx-auto">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>

            {/* Animated Ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>

            {/* Inner Dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-white to-mint-green h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white/80 font-dm-sans text-lg">
          <span className="animate-pulse">Loading</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
        </div>

        {/* Tagline */}
        <div className="mt-8 text-white/70 font-dm-sans text-sm max-w-md mx-auto">
          Advancing Research & Innovation
        </div>
      </div>

      {/* Fade out overlay */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 ${loadingProgress >= 100 ? 'opacity-100' : 'opacity-0'
          }`}
      ></div>
    </div>
  );
};

export default Loading;