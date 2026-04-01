import type { ReactNode } from 'react'
import { Fragment, useMemo } from 'react'
import type { ThemeId } from '../themes/tokens'
import { THEME_TOKENS } from '../themes/tokens'

export type PreviewProps = {
  markdown: string
  allowHtml?: boolean
  showToolbar?: boolean
  defaultViewport?: 'mobile' | 'desktop'
  viewport?: 'mobile' | 'desktop'
  onViewportChange?: (v: 'mobile' | 'desktop') => void
  toolbar?: ReactNode
  themeId?: ThemeId
}

type Block =
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; lang: string; code: string }
  | { type: 'html'; html: string }

function parseMarkdown(md: string, allowHtml: boolean): Block[] {
  const lines = md.replaceAll('\r\n', '\n').split('\n')
  const blocks: Block[] = []
  let i = 0

  const eatBlank = () => {
    while (i < lines.length && lines[i].trim() === '') i += 1
  }

  const readCodeFence = () => {
    const first = lines[i] ?? ''
    const lang = first.trim().slice(3).trim()
    i += 1
    const code: string[] = []
    while (i < lines.length && !lines[i].trim().startsWith('```')) {
      code.push(lines[i])
      i += 1
    }
    if (i < lines.length) i += 1
    blocks.push({ type: 'code', lang, code: code.join('\n') })
  }

  const readList = (ordered: boolean) => {
    const items: string[] = []
    while (i < lines.length) {
      const line = lines[i] ?? ''
      const m = ordered ? line.match(/^\s*\d+\.\s+(.*)$/) : line.match(/^\s*[-*+]\s+(.*)$/)
      if (!m) break
      items.push(m[1] ?? '')
      i += 1
    }
    blocks.push({ type: ordered ? 'ol' : 'ul', items })
  }

  const readBlockquote = () => {
    const q: string[] = []
    while (i < lines.length) {
      const m = (lines[i] ?? '').match(/^\s*>\s?(.*)$/)
      if (!m) break
      q.push(m[1] ?? '')
      i += 1
    }
    blocks.push({ type: 'blockquote', lines: q })
  }

  const readParagraph = () => {
    const p: string[] = []
    while (i < lines.length) {
      const line = lines[i] ?? ''
      if (line.trim() === '') break
      if (line.trim().startsWith('```')) break
      if (/^\s*#{1,6}\s+/.test(line)) break
      if (/^\s*>\s?/.test(line)) break
      if (/^\s*[-*+]\s+/.test(line)) break
      if (/^\s*\d+\.\s+/.test(line)) break
      p.push(line)
      i += 1
    }
    const text = p.join(' ')
    if (allowHtml && /<[^>]+>/.test(text)) {
      blocks.push({ type: 'html', html: text })
    } else {
      blocks.push({ type: 'paragraph', text })
    }
  }

  while (i < lines.length) {
    eatBlank()
    if (i >= lines.length) break

    const line = lines[i] ?? ''
    if (line.trim().startsWith('```')) {
      readCodeFence()
      continue
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/)
    if (h) {
      blocks.push({ type: 'heading', level: h[1].length as 1 | 2 | 3 | 4 | 5 | 6, text: h[2] ?? '' })
      i += 1
      continue
    }

    if (/^\s*>\s?/.test(line)) {
      readBlockquote()
      continue
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      readList(false)
      continue
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      readList(true)
      continue
    }

    readParagraph()
  }

  return blocks
}

function sanitizeHtml(html: string): string {
  let h = html ?? ''
  // remove script/style/iframe and their contents
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '')
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '')
  h = h.replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
  // remove on* event handlers
  h = h.replace(/\s+on[a-z]+=(["']).*?\1/gi, '')
  // neutralize javascript: urls
  h = h.replace(/\s+href=(["'])\s*javascript:[\s\S]*?\1/gi, '')
  h = h.replace(/\s+src=(["'])\s*javascript:[\s\S]*?\1/gi, '')
  // allow only a minimal set of tags; strip others by escaping angle brackets
  // quick pass: replace disallowed tags by their escaped representation
  const allowed = /^(p|br|div|span|strong|em|u|s|blockquote|ul|ol|li|pre|code|a|h[1-6])$/i
  h = h.replace(/<\s*(\/)?\s*([a-z0-9-]+)([^>]*)>/gi, (m, slash: string, tag: string, attrs: string) => {
    const isClose = !!slash
    if (!allowed.test(tag)) {
      return m.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    }
    // keep only href on <a>
    if (/^a$/i.test(tag)) {
      const mHref = attrs.match(/\s+href=(["'])([\s\S]*?)\1/i)
      const href = mHref ? ` href="${mHref[2]}"` : ''
      return isClose ? `</${tag}>` : `<${tag}${href}>`
    }
    return isClose ? `</${tag}>` : `<${tag}>`
  })
  return h
}

function renderInline(text: string): ReactNode {
  const chunks: ReactNode[] = []
  const src = text ?? ''
  let cursor = 0
  let key = 0

  const pushText = (s: string) => {
    if (!s) return
    chunks.push(<Fragment key={`t-${key++}`}>{s}</Fragment>)
  }

  const pushNode = (node: ReactNode) => {
    chunks.push(<Fragment key={`n-${key++}`}>{node}</Fragment>)
  }

  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let m: RegExpExecArray | null

  while ((m = re.exec(src))) {
    const start = m.index
    if (start > cursor) pushText(src.slice(cursor, start))

    if (m[1]) pushNode(<strong>{m[1]}</strong>)
    else if (m[2]) pushNode(<em>{m[2]}</em>)
    else if (m[3]) pushNode(<code>{m[3]}</code>)
    else if (m[4] && m[5]) pushNode(<a href={m[5]} target="_blank" rel="noreferrer">{m[4]}</a>)

    cursor = start + m[0].length
  }

  if (cursor < src.length) pushText(src.slice(cursor))
  return <>{chunks}</>
}

export function Preview(props: PreviewProps) {
  const allowHtml = !!props.allowHtml
  const blocks = useMemo(() => parseMarkdown(props.markdown, allowHtml), [props.markdown, allowHtml])
  const vp = props.viewport || props.defaultViewport || 'mobile'
  const isMobile = vp === 'mobile'
  const showToolbar = props.showToolbar !== false
  const themeId: ThemeId = (props.themeId as ThemeId) || 't-white'
  const t = THEME_TOKENS[themeId]

  const themeStyles = {
    '--t-surface': t.surface,
    '--t-text': t.text,
    '--t-heading': t.heading,
    '--t-heading-font': t.headingFont,
    '--t-strong': t.strong,
    '--t-em': t.em,
    '--t-link': t.link,
    '--t-link-hover': t.linkHover,
    '--t-link-decoration': t.linkDecoration,
    '--t-quote-bg': t.quoteBg,
    '--t-quote-border': t.quoteBorder,
    '--t-quote-text': t.quoteText,
    '--t-list-marker': t.listMarker,
    '--t-inline-code-bg': t.inlineCodeBg,
    '--t-inline-code-border': t.inlineCodeBorder,
    '--t-inline-code-text': t.inlineCodeText,
    '--t-code-bg': t.codeBg,
    '--t-code-border': t.codeBorder,
    '--t-code-text': t.codeText,
    '--t-body': t.body,
    '--t-line': t.line,
    '--t-h1': t.h1,
    '--t-h2': t.h2,
    '--t-h3': t.h3,
    '--t-h4': t.h4,
    '--t-h5': t.h5,
    '--t-h6': t.h6,
  }

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', placeItems: 'center', width: '100%' }}>
        <div
          style={{
            width: isMobile ? 380 : 820,
            maxWidth: '100%',
            borderRadius: isMobile ? 44 : 22,
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'var(--t-surface)',
            padding: isMobile ? 14 : 12,
            position: 'relative',
            boxShadow: '0 26px 80px rgba(0,0,0,0.12)',
            transition: 'all 0.5s ease',
            overflowX: 'auto',
            ...themeStyles,
          }}
        >
          {isMobile ? (
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 132,
                height: 28,
                borderRadius: 999,
                background: 'rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          ) : null}
          <div style={{ borderRadius: isMobile ? 32 : 16, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {showToolbar ? (
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '8px 0',
                  background: 'rgba(0,0,0,0.04)',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {props.toolbar}
              </div>
            ) : null}
            <div style={{ padding: 16, fontSize: 'var(--t-body)', lineHeight: 'var(--t-line)', color: 'var(--t-text)', transition: 'color 240ms ease' }}>
              {blocks.map((b, idx) => {
                if (b.type === 'heading') {
                  const Tag = `h${b.level}` as const
                  const hSize = (t as any)[`h${b.level}`] as string
                  return (
                    <Tag key={idx} style={{ color: 'var(--t-heading)', fontFamily: 'var(--t-heading-font)', fontSize: `var(--t-h${b.level})`, letterSpacing: 0.2, transition: 'color 240ms ease', display: 'flex', alignItems: 'center' }}>
                      <span style={{ width: '4px', height: '1.2em', background: 'var(--t-link)', marginRight: '12px', borderRadius: '2px' }} />
                      {renderInlineWithTheme(b.text, t)}
                    </Tag>
                  )
                }
                if (b.type === 'blockquote') {
                  return (
                    <blockquote
                      key={idx}
                      style={{
                        margin: '12px 0',
                        padding: '10px 12px',
                        borderLeft: '4px solid var(--t-quote-border)',
                        background: 'var(--t-quote-bg)',
                        borderRadius: 10,
                        color: 'var(--t-quote-text)',
                        transition: 'background 240ms ease, color 240ms ease, border-color 240ms ease',
                      }}
                    >
                      {b.lines.map((l, i) => (
                        <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>
                          {renderInlineWithTheme(l, t)}
                        </p>
                      ))}
                    </blockquote>
                  )
                }
                if (b.type === 'ul') {
                  return (
                    <ul key={idx} style={{ margin: '10px 0', paddingLeft: 20, color: 'var(--t-list-marker)' }}>
                      {b.items.map((it, i) => (
                        <li key={i} style={{ margin: '6px 0', color: 'var(--t-text)' }}>
                          {renderInlineWithTheme(it, t)}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (b.type === 'ol') {
                  return (
                    <ol key={idx} style={{ margin: '10px 0', paddingLeft: 20, color: 'var(--t-list-marker)' }}>
                      {b.items.map((it, i) => (
                        <li key={i} style={{ margin: '6px 0', color: 'var(--t-text)' }}>
                          {renderInlineWithTheme(it, t)}
                        </li>
                      ))}
                    </ol>
                  )
                }
                if (b.type === 'code') {
                  // 代码块使用 github-dark 风格，在所有主题下保持一致
                  return (
                    <div
                      key={idx}
                      style={{
                        margin: '12px 0',
                        padding: 12,
                        borderRadius: 10,
                        background: '#1e1e1e',
                        border: '1px solid rgba(0,0,0,0.12)',
                        overflow: 'auto',
                      }}
                    >
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: 'pre',
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                          fontSize: 12.5,
                          color: '#e6e6e6',
                          background: '#1e1e1e',
                        }}
                      >
                        {highlightCode(b.code, b.lang)}
                      </pre>
                    </div>
                  );
                }
                if (b.type === 'html') {
                  const safe = sanitizeHtml(b.html)
                  return <div key={idx} dangerouslySetInnerHTML={{ __html: safe }} />
                }
                return <p key={idx} style={{ margin: '10px 0' }}>
                  {renderInlineWithTheme(b.text, t)}
                </p>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function highlightCode(code: string, lang: string): ReactNode {
  const chunks: ReactNode[] = []
  let cursor = 0
  let key = 0

  const pushText = (s: string) => {
    if (!s) return
    chunks.push(<Fragment key={`t-${key++}`}>{s}</Fragment>)
  }
  const pushNode = (node: ReactNode) => {
    chunks.push(<Fragment key={`n-${key++}`}>{node}</Fragment>)
  }

  // 简单的语法高亮实现，支持常见的 JavaScript/TypeScript 语法
  if (lang === 'js' || lang === 'ts' || lang === 'javascript' || lang === 'typescript' || lang === 'tsx' || lang === 'jsx') {
    // 重置 cursor
    cursor = 0
    
    // 匹配关键字
    const keywordRegex = /\b(const|let|var|function|return|if|else|for|while|switch|case|default|class|export|import|from|async|await|try|catch|finally|type|interface|enum|namespace|module|public|private|protected|static|readonly)\b/g
    keywordRegex.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = keywordRegex.exec(code))) {
      const start = m.index
      if (start > cursor) pushText(code.slice(cursor, start))
      pushNode(<span style={{ color: '#569cd6' }}>{m[0]}</span>)
      cursor = start + m[0].length
    }

    // 匹配字符串
    const stringRegex = /('([^'\\]|\\.)*')|("([^"\\]|\\.)*")|(`([^`\\]|\\.)*`)/g
    stringRegex.lastIndex = 0
    while ((m = stringRegex.exec(code))) {
      const start = m.index
      if (start > cursor) pushText(code.slice(cursor, start))
      pushNode(<span style={{ color: '#ce9178' }}>{m[0]}</span>)
      cursor = start + m[0].length
    }

    // 匹配注释
    const commentRegex = /\/\/.*$/gm
    commentRegex.lastIndex = 0
    while ((m = commentRegex.exec(code))) {
      const start = m.index
      if (start > cursor) pushText(code.slice(cursor, start))
      pushNode(<span style={{ color: '#6a9955' }}>{m[0]}</span>)
      cursor = start + m[0].length
    }

    // 匹配数字
    const numberRegex = /\b\d+(\.\d+)?\b/g
    numberRegex.lastIndex = 0
    while ((m = numberRegex.exec(code))) {
      const start = m.index
      if (start > cursor) pushText(code.slice(cursor, start))
      pushNode(<span style={{ color: '#b5cea8' }}>{m[0]}</span>)
      cursor = start + m[0].length
    }
  }

  if (cursor < code.length) pushText(code.slice(cursor))
  return <>{chunks}</>
}

function renderInlineWithTheme(text: string, t: typeof THEME_TOKENS[keyof typeof THEME_TOKENS]) {
  const chunks: ReactNode[] = []
  const src = text ?? ''
  let cursor = 0
  let key = 0

  const pushText = (s: string) => {
    if (!s) return
    chunks.push(<Fragment key={`t-${key++}`}>{s}</Fragment>)
  }
  const pushNode = (node: ReactNode) => {
    chunks.push(<Fragment key={`n-${key++}`}>{node}</Fragment>)
  }
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    const start = m.index
    if (start > cursor) pushText(src.slice(cursor, start))
    if (m[1]) pushNode(<strong style={{ color: t.strong }}>{m[1]}</strong>)
    else if (m[2]) pushNode(<em style={{ color: t.em }}>{m[2]}</em>)
    else if (m[3])
      pushNode(
        <span
          style={{
            background: 'var(--t-inline-code-bg)',
            border: '1px solid var(--t-inline-code-border)',
            color: 'var(--t-inline-code-text)',
            borderRadius: 8,
            padding: '2px 6px',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '0.95em',
          }}
        >
          {m[3]}
        </span>,
      )
    else if (m[4] && m[5])
      pushNode(
        <a
          href={m[5]}
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'var(--t-link)',
            textDecoration: 'var(--t-link-decoration)',
            textUnderlineOffset: 3,
          }}
        >
          {m[4]}
        </a>,
      )
    cursor = start + m[0].length
  }
  if (cursor < src.length) pushText(src.slice(cursor))
  return <>{chunks}</>
}
