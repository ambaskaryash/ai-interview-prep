import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <svg width="140" height="140" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="appleFaviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
            </linearGradient>
            <linearGradient id="appleFaviconAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
            </linearGradient>
          </defs>
          
          {/* Hexagon shape */}
          <path 
            d="M16 4L26 9V23L16 28L6 23V9L16 4Z" 
            stroke="url(#appleFaviconGradient)" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* Brain/Circuit nodes inside */}
          <circle cx="16" cy="12" r="2" fill="url(#appleFaviconGradient)"/>
          <circle cx="11" cy="20" r="2" fill="url(#appleFaviconGradient)"/>
          <circle cx="21" cy="20" r="2" fill="url(#appleFaviconGradient)"/>
          <path 
            d="M16 12L11 20H21L16 12Z" 
            stroke="url(#appleFaviconGradient)" 
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
