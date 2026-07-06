// src/context/SidebarContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('lms-sidebar') === 'collapsed';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('lms-sidebar', next ? 'collapsed' : 'expanded');
      return next;
    });
  };

  const openMobile = () => setIsMobileOpen(true);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggle, isMobileOpen, openMobile, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be inside SidebarProvider');
  return ctx;
};
