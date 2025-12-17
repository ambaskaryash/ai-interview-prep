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
          
          {/* Hexagon shape */}
          <path 
            d="M16 4L26 9V23L16 28L6 23V9L16 4Z" 
            stroke="url(#faviconGradient)" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Brain/Circuit nodes inside */}
          <circle cx="16" cy="12" r="2" fill="url(#faviconGradient)"/>
          <circle cx="11" cy="20" r="2" fill="url(#faviconGradient)"/>
          <circle cx="21" cy="20" r="2" fill="url(#faviconGradient)"/>
          <path 
            d="M16 12L11 20H21L16 12Z" 
            stroke="url(#faviconGradient)" 
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
