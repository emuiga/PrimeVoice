import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Prime Voice Media — Voice That Resonates, Impact That Lasts!'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
        {/* Top orange bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#FF5A1F' }} />

        {/* Decorative circle rings — right side */}
        <div style={{
          position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)',
          width: '480px', height: '480px', borderRadius: '50%',
          border: '1px solid rgba(94,24,154,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '360px', height: '360px', borderRadius: '50%', border: '1px solid rgba(94,24,154,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,90,31,0.2)' }} />
          </div>
        </div>

        {/* Label */}
        <div style={{
          color: '#FF5A1F',
          fontSize: '15px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: '28px',
        }}>
          Professional Voice-Over &amp; Audio Visual
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

        {/* Bottom orange bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#FF5A1F' }} />
      </div>
    ),
    { ...size },
  )
}
