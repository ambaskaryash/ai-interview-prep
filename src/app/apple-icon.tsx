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
          
          {/* Outer tech ring */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="url(#appleFaviconGradient)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.7"
          />
          
          {/* Inner circle */}
          <circle
            cx="16"
            cy="16"
            r="11"
            fill="url(#appleFaviconGradient)"
            opacity="0.1"
          />
          
          {/* AI network pattern */}
          <g stroke="url(#appleFaviconAccent)" strokeWidth="1.2" fill="none">
            <circle cx="16" cy="16" r="2" fill="url(#appleFaviconGradient)" />
            
            <path d="M16 14 L20 10 M16 14 L12 10 M16 18 L20 22 M16 18 L12 22" opacity="0.8" />
            <path d="M14 16 L10 16 M18 16 L22 16" opacity="0.8" />
            
            <circle cx="20" cy="10" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
            <circle cx="12" cy="10" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
            <circle cx="20" cy="22" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
            <circle cx="12" cy="22" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
            <circle cx="10" cy="16" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
            <circle cx="22" cy="16" r="1.5" fill="url(#appleFaviconGradient)" opacity="0.9" />
          </g>
          
          {/* Speech indicator */}
          <g opacity="0.9">
            <path
              d="M24 6 Q26 6 26 8 L26 12 Q26 14 24 14 L21 14 L19 16 L21 14 Q19 14 19 12 L19 8 Q19 6 21 6 Z"
              fill="url(#appleFaviconGradient)"
              opacity="0.4"
            />
            <circle cx="21" cy="9" r="0.5" fill="url(#appleFaviconAccent)" />
            <circle cx="23" cy="9" r="0.5" fill="url(#appleFaviconAccent)" />
            <circle cx="22" cy="11" r="0.5" fill="url(#appleFaviconAccent)" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
