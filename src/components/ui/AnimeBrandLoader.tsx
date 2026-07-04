"use client";

export function AnimeBrandLoader() {
  return (
    <div className="relative w-28 h-40 flex items-center justify-center select-none pointer-events-none">
      {/* Self-contained CSS animations for smooth liquid waving & rising */}
      <style>{`
        @keyframes wave-float {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200px); }
        }
        @keyframes wave-rise {
          0% { transform: translateY(230px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(230px); }
        }
        .wave-path {
          animation: wave-float 4s linear infinite;
          transform-origin: left bottom;
        }
        .wave-wrapper {
          animation: wave-rise 8s ease-in-out infinite;
          transform-origin: center bottom;
        }
      `}</style>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 148.55 228.89"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(217,107,43,0.3)]"
      >
        <defs>
          {/* Precise brand logo clipping mask */}
          <clipPath id="brand-logo-clip">
            <polygon points="148.55 0 148.55 24.34 134.38 32.7 134.38 7.99 148.55 0" />
            <polygon points="14.16 141.33 14.16 214.72 35.23 214.72 35.23 204.54 49.4 196.55 49.4 214.72 70.82 214.72 70.82 184.2 84.99 175.84 84.99 214.72 106.06 214.72 106.06 163.85 120.22 155.5 120.22 228.89 0 228.89 0 85.74 14.16 77.39 14.16 127.16 35.23 127.16 35.23 65.4 49.4 57.04 49.4 127.16 70.82 127.16 70.82 45.05 84.99 36.7 84.99 127.16 106.06 127.16 106.06 24.34 120.22 16.35 120.22 141.33 14.16 141.33" />
            <polygon points="148.55 40.69 148.55 228.89 134.38 228.89 134.38 49.05 148.55 40.69" />
          </clipPath>

          {/* Liquid gradient matching brand colors */}
          <linearGradient id="wave-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8c4a2f" />
            <stop offset="50%" stopColor="#D96B2B" />
            <stop offset="100%" stopColor="#D8C1A8" />
          </linearGradient>
        </defs>

        {/* 1. Low-opacity logo silhouette background */}
        <g id="brand-silhouette" opacity="0.1" fill="#6E6A64">
          <polygon points="148.55 0 148.55 24.34 134.38 32.7 134.38 7.99 148.55 0" />
          <polygon points="14.16 141.33 14.16 214.72 35.23 214.72 35.23 204.54 49.4 196.55 49.4 214.72 70.82 214.72 70.82 184.2 84.99 175.84 84.99 214.72 106.06 214.72 106.06 163.85 120.22 155.5 120.22 228.89 0 228.89 0 85.74 14.16 77.39 14.16 127.16 35.23 127.16 35.23 65.4 49.4 57.04 49.4 127.16 70.82 127.16 70.82 45.05 84.99 36.7 84.99 127.16 106.06 127.16 106.06 24.34 120.22 16.35 120.22 141.33 14.16 141.33" />
          <polygon points="148.55 40.69 148.55 228.89 134.38 228.89 134.38 49.05 148.55 40.69" />
        </g>

        {/* 2. Liquid wave clipped inside the official logo geometry */}
        <g clipPath="url(#brand-logo-clip)">
          <g className="wave-wrapper">
            <path
              className="wave-path"
              fill="url(#wave-grad)"
              d="M 0 40 
                 C 50 20, 50 60, 100 40 
                 C 150 20, 150 60, 200 40 
                 C 250 20, 250 60, 300 40 
                 C 350 20, 350 60, 400 40 
                 L 400 350 L 0 350 Z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
