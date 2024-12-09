import React, { useState, useEffect } from 'react';

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    const handleLoad = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Adding a small delay for a smoother transition
      }
    };

    window.addEventListener('load', handleLoad);
    document.addEventListener('readystatechange', handleLoad);

    if (document.readyState === 'complete') {
      handleLoad();
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('readystatechange', handleLoad);
    };
  }, []);

  // Animate loading dots
  useEffect(() => {
    if (!isLoading) return;

    const intervals = ['.', '..', '...'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setLoadingDots(intervals[currentIndex]);
      currentIndex = (currentIndex + 1) % intervals.length;
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center  z-50" style={{ height: '100vh' }}>
          <div className=" flex flex-col items-center justify-center  p-6  text-center">
            <div className="flex justify-center mb-6">
            <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200"
      width="200"
      height="200"
 
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#6366F1" }} />
          <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
        </linearGradient>
      </defs>

      {/* Speech Bubble */}
      <path 
        d="M160 100c0 33.137-26.863 60-60 60-12.297 0-23.892-3.714-33.535-10.086l-26.465 10.086 10.086-26.465C43.714 123.892 40 112.297 40 100c0-33.137 26.863-60 60-60s60 26.863 60 60z"
        fill="url(#logoGradient)"
        stroke="none"
      />

      {/* Dots animation for "typing" effect */}
      <g transform="translate(100, 100)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round">
        <circle cx="-30" cy="0" r="1">
          <animate 
            attributeName="r" 
            values="5;10;100" 
            dur="1s" 
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="0" cy="0" r="1">
          <animate 
            attributeName="r" 
            values="5;10;100" 
            dur="1s" 
            begin="0.2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="30" cy="0" r="1">
          <animate 
            attributeName="r" 
            values="5;10;100" 
            dur="1s" 
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

            </div>
            <p className="mt-4 text-gray-600 text-xl font-semibold">
              Loading{loadingDots}
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PageLoader;
