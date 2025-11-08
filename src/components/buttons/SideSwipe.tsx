import {
  CSSProperties,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NHtEl } from "../../lib/declarations/types/foundations";
import { useMount } from "../../lib/hooks/mount/useMount";
import { useDeviceDetection } from "../../lib/hooks/etc/useDeviceDetection";
import useScreenCoords from "../../lib/hooks/etc/useScreenCoords";
import { RTouchEvent } from "../../lib/declarations/types/helpers";
import { ErrorBoundary } from "react-error-boundary";
import { createPortal } from "react-dom";
import {
  Alert,
  Box,
  IconButton,
  Slide,
  Snackbar,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  TipsLocalStorage,
  TipsSessionStorage,
} from "../../lib/declarations/interfaces/storages";
import { IMainFormCtx } from "../../lib/declarations/interfaces/contexts";
import MainFormCtx from "../../lib/states/contexts/MainFormCtx";
import { EnableableTip } from "../../lib/declarations/interfaces/utils";
export default function SideSwipe({
  enabled = true,
  tipLocalKeys = { swpTipLocalKey: "__tips_blocked" },
  tipSessionKeys = { swpTipSessionKey: "__tips_shown" },
}: EnableableTip) {
  let handleNext = null,
    handlePrevious = null;
  const ctx = useContext<IMainFormCtx>(MainFormCtx);
  if (ctx) {
    handleNext = ctx.handleNext;
    handlePrevious = ctx.handlePrevious;
  }
  const dataSwipeBind = "data-swipe-binded",
    prevSwipeRef = useRef<NHtEl>(null),
    nextSwipeRef = useRef<NHtEl>(null),
    tipRef = useRef<NHtEl>(null),
    blockRef = useRef<boolean>(false),
    portals = useMemo<{ [k: string]: NHtEl }>(() => {
      if (typeof window?.document === "undefined")
        return { prev: null, next: null, tip: null };
      prevSwipeRef.current ??= document.getElementById("swipePortalPrev");
      nextSwipeRef.current ??= document.getElementById("swipePortalNext");
      tipRef.current ??= document.getElementById("swipePortalTip");
      return {
        prev: prevSwipeRef.current,
        next: nextSwipeRef.current,
        tip: tipRef.current,
      };
    }, []),
    [tipOpen, setTipOpen] = useState<boolean>(true),
    [blocked, setBlocked] = useState<boolean>(false),
    { coords, isTracking, setIsTracking, setTouchCoords, activeSwipe } =
      useScreenCoords(),
    mounted = useMount(),
    deviceInfo = useDeviceDetection(),
    invokeNext = useCallback<() => void>((): void => {
      if (!enabled || typeof handleNext !== "function") return;
      handleNext();
      // TODO maybe more actions?
    }, [enabled, handleNext]),
    invokePrev = useCallback<() => void>((): void => {
      if (!enabled || typeof handlePrevious !== "function") return;
      handlePrevious();
      // TODO maybe more actions?
    }, [enabled, handlePrevious]),
    onTouchStart = useCallback<(e: RTouchEvent<NHtEl>) => void>(
      (e: RTouchEvent<NHtEl>) => {
        if (!enabled || !(deviceInfo.isMobile || deviceInfo.isTablet)) return;
        const t = e.touches[0];
        setTouchCoords({ x: t.clientX, y: t.clientY });
        setIsTracking(true);
        activeSwipe.current = true;
      },
      [
        enabled,
        activeSwipe,
        setTouchCoords,
        setIsTracking,
        deviceInfo.isMobile,
        deviceInfo.isTablet,
      ]
    ),
    onTouchMove = useCallback<(e: RTouchEvent<NHtEl>) => void>(
      (e: RTouchEvent<NHtEl>) => {
        if (
          !enabled ||
          !(deviceInfo.isMobile || deviceInfo.isTablet) ||
          !activeSwipe.current ||
          !isTracking
        )
          return;
        const t = e.touches[0],
          dx = t.clientX - coords.x,
          dy = t.clientY - coords.y;
        if (Math.abs(dx) > Math.abs(dy) * 1.2) return;
        const THRESH = 60;
        if (dx <= -THRESH) {
          activeSwipe.current = false;
          setIsTracking(false);
          invokeNext();
        } else if (dx >= THRESH) {
          activeSwipe.current = false;
          setIsTracking(false);
          invokePrev();
        }
      },
      [
        enabled,
        deviceInfo.isMobile,
        deviceInfo.isTablet,
        invokeNext,
        invokePrev,
        activeSwipe,
        coords.x,
        coords.y,
        isTracking,
        setIsTracking,
      ]
    ),
    onTouchEnd = useCallback<() => void>(() => {
      activeSwipe.current = false;
      setIsTracking(false);
      setTouchCoords({ x: 0, y: 0 });
    }, [activeSwipe, setIsTracking, setTouchCoords]),
    baseBtnSx = useMemo<
      Record<
        string,
        string | number | CSSProperties | Record<string, string | number>
      >
    >(
      () => ({
        position: "fixed" as const,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1300,
        width: 56,
        height: 56,
        borderRadius: "999px",
        bgcolor: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(108,242,255,.38)",
        backdropFilter: "saturate(140%) blur(6px)",
        boxShadow: "0 8px 24px rgba(0,0,0,.4)",
        color: "#6cf2ff",
        opacity: { xs: 0.4, md: 0.25 },
        transition: "opacity .18s ease, transform .12s ease",
        "&:hover, &:focus-visible": {
          opacity: 1,
          transform: "translateY(-50%) scale(1.02)",
        },
        "& .MuiSvgIcon-root": { fontSize: 28 },
      }),
      []
    ),
    leftBtn = useMemo<
      Record<
        string,
        string | number | CSSProperties | Record<string, string | number>
      >
    >(() => ({ ...baseBtnSx, left: 12 }), [baseBtnSx]),
    rightBtn = useMemo<
      Record<
        string,
        string | number | CSSProperties | Record<string, string | number>
      >
    >(() => ({ ...baseBtnSx, right: 12 }), [baseBtnSx]),
    leftButton: JSX.Element = (
      <Tooltip title="Prev (swipe right on mobile)" placement="right">
        <IconButton
          aria-label="Previous"
          size="large"
          sx={leftBtn}
          onClick={invokePrev}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip>
    ),
    rightButton: JSX.Element = (
      <Tooltip title="Next (swipe left on mobile)" placement="left">
        <IconButton
          aria-label="Next"
          size="large"
          sx={rightBtn}
          onClick={invokeNext}
        >
          <ChevronRightIcon />
        </IconButton>
      </Tooltip>
    ),
    block = (): void => {
      setBlocked(true);
      blockRef.current = true;
      try {
        const saved = localStorage.getItem(tipLocalKeys.swpTipLocalKey);
        if (!saved) throw new Error("No existing storage found");
        const parsed = JSON.parse(saved) as TipsLocalStorage;
        parsed.swpTipLocalKey = "1";
        localStorage.setItem(
          tipLocalKeys.swpTipLocalKey,
          JSON.stringify(parsed)
        );
      } catch (e) {
        console.error("Error updating localStorage item:", e);
      }
    },
    handleCloseTip = useCallback<(_?: any, reason?: string) => void>(
      (_?: any, reason?: string): void => {
        if (reason === "clickaway") return;
        setTipOpen(false);
      },
      []
    );
  useEffect(() => {
    if (
      !enabled ||
      !(deviceInfo.isMobile || deviceInfo.isTablet) ||
      typeof window === "undefined"
    )
      return;
    const eventRecord: Record<string, (...args: any[]) => any> = {
      touchstart: onTouchStart,
      touchmove: onTouchMove,
      touchend: onTouchEnd,
    };
    if (
      !["1", "true"].includes(document.body?.getAttribute(dataSwipeBind) || "")
    ) {
      for (const [ev, cb] of Object.entries(eventRecord))
        window.document?.documentElement?.addEventListener(
          ev,
          cb as EventListener,
          {
            passive: true,
          }
        );
      document.body?.setAttribute(dataSwipeBind, "1");
    }
    return () => {
      for (const [ev, cb] of Object.entries(eventRecord))
        window.document?.documentElement?.removeEventListener(
          ev,
          cb as EventListener
        );
    };
  }, [
    deviceInfo.isMobile,
    deviceInfo.isTablet,
    enabled,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
  ]);
  useEffect(() => {
    if (!enabled || !mounted || typeof window === "undefined") return;
    try {
      const saved = sessionStorage.getItem(tipSessionKeys.swpTipSessionKey);
      if (saved) {
        const parsed = JSON.parse(saved) as TipsSessionStorage;
        parsed.swpTipSessionKey === "1" && setBlocked(true);
        sessionStorage.setItem(
          tipSessionKeys.swpTipSessionKey,
          JSON.stringify(parsed)
        );
      }
    } catch (e) {
      console.error("Error parsing localStorage item:", e);
    }
  }, [tipSessionKeys, enabled, mounted]);
  useEffect(() => {
    if (!mounted) return;
    const rcd = [
      { ref: prevSwipeRef, idf: "swipePortalPrev" },
      { ref: nextSwipeRef, idf: "swipePortalNext" },
    ];
    for (const swp of rcd) {
      if (
        swp.ref.current instanceof HTMLElement &&
        getComputedStyle(swp.ref.current).display !== "none"
      )
        continue;
      swp.ref.current = document.getElementById(swp.idf);
      if (swp.ref.current) swp.ref.current.style.display = "inline-block";
    }
    return () => {
      for (const swp of rcd) {
        swp.ref.current ??= document.getElementById(swp.idf);
        if (swp.ref.current instanceof HTMLElement)
          swp.ref.current.style.display = "none";
      }
    };
  }, [mounted, prevSwipeRef, nextSwipeRef]);
  useEffect(() => {
    const rcd = [
      { ref: prevSwipeRef, idf: "swipePortalPrev" },
      { ref: nextSwipeRef, idf: "swipePortalNext" },
    ];
    for (const swp of rcd) {
      swp.ref.current ??= document.getElementById(swp.idf);
      if (
        !swp.ref.current ||
        getComputedStyle(swp.ref.current).display !== "none"
      )
        continue;
      swp.ref.current.style.display = "inline-block";
    }
  }, [mounted]);
  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      {typeof window === "undefined" || !mounted ? (
        <></>
      ) : (
        <>
          {blocked ? (
            <></>
          ) : (
            createPortal(
              <Snackbar
                open={tipOpen}
                onClose={handleCloseTip}
                autoHideDuration={3200}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                slots={{ transition: Slide }}
                slotProps={{ transition: { direction: "down" } }}
              >
                <Alert
                  elevation={6}
                  variant="filled"
                  severity="info"
                  action={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        aria-label="Don't show again"
                        onClick={block}
                        color="inherit"
                      >
                        ✕
                      </IconButton>
                    </Box>
                  }
                >
                  Tip: Click the side buttons — or swipe (left = Next, right =
                  Prev).
                </Alert>
              </Snackbar>,
              portals.tip || document.body
            )
          )}
          {createPortal(
            <ErrorBoundary
              fallbackRender={() => (
                <Box
                  sx={{
                    position: "fixed",
                    top: 8,
                    left: 8,
                    zIndex: 2000,
                    color: "error.main",
                  }}
                ></Box>
              )}
            >
              {leftButton}
            </ErrorBoundary>,
            portals.prev || document.body
          )}
          {createPortal(
            <ErrorBoundary
              fallbackRender={() => (
                <Box
                  sx={{
                    position: "fixed",
                    top: 8,
                    left: 8,
                    zIndex: 2000,
                    color: "error.main",
                  }}
                ></Box>
              )}
            >
              {rightButton}
            </ErrorBoundary>,
            portals.next || document.body
          )}
        </>
      )}
    </ErrorBoundary>
  );
}
