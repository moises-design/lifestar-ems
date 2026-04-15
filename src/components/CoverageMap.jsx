import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CoverageMap.css'

// RGV cities with approximate lat/lng converted to SVG coords
// Map bounds: ~lng -98.0 to -97.1 (x), lat ~25.8 to 26.5 (y)
const toX = lng => ((lng - (-98.0)) / 0.9) * 520 + 40
const toY = lat => ((26.5 - lat) / 0.7) * 260 + 20

const cities = [
  { name: 'McAllen',       lat: 26.203, lng: -98.230, size: 'lg', type: 'local' },
  { name: 'Edinburg',      lat: 26.302, lng: -98.163, size: 'lg', type: 'local', hq: true },
  { name: 'Mission',       lat: 26.216, lng: -98.325, size: 'md', type: 'local' },
  { name: 'Pharr',         lat: 26.188, lng: -98.184, size: 'md', type: 'local' },
  { name: 'Weslaco',       lat: 26.160, lng: -97.991, size: 'md', type: 'local' },
  { name: 'Harlingen',     lat: 26.190, lng: -97.696, size: 'lg', type: 'local' },
  { name: 'Brownsville',   lat: 25.901, lng: -97.497, size: 'lg', type: 'local' },
  { name: 'San Juan',      lat: 26.190, lng: -98.156, size: 'sm', type: 'local' },
  { name: 'Alamo',         lat: 26.178, lng: -98.122, size: 'sm', type: 'local' },
  { name: 'Donna',         lat: 26.165, lng: -98.050, size: 'sm', type: 'local' },
  { name: 'Mercedes',      lat: 26.148, lng: -97.912, size: 'sm', type: 'local' },
  { name: 'Rio Grande City', lat: 26.380, lng: -98.820, size: 'sm', type: 'local' },
]

const longDistance = [
  { name: 'Houston',        lat: 29.760, lng: -95.369 },
  { name: 'San Antonio',    lat: 29.424, lng: -98.493 },
  { name: 'Corpus Christi', lat: 27.800, lng: -97.396 },
  { name: 'Dallas',         lat: 32.776, lng: -96.797 },
  { name: 'Austin',         lat: 30.267, lng: -97.743 },
]

export default function CoverageMap() {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="covmap section" id="coverage">
      <div className="container">
        <div className="covmap-header">
          <div>
            <span className="label">Service Area</span>
            <h2 className="title">Where We Serve</h2>
            <p className="subtitle">Serving the Rio Grande Valley 24/7. Long-distance pediatric transport available statewide.</p>
          </div>
          <Link to="/request" className="btn btn-blue">Request Transport</Link>
        </div>

        <div className="covmap-layout">
          {/* Left: info */}
          <div className="covmap-info">
            <div className="covmap-zone">
              <div className="cz-dot local" />
              <div>
                <div className="cz-title">Rio Grande Valley</div>
                <div className="cz-cities">
                  {cities.map(c => (
                    <span key={c.name} className={`cz-chip ${c.hq ? 'hq' : ''}`}>
                      {c.hq && '📍 '}{c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="covmap-zone">
              <div className="cz-dot longdist" />
              <div>
                <div className="cz-title">Long-Distance Texas</div>
                <div className="cz-cities">
                  {longDistance.map(c => (
                    <span key={c.name} className="cz-chip longdist">{c.name}</span>
                  ))}
                  <span className="cz-chip all-tx">+ All of Texas</span>
                </div>
                <p className="cz-note">Pediatric long-distance transport available statewide — coordinated with families and providers.</p>
                <Link to="/services/pediatrics" className="btn btn-blue cz-btn">Learn About Long-Distance →</Link>
              </div>
            </div>

            <div className="covmap-dispatch">
              <FaPhone className="cd-ph-icon" />
              <div>
                <div className="cd-label">Dispatch Available 24/7</div>
                <a href="tel:9566606543" className="cd-number">(956) 660-6543</a>
              </div>
            </div>
          </div>

          {/* Right: SVG Map */}
          <div className="covmap-map-wrap">
            <RGVMap cities={cities} hovered={hovered} setHovered={setHovered} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Need to import FaPhone
import { FaPhone } from 'react-icons/fa'

function RGVMap({ cities, hovered, setHovered }) {
  // RGV focused map — approximate SVG positions
  const mapCities = [
    { name: 'Rio Grande City', x: 62,  y: 48,  size: 5,  hq: false },
    { name: 'Mission',         x: 122, y: 120, size: 6,  hq: false },
    { name: 'McAllen',         x: 155, y: 130, size: 9,  hq: false },
    { name: 'Edinburg',        x: 178, y: 102, size: 9,  hq: true  },
    { name: 'Pharr',           x: 168, y: 138, size: 5,  hq: false },
    { name: 'San Juan',        x: 183, y: 140, size: 4,  hq: false },
    { name: 'Alamo',           x: 196, y: 144, size: 4,  hq: false },
    { name: 'Donna',           x: 212, y: 150, size: 4,  hq: false },
    { name: 'Weslaco',         x: 232, y: 152, size: 6,  hq: false },
    { name: 'Mercedes',        x: 258, y: 158, size: 4,  hq: false },
    { name: 'Harlingen',       x: 310, y: 148, size: 8,  hq: false },
    { name: 'Los Fresnos',     x: 338, y: 178, size: 4,  hq: false },
    { name: 'Brownsville',     x: 365, y: 188, size: 9,  hq: false },
  ]

  return (
    <svg viewBox="0 0 460 260" xmlns="http://www.w3.org/2000/svg" className="rgv-svg">
      {/* Background */}
      <rect width="460" height="260" fill="#060D14" rx="8"/>

      {/* Grid lines */}
      {[...Array(10)].map((_,i) => (
        <line key={`h${i}`} x1="0" y1={i*26} x2="460" y2={i*26} stroke="rgba(11,158,217,0.06)" strokeWidth="1"/>
      ))}
      {[...Array(18)].map((_,i) => (
        <line key={`v${i}`} x1={i*26} y1="0" x2={i*26} y2="260" stroke="rgba(11,158,217,0.06)" strokeWidth="1"/>
      ))}

      {/* Rio Grande river (approximate path) */}
      <path
        d="M 20 220 Q 60 215, 100 210 Q 140 205, 180 200 Q 220 196, 260 192 Q 300 190, 340 195 Q 380 198, 420 210 L 460 220"
        fill="none" stroke="rgba(11,158,217,0.35)" strokeWidth="2.5" strokeDasharray="6,3"
      />
      <text x="30" y="240" fill="rgba(11,158,217,0.4)" fontSize="9" fontFamily="Arial" fontStyle="italic">Rio Grande</text>

      {/* Texas outline hint */}
      <path
        d="M 20 20 L 440 20 L 440 200 L 390 220 L 20 220 Z"
        fill="none" stroke="rgba(11,158,217,0.1)" strokeWidth="1"
      />

      {/* Coverage radius glow */}
      <circle cx="230" cy="140" r="140" fill="rgba(11,158,217,0.04)" />
      <circle cx="230" cy="140" r="110" fill="rgba(11,158,217,0.04)" />

      {/* Connection lines between cities */}
      {mapCities.map((c, i) =>
        mapCities.slice(i+1).map((c2, j) => {
          const dist = Math.sqrt(Math.pow(c.x-c2.x,2)+Math.pow(c.y-c2.y,2))
          if (dist < 100) return (
            <line key={`${i}-${j}`} x1={c.x} y1={c.y} x2={c2.x} y2={c2.y}
              stroke="rgba(11,158,217,0.12)" strokeWidth="0.8"/>
          )
          return null
        })
      )}

      {/* County labels */}
      <text x="100" y="90" fill="rgba(255,255,255,0.1)" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">STARR</text>
      <text x="200" y="80" fill="rgba(255,255,255,0.1)" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">HIDALGO</text>
      <text x="340" y="120" fill="rgba(255,255,255,0.1)" fontSize="11" fontFamily="Arial" fontWeight="bold" textAnchor="middle">CAMERON</text>

      {/* City dots */}
      {mapCities.map(c => (
        <g key={c.name}
          onMouseEnter={() => setHovered(c.name)}
          onMouseLeave={() => setHovered(null)}
          style={{cursor:'pointer'}}
        >
          {/* Pulse ring for HQ */}
          {c.hq && (
            <circle cx={c.x} cy={c.y} r={c.size + 6} fill="none"
              stroke="rgba(61,200,255,0.3)" strokeWidth="1.5">
              <animate attributeName="r" values={`${c.size+4};${c.size+14};${c.size+4}`} dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite"/>
            </circle>
          )}
          {/* Main dot */}
          <circle cx={c.x} cy={c.y} r={c.size}
            fill={c.hq ? '#3DC8FF' : hovered === c.name ? '#12AEEE' : '#0B9ED9'}
            stroke={c.hq ? 'rgba(61,200,255,0.8)' : 'rgba(11,158,217,0.5)'}
            strokeWidth={c.hq ? 2 : 1}
            filter="url(#glow)"
          />
          {/* Label */}
          <text
            x={c.x} y={c.y - c.size - 4}
            fill={c.hq ? '#3DC8FF' : hovered === c.name ? 'white' : 'rgba(168,200,220,0.9)'}
            fontSize={c.size > 7 ? 9 : 7.5}
            fontFamily="Arial" fontWeight={c.hq ? 'bold' : 'normal'}
            textAnchor="middle"
          >
            {c.name}
          </text>
        </g>
      ))}

      {/* HQ marker */}
      <text x="178" y="96" fill="#3DC8FF" fontSize="8" fontFamily="Arial" fontWeight="bold" textAnchor="middle">HQ ★</text>

      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Legend */}
      <circle cx="20" cy="248" r="4" fill="#3DC8FF" filter="url(#glow)"/>
      <text x="28" y="252" fill="rgba(168,200,220,0.8)" fontSize="8" fontFamily="Arial">HQ / Main City</text>
      <circle cx="120" cy="248" r="3.5" fill="#0B9ED9"/>
      <text x="128" y="252" fill="rgba(168,200,220,0.8)" fontSize="8" fontFamily="Arial">Service City</text>
      <line x1="220" y1="248" x2="240" y2="248" stroke="rgba(11,158,217,0.35)" strokeWidth="2" strokeDasharray="4,2"/>
      <text x="244" y="252" fill="rgba(168,200,220,0.8)" fontSize="8" fontFamily="Arial">Rio Grande</text>
    </svg>
  )
}
