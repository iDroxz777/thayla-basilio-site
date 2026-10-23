import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'

// Coordenadas em % do recorte quadrado do retrato frontal (public/img/retrato-face.webp).
const FACE = { cx: 49.5, cy: 47, rx: 21, ry: 35 }
// olhos e boca ficam de fora da malha — nenhum desses procedimentos entra ali
const SPARE = [
  { cx: 36, cy: 41.5, rx: 7.5, ry: 4 },
  { cx: 60.5, cy: 41, rx: 7.5, ry: 4 },
  { cx: 50, cy: 66.5, rx: 11, ry: 5 },
]
const inEllipse = (x, y, e, k = 1) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 < k

// Malha de pontos dentro do oval do rosto — pele inteira, não um ponto específico
function field(step) {
  const pts = []
  for (let y = FACE.cy - FACE.ry + step; y < FACE.cy + FACE.ry; y += step) {
    const row = Math.round((y - FACE.cy) / step)
    for (let x = FACE.cx - FACE.rx; x < FACE.cx + FACE.rx; x += step) {
      const px = x + (row % 2 ? step / 2 : 0)
      const skin = inEllipse(px, y, FACE, 0.9) && !SPARE.some((e) => inEllipse(px, y, e))
      if (skin) pts.push([+px.toFixed(2), +y.toFixed(2)])
    }
  }
  return pts
}

const OVAL = `M ${FACE.cx} ${FACE.cy - FACE.ry} a ${FACE.rx} ${FACE.ry} 0 1 1 0 ${FACE.ry * 2} a ${FACE.rx} ${FACE.ry} 0 1 1 0 ${-FACE.ry * 2}`

// leque de vetores saindo de um ponto de entrada, como a cânula distribui o produto
const fan = ([x, y], targets) => targets.map(([tx, ty]) => `M${x} ${y} L${tx} ${ty}`)

const MAPS = {
  toxina: {
    areas: ['Testa', 'Glabela', 'Pés de galinha', 'Masseter'],
    points: [
      [40, 19],
      [50, 17],
      [60, 19],
      [44, 25],
      [56, 25], // testa
      [45.5, 36],
      [51, 36],
      [48.5, 32], // glabela
      [26, 40],
      [25.5, 44],
      [27, 48],
      [71, 39],
      [72, 43],
      [70.5, 47], // pés de galinha
      [30, 64],
      [70, 62], // masseter
    ],
  },
  labial: {
    areas: ['Contorno', 'Arco do cupido', 'Volume'],
    paths: ['M40 66.5 Q43 63 46 62 Q48 62.2 49 62.8 Q50 62.2 52 62 Q56 62.5 59.5 65', 'M40 66.5 Q49 73 59.5 65'],
    points: [
      [46, 62],
      [49, 62.8],
      [52, 62],
      [44.5, 69],
      [54, 68.5],
      [40, 66.5],
      [59.5, 65],
    ],
  },
  reestruturacao: {
    areas: ['Malar', 'Olheiras', 'Mandíbula', 'Mento'],
    paths: ['M28 49 Q32 54 38 55', 'M71 48 Q67 53 61 55', 'M29 62 Q31 74 42 80.5', 'M72 60 Q69 73 58 80.5'],
    points: [
      [33, 52],
      [66, 51],
      [34, 48],
      [61, 48],
      [30, 68],
      [70.5, 67],
      [50, 79.5],
    ],
  },
  bioestimulador: {
    areas: ['Têmporas', 'Terço médio', 'Contorno mandibular'],
    paths: [
      ...fan(
        [73, 58],
        [
          [63, 48],
          [62, 56],
          [64, 66],
          [66, 74],
        ],
      ),
      ...fan(
        [27, 59],
        [
          [37, 49],
          [38, 57],
          [36, 67],
          [34, 75],
        ],
      ),
      ...fan([25, 30], [[31, 24]]),
      ...fan([74, 29], [[68, 23]]),
    ],
    points: [
      [73, 58],
      [27, 59],
      [25, 30],
      [74, 29],
    ],
  },
  micro: { areas: ['Face inteira', 'Textura', 'Poros'], field: field(3.2), dot: 0.32 },
  peeling: { areas: ['Face inteira', 'Manchas', 'Luminosidade'], paths: [OVAL], field: field(5.5), dot: 0.28 },
  skinbooster: { areas: ['Face inteira', 'Micropápulas', 'Hidratação'], field: field(6), ring: true },
}

const ease = [0.22, 1, 0.36, 1]
const MARK = 'var(--color-champagne-soft)'

export default function FaceMap({ map, index, total, compact = false, className = 'aspect-square' }) {
  const data = MAPS[map]
  const clipId = `sweep-${useId().replace(/:/g, '')}-${map}`
  // a foto entra suave quando carrega, em vez de os pontos aparecerem sobre um quadro vazio
  const [photoReady, setPhotoReady] = useState(false)
  const photo = useRef(null)
  // já em cache: o onLoad pode ter disparado antes do React escutar
  useEffect(() => {
    if (photo.current?.complete && photo.current.naturalWidth) setPhotoReady(true)
  }, [])

  return (
    <div>
      <div className={`relative overflow-hidden bg-night ${className}`}>
        <img
          src="/img/retrato-face.webp"
          alt=""
          width="840"
          height="840"
          loading="lazy"
          decoding="async"
          onLoad={() => setPhotoReady(true)}
          ref={photo}
          className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-700 ${
            photoReady ? 'opacity-[0.68]' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-night/15" />

        {/* "slice" recorta igual ao object-cover: os pontos seguem alinhados em qualquer proporção */}
        <svg
          className="absolute inset-0 h-full w-full drop-shadow-[0_0_2px_rgb(20_19_18/0.55)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <AnimatePresence mode="wait">
            {data && (
              <m.g key={map} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                {data.paths?.map((d, i) => (
                  <m.path
                    key={d}
                    d={d}
                    fill="none"
                    stroke={MARK}
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.9 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.08 }}
                  />
                ))}

                {data.field && (
                  // malha inteira num só grupo, revelada por uma máscara que desce:
                  // um nó animado em vez de centenas
                  <g clipPath={`url(#${clipId})`}>
                    <clipPath id={clipId}>
                      <m.rect
                        x="0"
                        y="0"
                        width="100"
                        initial={{ height: 0 }}
                        animate={{ height: 100 }}
                        transition={{ duration: 1.1, ease }}
                      />
                    </clipPath>
                    {data.field.map(([x, y]) =>
                      data.ring ? (
                        <g key={`${x}-${y}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill="none"
                            stroke={MARK}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                          />
                          <circle cx={x} cy={y} r="0.45" fill={MARK} />
                        </g>
                      ) : (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r={data.dot} fill={MARK} opacity="0.9" />
                      ),
                    )}
                  </g>
                )}

                {data.points?.map(([x, y], i) => (
                  <g key={`${x}-${y}`}>
                    <m.circle
                      cx={x}
                      cy={y}
                      r="2.2"
                      fill="none"
                      stroke={MARK}
                      strokeWidth="0.6"
                      vectorEffect="non-scaling-stroke"
                      className="face-pulse"
                      style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${i * 0.15}s` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                    />
                    <m.circle
                      cx={x}
                      cy={y}
                      r="0.75"
                      fill={MARK}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.04 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                  </g>
                ))}
              </m.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {!compact && (
        <div className="mt-5 flex items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <m.div
              key={map ?? 'none'}
              className="flex items-end gap-5"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="font-serif text-6xl font-light leading-[0.8] text-champagne-deep">
                {index >= 0 ? String(index + 1).padStart(2, '0') : '—'}
              </span>
              {data && <span className="eyebrow pb-0.5 text-taupe">{data.areas.join(' · ')}</span>}
            </m.div>
          </AnimatePresence>
          <span className="eyebrow shrink-0 pb-0.5 text-stone">/ {String(total).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  )
}
