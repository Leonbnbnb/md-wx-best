import type { ReactNode } from 'react';
import type { ThemeId } from '../themes/tokens';
export type PreviewProps = {
    markdown: string;
    allowHtml?: boolean;
    showToolbar?: boolean;
    defaultViewport?: 'mobile' | 'desktop';
    viewport?: 'mobile' | 'desktop';
    onViewportChange?: (v: 'mobile' | 'desktop') => void;
    toolbar?: ReactNode;
    themeId?: ThemeId;
};
export declare function Preview(props: PreviewProps): import("react/jsx-runtime").JSX.Element;
