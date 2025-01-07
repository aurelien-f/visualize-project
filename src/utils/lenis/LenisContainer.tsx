"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import lenis, { pauseLenis, resetScroll } from './Lenis';

const LenisContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    lenis?.start();

    resetScroll();

    return () => {
      pauseLenis();
    };
  }, [pathname]);
  return (
    <>
      {children}
    </>
  );
};

export default LenisContainer;