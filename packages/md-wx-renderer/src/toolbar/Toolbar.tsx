import { useEffect, useMemo, useRef, useState } from 'react'

export type ViewportMode = 'mobile' | 'desktop'

export type ToolbarProps = {
  themeId?: string
  onThemeChange?: (id: string) => void
  viewport?: ViewportMode
  onViewportChange?: (v: ViewportMode) => void
  onCopy?: () => void
}

const THEMES = [
  { id: 't-white', name: '简约白', swatch: 'linear-gradient(135deg,#ffffff,#e5e7eb)' },
  { id: 't-juejin', name: '掘金酱紫', swatch: 'linear-gradient(135deg,#a855f7,#7c3aed)' },
  { id: 't-wechat-dark', name: '樱花粉', swatch: 'linear-gradient(135deg,#fecdd3,#f472b6)' },
  { id: 't-tech-blue', name: '科技蓝', swatch: 'linear-gradient(135deg,#0ea5e9,#22d3ee)' },
  { id: 't-vintage-orange', name: '复古橙', swatch: 'linear-gradient(135deg,#fb923c,#ea580c)' },
]

export function Toolbar(props: ToolbarProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const activeTheme = useMemo(() => {
    const id = props.themeId || THEMES[0].id
    return THEMES.find(t => t.id === id) || THEMES[0]
  }, [props.themeId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      const r = rootRef.current
      if (!r) return
      if (!r.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const viewport = props.viewport || 'mobile'
  const switchViewport = () => {
    const next: ViewportMode = viewport === 'mobile' ? 'desktop' : 'mobile'
    props.onViewportChange && props.onViewportChange(next)
  }

  return (
    <div ref={rootRef} style={{ position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.9)', borderRadius: 999, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
        <button
          onClick={() => setOpen(v => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{ cursor: 'pointer', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, padding: '8px 12px', background: 'rgba(255,255,255,0.85)', display: 'inline-flex', alignItems: 'center' }}
          title="主题"
        >
          <span style={{ fontSize: 16 }}>🌈</span>
          <span style={{ marginLeft: 8, fontWeight: 700 }}>{activeTheme.name}</span>
          <span style={{ marginLeft: 6, opacity: 0.7 }}>▾</span>
        </button>

        <button
          onClick={switchViewport}
          aria-pressed={viewport === 'desktop'}
          style={{ cursor: 'pointer', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, padding: '8px 12px', background: 'rgba(255,255,255,0.85)', display: 'inline-flex', alignItems: 'center' }}
          title="视图切换"
        >
          <span style={{ fontSize: 16 }}>{viewport === 'mobile' ? '📱' : '💻'}</span>
        </button>

        <button
          onClick={() => props.onCopy && props.onCopy()}
          style={{ cursor: 'pointer', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 999, padding: '8px 12px', background: 'rgba(255,255,255,0.85)', display: 'inline-flex', alignItems: 'center' }}
          title="复制"
        >
          <span style={{ fontSize: 16 }}>📋</span>
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          style={{
            marginTop: 8,
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 12,
            padding: 8,
            width: 320,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {THEMES.map(t => (
            <button
              key={t.id}
              role="option"
              aria-selected={t.id === activeTheme.id}
              onClick={() => {
                props.onThemeChange && props.onThemeChange(t.id)
                setOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '10px 12px',
                marginBottom: 6,
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.08)',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 6, background: t.swatch, border: '1px solid rgba(0,0,0,0.1)' }} />
                <span style={{ fontWeight: 650 }}>{t.name}</span>
              </div>
              <span style={{ fontSize: 12, opacity: 0.8 }}>{t.id === activeTheme.id ? '当前' : '切换'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
