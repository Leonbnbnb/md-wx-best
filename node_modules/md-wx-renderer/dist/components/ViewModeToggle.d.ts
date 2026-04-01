import type { ViewMode } from '../hooks/useViewMode';
import type { ThemeTokens } from '../themes/tokens';
export type ViewModeToggleProps = {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    className?: string;
    style?: React.CSSProperties;
    theme?: ThemeTokens;
};
export declare function ViewModeToggle({ viewMode, onViewModeChange, className, style, theme }: ViewModeToggleProps): import("react/jsx-runtime").JSX.Element;
