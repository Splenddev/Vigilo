import React from 'react';

const InlineLoader = ({
  size = 20,
  color = '#6B46C1',
  title = 'Loading',
  className = '',
  speed = 1.5 // Animation speed in seconds
}) => {
  const strokeWidth = Math.max(2, Math.round(size * 0.12));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      {/* Background circle (optional - uncomment if you want a track) */}
      {/* <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.2"
      /> */}

      {/* Animated loading circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.25} // Start at 75% of the circle
        style={{
          transformOrigin: 'center',
          animation: `spin ${speed}s linear infinite, dash ${speed * 1.5}s ease-in-out infinite`
        }}
      />

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes dash {
          0% {
            stroke-dasharray: ${circumference * 0.1}, ${circumference};
            stroke-dashoffset: -0.1;
          }
          50% {
            stroke-dasharray: ${circumference * 0.7}, ${circumference};
            stroke-dashoffset: ${-circumference * 0.35};
          }
          100% {
            stroke-dasharray: ${circumference * 0.1}, ${circumference};
            stroke-dashoffset: ${-circumference};
          }
        }
      `}</style>
    </svg>
  );
};

export default InlineLoader;