import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
          
          {/* Outer tech ring */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="url(#faviconGradient)"
            strokeWidth="2"
            strokeDasharray="2 2"
            opacity="0.8"
          />
          
          {/* Inner circle */}
          <circle
            cx="16"
            cy="16"
            r="11"
            fill="url(#faviconGradient)"
            opacity="0.15"
          />
          
          {/* AI network pattern */}
          <g stroke="url(#faviconGradient)" strokeWidth="1.5" fill="none">
            <circle cx="16" cy="16" r="2.5" fill="url(#faviconGradient)" />
            
            <path d="M16 13.5 L19.5 10 M16 13.5 L12.5 10 M16 18.5 L19.5 22 M16 18.5 L12.5 22" opacity="0.8" />
            <path d="M13.5 16 L10 16 M18.5 16 L22 16" opacity="0.8" />
            
            <circle cx="19.5" cy="10" r="1.8" fill="url(#faviconGradient)" />
            <circle cx="12.5" cy="10" r="1.8" fill="url(#faviconGradient)" />
            <circle cx="19.5" cy="22" r="1.8" fill="url(#faviconGradient)" />
            <circle cx="12.5" cy="22" r="1.8" fill="url(#faviconGradient)" />
            <circle cx="10" cy="16" r="1.8" fill="url(#faviconGradient)" />
            <circle cx="22" cy="16" r="1.8" fill="url(#faviconGradient)" />
          </g>
          
          {/* Speech indicator */}
          <g opacity="0.9">
            <path
              d="M24 6 Q26 6 26 8 L26 11 Q26 13 24 13 L21.5 13 L20 14.5 L21.5 13 Q20 13 20 11 L20 8 Q20 6 21.5 6 Z"
              fill="url(#faviconGradient)"
              opacity="0.4"
            />
            <circle cx="21.5" cy="8.5" r="0.6" fill="url(#faviconGradient)" />
            <circle cx="23" cy="8.5" r="0.6" fill="url(#faviconGradient)" />
            <circle cx="22.25" cy="10.5" r="0.6" fill="url(#faviconGradient)" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
