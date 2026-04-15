import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './CoverageMap.css'

const rgvCities = [
  { name: 'Edinburg',       x: 212, y: 115, r: 9,  hq: true  },
  { name: 'McAllen',        x: 178, y: 140, r: 8,  hq: false },
  { name: 'Mission',        x: 140, y: 128, r: 6,  hq: false },
  { name: 'Pharr',          x: 200, y: 152, r: 5,  hq: false },
  { name: 'San Juan',       x: 218, y: 156, r: 4,  hq: false },
  { name: 'Alamo',          x: 232, y: 160, r: 4,  hq: false },
  { name: 'Donna',          x: 248, y: 164, r: 4,  hq: false },
  { name: 'Weslaco',        x: 270, y: 162, r: 6,  hq: false },
  { name: 'Mercedes',       x: 294, y: 168, r: 4,  hq: false },
  { name: 'Harlingen',      x: 346, y: 156, r: 8,  hq: false },
  { name: 'Los Fresnos',    x: 374, y: 185, r: 4,  hq: false },
  { name: 'Brownsville',    x: 406, y: 198, r: 8,  hq: false },
  { name: 'Rio Grande City', x: 72, y: 92,  r: 5,  hq: false },
]

const ldCities = [
  { name: 'Houston',        tx: 420, ty: 40  },
  { name: 'San Antonio',    tx: 230, ty: 28  },
  { name: 'Corpus Christi', tx: 360, ty: 100 },
  { name: 'Dallas',         tx: 390, ty: 16  },
  { name: 'Austin',         tx: 290, ty: 22  },
  { name: 'El Paso',        tx: 50,  ty: 20  },
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
            <p className="subtitle">Serving the Rio Grande Valley for scheduled transport and event coverage, with long-distance pediatric transportation available across Texas.</p>
          </div>
          <Link to="/request" className="btn btn-blue">Request Transport</Link>
        </div>

        <div className="covmap-layout">
          {/* SVG Map */}
          <div className="covmap-svg-wrap">
            <svg viewBox="0 0 500 270" xmlns="http://www.w3.org/2000/svg" className="covmap-svg">
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="hqglow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <radialGradient id="mapbg" cx="50%" cy="60%" r="60%">
                  <stop offset="0%" stopColor="#0C1E3A"/>
                  <stop offset="100%" stopColor="#060D14"/>
                </radialGradient>
                <linearGradient id="rivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(11,158,217,0.2)"/>
                  <stop offset="50%" stopColor="rgba(11,158,217,0.5)"/>
                  <stop offset="100%" stopColor="rgba(11,158,217,0.15)"/>
                </linearGradient>
              </defs>

              {/* Background */}
              <rect width="500" height="270" fill="url(#mapbg)" rx="8"/>

              {/* Subtle grid */}
              {[...Array(11)].map((_,i)=><line key={`h${i}`} x1="0" y1={i*27} x2="500" y2={i*27} stroke="rgba(11,158,217,0.05)" strokeWidth="1"/>)}
              {[...Array(20)].map((_,i)=><line key={`v${i}`} x1={i*26} y1="0" x2={i*26} y2="270" stroke="rgba(11,158,217,0.05)" strokeWidth="1"/>)}

              {/* Texas state border hint */}
              <rect x="18" y="14" width="464" height="228" fill="none" stroke="rgba(11,158,217,0.08)" strokeWidth="1.5" rx="4"/>

              {/* Long distance city markers (top area = rest of Texas) */}
              {ldCities.map(c => (
                <g key={c.name}>
                  <circle cx={c.tx} cy={c.ty} r="4" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.4)" strokeWidth="1"/>
                  <circle cx={c.tx} cy={c.ty} r="2" fill="#A78BFA" filter="url(#glow)"/>
                  {/* Line to RGV center */}
                  <line x1={c.tx} y1={c.ty} x2="230" y2="140" stroke="rgba(167,139,250,0.1)" strokeWidth="0.8" strokeDasharray="3,3"/>
                  <text x={c.tx} y={c.ty - 7} fill="rgba(196,181,253,0.7)" fontSize="7" fontFamily="Arial" textAnchor="middle">{c.name}</text>
                </g>
              ))}

              {/* County regions (subtle fills) */}
              {/* Starr County */}
              <ellipse cx="80" cy="110" rx="55" ry="45" fill="rgba(11,158,217,0.04)" stroke="rgba(11,158,217,0.08)" strokeWidth="1"/>
              <text x="80" y="92" fill="rgba(255,255,255,0.08)" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle">STARR</text>

              {/* Hidalgo County */}
              <ellipse cx="220" cy="148" rx="90" ry="50" fill="rgba(11,158,217,0.05)" stroke="rgba(11,158,217,0.1)" strokeWidth="1"/>
              <text x="220" y="115" fill="rgba(255,255,255,0.1)" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle">HIDALGO</text>

              {/* Cameron County */}
              <ellipse cx="375" cy="175" rx="70" ry="48" fill="rgba(11,158,217,0.04)" stroke="rgba(11,158,217,0.08)" strokeWidth="1"/>
              <text x="375" y="148" fill="rgba(255,255,255,0.08)" fontSize="10" fontFamily="Arial" fontWeight="bold" textAnchor="middle">CAMERON</text>

              {/* Rio Grande river */}
              <path d="M 20 228 Q 50 224, 90 220 Q 130 216, 170 212 Q 210 208, 250 206 Q 290 204, 330 206 Q 370 210, 400 218 Q 430 224, 460 232 L 480 238"
                fill="none" stroke="url(#rivGrad)" strokeWidth="3"/>
              <text x="240" y="244" fill="rgba(11,158,217,0.4)" fontSize="8" fontFamily="Arial" fontStyle="italic" textAnchor="middle">Rio Grande</text>

              {/* Mexico label */}
              <text x="240" y="260" fill="rgba(255,255,255,0.08)" fontSize="9" fontFamily="Arial" textAnchor="middle">M E X I C O</text>

              {/* City connections */}
              {rgvCities.map((c,i) => rgvCities.slice(i+1).map((c2,j) => {
                const d = Math.sqrt(Math.pow(c.x-c2.x,2)+Math.pow(c.y-c2.y,2))
                return d < 100 ? <line key={`${i}-${j}`} x1={c.x} y1={c.y} x2={c2.x} y2={c2.y} stroke="rgba(11,158,217,0.1)" strokeWidth="0.8"/> : null
              }))}

              {/* RGV Cities */}
              {rgvCities.map(c => (
                <g key={c.name} style={{cursor:'pointer'}}
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring for HQ */}
                  {c.hq && <>
                    <circle cx={c.x} cy={c.y} r={c.r+10} fill="none" stroke="rgba(61,200,255,0.2)" strokeWidth="1">
                      <animate attributeName="r" values={`${c.r+6};${c.r+18};${c.r+6}`} dur="2.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={c.x} cy={c.y} r={c.r+4} fill="none" stroke="rgba(61,200,255,0.15)" strokeWidth="1"/>
                  </>}
                  {/* Dot */}
                  <circle cx={c.x} cy={c.y} r={c.r}
                    fill={c.hq ? '#3DC8FF' : hovered===c.name ? '#12AEEE' : '#0B9ED9'}
                    stroke={c.hq ? 'rgba(61,200,255,0.9)' : 'rgba(11,158,217,0.6)'}
                    strokeWidth={c.hq ? 2 : 1}
                    filter={c.hq ? 'url(#hqglow)' : 'url(#glow)'}
                  />
                  {/* Label */}
                  <text x={c.x} y={c.y - c.r - 4}
                    fill={c.hq ? '#3DC8FF' : hovered===c.name ? '#FFFFFF' : 'rgba(168,200,220,0.9)'}
                    fontSize={c.r > 6 ? 9 : 7.5}
                    fontFamily="Arial" fontWeight={c.hq ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >{c.name}</text>
                  {c.hq && <text x={c.x} y={c.y + c.r + 11} fill="rgba(61,200,255,0.7)" fontSize="7" fontFamily="Arial" textAnchor="middle">HQ ★</text>}
                </g>
              ))}

              {/* Legend */}
              <rect x="18" y="248" width="200" height="16" fill="rgba(6,13,20,0.7)"/>
              <circle cx="28" cy="256" r="4" fill="#3DC8FF" filter="url(#glow)"/>
              <text x="36" y="260" fill="rgba(168,200,220,0.8)" fontSize="7.5" fontFamily="Arial">HQ / Headquarters</text>
              <circle cx="108" cy="256" r="3.5" fill="#0B9ED9"/>
              <text x="116" y="260" fill="rgba(168,200,220,0.8)" fontSize="7.5" fontFamily="Arial">Service City</text>
              <circle cx="185" cy="256" r="3" fill="#A78BFA"/>
              <text x="192" y="260" fill="rgba(168,200,220,0.8)" fontSize="7.5" fontFamily="Arial">TX Cities</text>
            </svg>
          </div>

          {/* Info sidebar */}
          <div className="covmap-info">
            <div className="covmap-zone">
              <div className="cz-head">
                <div className="cz-dot local"/>
                <span className="cz-title">Rio Grande Valley</span>
              </div>
              <div className="cz-chips">
                {rgvCities.map(c => (
                  <span key={c.name} className={`cz-chip ${c.hq ? 'hq' : ''} ${hovered===c.name ? 'active' : ''}`}
                    onMouseEnter={() => setHovered(c.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {c.hq && <FaMapMarkerAlt style={{fontSize:'0.6rem',marginRight:'3px'}}/>}{c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="covmap-zone">
              <div className="cz-head">
                <div className="cz-dot ld"/>
                <span className="cz-title">Long-Distance — Texas</span>
              </div>
              <div className="cz-chips">
                {ldCities.map(c => <span key={c.name} className="cz-chip ld">{c.name}</span>)}
                <span className="cz-chip all">+ All of Texas</span>
              </div>
              <p className="cz-note">Long-distance pediatric transport statewide — coordinated with families and providers.</p>
              <Link to="/services/pediatrics" className="btn btn-blue cz-cta">Long-Distance Transport →</Link>
            </div>

            <div className="covmap-contact">
              <FaPhone className="cc-icon"/>
              <div>
                <div className="cc-label">Call to Schedule</div>
                <a href="tel:9566606543" className="cc-num">(956) 660-6543</a>
                <div className="cc-sub">lifestarems.rgv@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
