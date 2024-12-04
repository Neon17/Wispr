import React from 'react';

const WisprLogo = ({ width = "200", height = "200", className = "" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#6366F1" }} />
          <stop offset="100%" style={{ stopColor: "#8B5CF6" }} />
        </linearGradient>
      </defs>
      
      <path 
        d="M160 100c0 33.137-26.863 60-60 60-12.297 0-23.892-3.714-33.535-10.086l-26.465 10.086 10.086-26.465C43.714 123.892 40 112.297 40 100c0-33.137 26.863-60 60-60s60 26.863 60 60z"
        fill="url(#logoGradient)"
        stroke="none"
      />
      
      <g transform="translate(100, 100)" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round">
        <path d="M-20,-5 Q-10,0 -20,5">
          <animate 
            attributeName="d" 
            values="M-20,-5 Q-10,0 -20,5;M-20,-3 Q-10,2 -20,7;M-20,-5 Q-10,0 -20,5" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </path>
        <path d="M-5,-10 Q5,0 -5,10">
          <animate 
            attributeName="d" 
            values="M-5,-10 Q5,0 -5,10;M-5,-8 Q5,2 -5,12;M-5,-10 Q5,0 -5,10" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </path>
        <path d="M10,-15 Q20,0 10,15">
          <animate 
            attributeName="d" 
            values="M10,-15 Q20,0 10,15;M10,-13 Q20,2 10,17;M10,-15 Q20,0 10,15" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
};

export default WisprLogo;