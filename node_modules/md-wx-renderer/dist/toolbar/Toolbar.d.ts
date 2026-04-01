export type ViewportMode = 'mobile' | 'desktop';
export type ToolbarProps = {
    themeId?: string;
    onThemeChange?: (id: string) => void;
    viewport?: ViewportMode;
    onViewportChange?: (v: ViewportMode) => void;
    onCopy?: () => void;
};
export declare function Toolbar(props: ToolbarProps): import("react/jsx-runtime").JSX.Element;
