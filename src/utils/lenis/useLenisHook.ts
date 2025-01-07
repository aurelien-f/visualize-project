import { useCallback } from "react";
import { pauseLenis, resetScroll, resumeLenis } from "./Lenis";

export const useLenisHook = () => {
  const pause = useCallback(() => {
    pauseLenis();
  }, []);

  const resume = useCallback(() => {
    resumeLenis();
  }, []);

  const reset = useCallback(() => {
    resetScroll();
  }, []);

  return {
    pause,
    resume,
    reset,
  };
};
