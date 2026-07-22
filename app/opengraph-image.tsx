import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Prime Voice Media — Voice That Resonates, Impact That Lasts!'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const photoData = await readFile(join(process.cwd(), 'public/images/footerimage.jpg'))
  const photoSrc = `data:image/jpeg;base64,${Buffer.from(photoData).toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A0A2E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(100deg, rgba(26,10,46,0.96) 0%, rgba(26,10,46,0.88) 45%, rgba(26,10,46,0.55) 100%)',
          }}
        />

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ width: '36px', height: '3px', background: '#FF5A1F', marginRight: '16px' }} />
          <div style={{
            color: '#FF5A1F',
            fontSize: '15px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Professional Voice-Over &amp; Audio Visual
          </div>
        </div>

        {/* Company name */}
        <div style={{
          color: '#ffffff',
          fontSize: '76px',
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: '28px',
          maxWidth: '700px',
        }}>
          Prime Voice Media
        </div>

        {/* Tagline */}
        <div style={{
          color: '#FF5A1F',
          fontSize: '30px',
          fontWeight: 400,
          lineHeight: 1.4,
          maxWidth: '600px',
        }}>
          Voice That Resonates, Impact That Lasts!
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute',
          bottom: '56px',
          left: '96px',
          color: 'rgba(255,255,255,0.35)',
          fontSize: '16px',
          letterSpacing: '0.12em',
        }}>
          www.theprimevoicemedia.com
        </div>
      </div>
    ),
    { ...size },
  )
}
