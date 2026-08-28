import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Premium Interlocking Chevron Geometric Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="logo-grad-coral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4F12" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="logo-grad-violet" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        
        {/* Momentum Chevron Right / Up (Represents consistency & growth) */}
        <path
          d="M15 25 L55 25 L35 45 L15 45 Z"
          fill="url(#logo-grad-coral)"
          opacity="0.95"
        />
        <path
          d="M35 55 L75 55 L55 75 L15 75 Z"
          fill="url(#logo-grad-violet)"
          opacity="0.95"
        />
        
        {/* Connection node representing Intelligence / Visibility */}
        <circle cx="68" cy="38" r="10" fill="url(#logo-grad-coral)" />
        <path
          d="M55 25 L68 38 L55 55 Z"
          fill="url(#logo-grad-coral)"
          opacity="0.25"
        />
      </svg>
      
      {showText && (
        <span className="font-sans font-extrabold tracking-tight text-xl text-brand-charcoal">
          ZELVORA<span className="text-brand-coral">.STUDIO</span>
        </span>
      )}
    </div>
  );
}
