export type ViewMode = 'mobile' | 'desktop';
export declare function useViewMode(defaultMode?: ViewMode): {
    viewMode: ViewMode;
    setViewMode: import("react").Dispatch<import("react").SetStateAction<ViewMode>>;
    toggleViewMode: () => void;
    setMobile: () => void;
    setDesktop: () => void;
    isMobile: boolean;
    isDesktop: boolean;
};
