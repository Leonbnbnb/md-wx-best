import type { ViewMode } from '../hooks/useViewMode';
import type { ThemeId, ThemeTokens } from '../themes/tokens';

export type ViewModeToggleProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  className?: string;
  style?: React.CSSProperties;
  theme?: ThemeTokens;
};

export function ViewModeToggle({ viewMode, onViewModeChange, className, style, theme }: ViewModeToggleProps) {
  const activeColor = theme?.link || '#667eea';
  const inactiveBackground = theme?.surface || 'white';
  const inactiveColor = theme?.text || '#333';
  
  return (
    <div className={className} style={{ display: 'flex', gap: '0', ...style }}>
      <button
        className={`viewportButton ${viewMode === 'mobile' ? 'active' : ''}`}
        onClick={() => onViewModeChange('mobile')}
        style={{
          padding: '8px 16px',
          borderRadius: '4px 0 0 4px',
          border: '1px solid rgba(0,0,0,0.1)',
          background: viewMode === 'mobile' ? activeColor : inactiveBackground,
          color: viewMode === 'mobile' ? 'white' : inactiveColor,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        📱 手机
      </button>
      <button
        className={`viewportButton ${viewMode === 'desktop' ? 'active' : ''}`}
        onClick={() => onViewModeChange('desktop')}
        style={{
          padding: '8px 16px',
          borderRadius: '0 4px 4px 0',
          border: '1px solid rgba(0,0,0,0.1)',
          borderLeft: 'none',
          background: viewMode === 'desktop' ? activeColor : inactiveBackground,
          color: viewMode === 'desktop' ? 'white' : inactiveColor,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        💻 桌面
      </button>
    </div>
  );
}
