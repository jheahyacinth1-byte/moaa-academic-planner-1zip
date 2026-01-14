import React from 'react';
import { GOAT_IMAGE_URL } from '../constants';

interface GoatProgressProps {
  percentage: number; // 0 to 100
  currentSp: number;
}

export const GoatProgress: React.FC<GoatProgressProps> = ({ percentage, currentSp }) => {
  // We use the "Liquid Fill" technique.
  // Two layers of the same image.
  // Layer 1: Grayscale (Empty state)
  // Layer 2: Colored (Filled state), inside a container with dynamic height.

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Container for the logo */}
      <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-slate-200 shadow-xl bg-white">
        
        {/* Layer 1: The "Empty" Background (Grayscale) */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src={GOAT_IMAGE_URL} 
                alt="Goat Background" 
                className="w-full h-full object-cover filter grayscale opacity-30"
            />
        </div>

        {/* Layer 2: The "Filled" Foreground (Color) */}
        <div 
            className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-1000 ease-out"
            style={{ height: `${percentage}%` }}
        >
            {/* 
               We must position the image absolutely relative to the CONTAINER, 
               not this div, so it doesn't squash. 
               We use bottom-0 to anchor it.
            */}
             <div className="absolute bottom-0 left-0 w-56 h-56">
                <img 
                    src={GOAT_IMAGE_URL} 
                    alt="Goat Filled" 
                    className="w-full h-full object-cover"
                />
             </div>
             
             {/* Liquid line effect */}
             <div className="absolute top-0 w-full h-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 drop-shadow-md">
            <span className="text-4xl font-bold text-slate-800 bg-white/60 px-2 rounded backdrop-blur-sm">
                {currentSp.toFixed(1)} <span className="text-lg">sp</span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 mt-1 bg-white/60 px-1 rounded">
                Studiepoeng
            </span>
        </div>
      </div>

      {/* Outer Ring Decoration */}
      <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#0f172a" // Dark blue/slate
          strokeWidth="2"
          strokeDasharray="289" // 2 * pi * 46
          strokeDashoffset={289 - (289 * percentage) / 100}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    </div>
  );
};
