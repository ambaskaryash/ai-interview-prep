import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EvoInterview - AI Interview Prep',
    short_name: 'EvoInterview',
    description: 'AI-powered interview preparation platform with voice practice, resume analysis, and personalized feedback.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#667eea',
    categories: ['education', 'productivity', 'business'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/opengraph-image',
        sizes: '1200x630',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}