import { useState, useCallback } from 'react';

export type ViewMode = 'mobile' | 'desktop';

export function useViewMode(defaultMode: ViewMode = 'mobile') {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'mobile' ? 'desktop' : 'mobile');
  }, []);

  const setMobile = useCallback(() => {
    setViewMode('mobile');
  }, []);

  const setDesktop = useCallback(() => {
    setViewMode('desktop');
  }, []);

  return {
    viewMode,
    setViewMode,
    toggleViewMode,
    setMobile,
    setDesktop,
    isMobile: viewMode === 'mobile',
    isDesktop: viewMode === 'desktop'
  };
}
