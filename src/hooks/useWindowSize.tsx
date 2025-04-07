import { useEffect, useLayoutEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const isClient = typeof window !== "undefined";

export function useWindowSize(): WindowSize {
  const getSize = (): WindowSize => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    let animationFrameId: number;

    const handleResize = () => {
      // Use requestAnimationFrame for smoother UI updates
      animationFrameId = window.requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        setWindowSize((prevSize) => {
          if (
            prevSize.width !== innerWidth ||
            prevSize.height !== innerHeight
          ) {
            return { width: innerWidth, height: innerHeight };
          }
          return prevSize;
        });
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return windowSize;
}
