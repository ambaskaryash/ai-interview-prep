import { ImageResponse } from 'next/og'
 
// Image metadata
export const alt = 'EvoInterview - AI Interview Prep Platform'
export const size = {
  width: 1200,
  height: 600,
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
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* Left side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: '1',
            paddingRight: '40px',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: 'white',
              marginBottom: '16px',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            EvoInterview
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
              lineHeight: '1.3',
            }}
          >
            AI-Powered Interview Prep Platform
          </div>
          
          {/* Features List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '18px',
              fontWeight: '500',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div>
              AI-powered interview practice
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div>
              Resume analysis & optimization
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div>
              Land jobs 2.3x faster
            </div>
          </div>
          
          {/* CTA */}
          <div
            style={{
              marginTop: '32px',
              padding: '16px 32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            Get Started Free
          </div>
        </div>
        
        {/* Right side - Large Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 300px',
          }}
        >
          <svg width="240" height="240" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="twitterLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
              <linearGradient id="twitterAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
            </defs>
            
            {/* Hexagon shape */}
            <path 
              d="M16 4L26 9V23L16 28L6 23V9L16 4Z" 
              stroke="url(#twitterLogoGradient)" 
              strokeWidth="2.5" 
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Brain/Circuit nodes inside */}
            <circle cx="16" cy="12" r="2" fill="url(#twitterLogoGradient)"/>
            <circle cx="11" cy="20" r="2" fill="url(#twitterLogoGradient)"/>
            <circle cx="21" cy="20" r="2" fill="url(#twitterLogoGradient)"/>
            <path 
              d="M16 12L11 20H21L16 12Z" 
              stroke="url(#twitterLogoGradient)" 
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}