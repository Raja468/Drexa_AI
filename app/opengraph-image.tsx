import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Drexa AI | Build smarter. Run safer.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Logo representation */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 800,
              color: '#16181D',
              letterSpacing: '-0.04em',
            }}
          >
            Drexa AI
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: '40px',
              fontWeight: 600,
              color: '#0B6B57', // Accent color
              letterSpacing: '-0.02em',
            }}
          >
            Build smarter. Run safer.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
