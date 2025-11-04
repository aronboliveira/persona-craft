import { useEffect, useState } from "react";

export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] = useState(() => {
    if (typeof window === "undefined")
      return { isCoarse: false, isMobile: false, isTablet: false };
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isTouchCapable =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const isMediumScreen = window.matchMedia(
      "(min-width: 769px) and (max-width: 1024px)"
    ).matches;
    return {
      isCoarse: hasCoarsePointer,
      isFine: hasFinePointer,
      isTouchCapable,
      isMobile: isSmallScreen && isTouchCapable,
      isTablet: isMediumScreen && isTouchCapable,
      hasHybridInput: hasCoarsePointer && hasFinePointer,
    };
  });
  useEffect(() => {
    if (typeof window === "undefined") return;

    const queries = {
      coarse: window.matchMedia("(pointer: coarse)"),
      fine: window.matchMedia("(pointer: fine)"),
      small: window.matchMedia("(max-width: 768px)"),
      medium: window.matchMedia("(min-width: 769px) and (max-width: 1024px)"),
    };

    const updateDeviceInfo = () => {
      const isTouchCapable =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setDeviceInfo({
        isCoarse: queries.coarse.matches,
        isFine: queries.fine.matches,
        isTouchCapable,
        isMobile: queries.small.matches && isTouchCapable,
        isTablet: queries.medium.matches && isTouchCapable,
        hasHybridInput: queries.coarse.matches && queries.fine.matches,
      });
    };

    Object.values(queries).forEach(mq => {
      mq.addEventListener("change", updateDeviceInfo);
    });

    return () => {
      Object.values(queries).forEach(mq => {
        mq.removeEventListener("change", updateDeviceInfo);
      });
    };
  }, []);
  return deviceInfo;
}
