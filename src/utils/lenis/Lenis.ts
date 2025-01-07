import Lenis from "lenis";

let lenis: Lenis | null = null;

if (typeof window !== "undefined") {
  lenis = new Lenis({
    orientation: "vertical",
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

export const pauseLenis = () => {
  lenis?.stop();
};

export const resumeLenis = () => {
  lenis?.start();
};

export const resetScroll = () => {
  lenis?.scrollTo(0, { immediate: true });
};

export default lenis;
