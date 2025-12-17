import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'EvoInterview - AI Interview Prep Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
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
          flexDirection: 'column',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)',
          }}
        />
        
        {/* Main Content Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="ogLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
                </linearGradient>
                <linearGradient id="ogAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
                </linearGradient>
              </defs>
              
              {/* Hexagon shape */}
              <path 
                d="M16 4L26 9V23L16 28L6 23V9L16 4Z" 
                stroke="url(#ogLogoGradient)" 
                strokeWidth="2.5" 
                strokeLinejoin="round"
                fill="none"
              />
              
              {/* Brain/Circuit nodes inside */}
              <circle cx="16" cy="12" r="2" fill="url(#ogLogoGradient)"/>
              <circle cx="11" cy="20" r="2" fill="url(#ogLogoGradient)"/>
              <circle cx="21" cy="20" r="2" fill="url(#ogLogoGradient)"/>
              <path 
                d="M16 12L11 20H21L16 12Z" 
                stroke="url(#ogLogoGradient)" 
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          
          {/* Main Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: '800',
              color: 'white',
              marginBottom: '24px',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            EvoInterview
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '32px',
              maxWidth: '800px',
              lineHeight: '1.3',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            AI-Powered Interview Preparation Platform
          </div>
          
          {/* Key Features */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              fontSize: '20px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎯 AI Practice
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📄 Resume Analysis
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              💡 Smart Feedback
            </div>
          </div>
          
          {/* Bottom Stats */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '60px',
              right: '60px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <div>Land jobs 2.3x faster</div>
            <div>89% success rate</div>
            <div>Free to use</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}