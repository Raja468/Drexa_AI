import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Drexa AI | Build smarter. Run safer.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public/logo.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

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
          <img src={logoSrc} style={{ width: 568, height: 320 }} alt="" />

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
