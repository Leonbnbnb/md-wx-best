import { useMemo } from 'react'
import { Preview } from './preview/Preview'
export type { PreviewProps } from './preview/Preview'
export { Preview }
export { Toolbar } from './toolbar/Toolbar'
export type { ToolbarProps } from './toolbar/Toolbar'
export type { ThemeId } from './themes/tokens'
export { THEME_TOKENS } from './themes/tokens'
export { exportToWechatHtml, copyToClipboard } from './export/index'
export { useViewMode } from './hooks/useViewMode'
export type { ViewMode } from './hooks/useViewMode'
export { ViewModeToggle } from './components/ViewModeToggle'
export type { ViewModeToggleProps } from './components/ViewModeToggle'

export type PlaceholderPreviewProps = {
  markdown: string
}

export function PlaceholderPreview(props: PlaceholderPreviewProps) {
  const text = useMemo(() => props.markdown.trim().slice(0, 120), [props.markdown])
  return (
    <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>md-wx-renderer</div>
      <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontSize: 12 }}>
        {text || '(empty markdown)'}
      </div>
    </div>
  )
}
