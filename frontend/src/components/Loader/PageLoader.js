import React, { useState, useEffect } from 'react';
import WisprLogo from "../LandingPage/WisprLogo";

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
              <WisprLogo  />
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
