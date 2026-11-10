'use client';
import { useEffect, useState } from 'react';

const checks = [
  { label: 'HTTPS and SSL valid', ok: true },
  { label: 'Security headers set', ok: true },
  { label: 'No exposed admin login', ok: true },
  { label: 'Outdated plugin found', ok: false },
];

const answers = ['Your business', 'Studio B', 'Agency C'];

export default function HeroVisual() {
  const [score, setScore] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 95
      : 0
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = 95, dur = 1600, start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setScore(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const C = 2 * Math.PI * 54;

  return (
    <div className="hv">
      <style>{`
        .hv{position:relative;width:100%;max-width:480px;font-family:inherit;margin-bottom:90px}
        .hv-card{background:#0f1115;border:1px solid #23262d;border-radius:18px;
          box-shadow:0 30px 80px rgba(0,0,0,.55);color:#e8eaee}
        .hv-sec{padding:22px;animation:hvfloat 6s ease-in-out infinite}
        .hv-ai{position:absolute;right:-12px;bottom:-70px;width:78%;padding:16px;
          background:#f4f1ea;color:#111;border:0;animation:hvfloat 7s ease-in-out infinite reverse}
        .hv-row{display:flex;align-items:center;gap:10px;font-size:14px;padding:7px 0;
          opacity:0;animation:hvrow .5s ease forwards}
        .hv-dot{width:18px;height:18px;border-radius:50%;display:grid;place-items:center;
          font-size:11px;font-weight:700;color:#06120b}
        .hv-tag{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.55}
        .hv-hit{background:#21F48B;color:#06120b;border-radius:8px;font-weight:600}
        @keyframes hvfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes hvrow{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @media (max-width:640px){.hv{margin-bottom:0}.hv-ai{position:static;width:100%;margin-top:16px}}
        @media (prefers-reduced-motion:reduce){.hv-sec,.hv-ai,.hv-row{animation:none;opacity:1}}
      `}</style>

      <div className="hv-card hv-sec">
        <div className="hv-tag">drexa.tech / security-score</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, margin: '14px 0' }}>
          <svg width="130" height="130" viewBox="0 0 130 130" aria-label={`Security score ${score} out of 100`}>
            <circle cx="65" cy="65" r="54" fill="none" stroke="#23262d" strokeWidth="10" />
            <circle cx="65" cy="65" r="54" fill="none" stroke="#21F48B" strokeWidth="10"
              strokeLinecap="round" strokeDasharray={C}
              strokeDashoffset={C * (1 - score / 100)} transform="rotate(-90 65 65)" />
            <text x="65" y="72" textAnchor="middle" fontSize="30" fontWeight="700" fill="#fff">{score}</text>
          </svg>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Security score</div>
            <div style={{ fontSize: 13, opacity: .6 }}>Scan any site in seconds</div>
          </div>
        </div>
        {checks.map((c, i) => (
          <div key={c.label} className="hv-row" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
            <span className="hv-dot" style={{ background: c.ok ? '#21F48B' : '#ffb020' }}>{c.ok ? '✓' : '!'}</span>
            {c.label}
          </div>
        ))}
      </div>

      <div className="hv-card hv-ai">
        <div className="hv-tag" style={{ color: '#111', opacity: 1 }}>AI search · illustrative</div>
        <div style={{ fontSize: 13, margin: '8px 0', fontWeight: 600 }}>
          Who can secure my online store?
        </div>
        {answers.map((a, i) => (
          <div key={a} className={i === 0 ? 'hv-hit' : ''}
            style={{ padding: '6px 10px', fontSize: 13, marginTop: 4, opacity: i === 0 ? 1 : .75 }}>
            {i + 1}. {a}
          </div>
        ))}
      </div>
    </div>
  );
}
