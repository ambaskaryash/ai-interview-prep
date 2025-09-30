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
            
            {/* Outer tech ring */}
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="url(#twitterLogoGradient)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.8"
            />
            
            {/* Inner solid circle */}
            <circle
              cx="16"
              cy="16"
              r="11"
              fill="url(#twitterLogoGradient)"
              opacity="0.15"
            />
            
            {/* AI Brain/Circuit pattern */}
            <g stroke="url(#twitterAccentGradient)" strokeWidth="1.2" fill="none">
              {/* Central node */}
              <circle cx="16" cy="16" r="2" fill="url(#twitterLogoGradient)" />
              
              {/* Neural network connections */}
              <path d="M16 14 L20 10 M16 14 L12 10 M16 18 L20 22 M16 18 L12 22" opacity="0.9" />
              <path d="M14 16 L10 16 M18 16 L22 16" opacity="0.9" />
              
              {/* Connection nodes */}
              <circle cx="20" cy="10" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
              <circle cx="12" cy="10" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
              <circle cx="20" cy="22" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
              <circle cx="12" cy="22" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
              <circle cx="10" cy="16" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
              <circle cx="22" cy="16" r="1.5" fill="url(#twitterLogoGradient)" opacity="0.9" />
            </g>
            
            {/* Interview/speech bubble indicator */}
            <g opacity="0.9">
              <path
                d="M24 6 Q26 6 26 8 L26 12 Q26 14 24 14 L21 14 L19 16 L21 14 Q19 14 19 12 L19 8 Q19 6 21 6 Z"
                fill="url(#twitterLogoGradient)"
                opacity="0.4"
              />
              <circle cx="21" cy="9" r="0.5" fill="url(#twitterAccentGradient)" />
              <circle cx="23" cy="9" r="0.5" fill="url(#twitterAccentGradient)" />
              <circle cx="22" cy="11" r="0.5" fill="url(#twitterAccentGradient)" />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}