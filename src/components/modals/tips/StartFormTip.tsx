import { ActionDispatch, memo, useEffect, useRef, useState } from "react";
import { NHtEl } from "../../../lib/declarations/types/foundations";
import { createPortal } from "react-dom";
import { StartFormTipProps } from "../../../lib/declarations/interfaces/components";
import {
  Alert,
  Button,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { TipsAction } from "../../../lib/declarations/interfaces/redux";
import { useMount } from "../../../lib/hooks/mount/useMount";
import { TipsSessionStorage } from "../../../lib/declarations/interfaces/storages";
const StartFormTip = ({ state, dispatch }: StartFormTipProps) => {
  const toastRootRef = useRef<NHtEl>(null),
    idf = "tipsToastContainer",
    tipStorageKey = "__tips_blocked",
    tipSessionKey = "__tips_shown",
    [blocked, setBlocked] = useState<boolean>(),
    handleClose = (
      _?: React.SyntheticEvent | Event,
      reason: SnackbarCloseReason = "timeout",
    ) => {
      if (
        reason === "clickaway" ||
        !localStorage.getItem(tipStorageKey) ||
        !sessionStorage.getItem(tipSessionKey)
      )
        return;
      typeof dispatch === "function" &&
        dispatch.length &&
        (dispatch as ActionDispatch<[a: TipsAction]>)({
          type: "CLOSE_START_TIP",
        });
      const saved = sessionStorage.getItem(tipSessionKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as TipsSessionStorage;
          parsed.kbTipSessionKey = "1";
          sessionStorage.setItem(tipSessionKey, JSON.stringify(parsed));
        } catch (e) {
          console.error("Error parsing sessionStorage item:", e);
        }
        setBlocked(true);
      }
    },
    block = (): void => {
      handleClose();
      try {
        const saved = localStorage.getItem(tipStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, string>;
          parsed.kbTipLocalKey = "1";
          localStorage.setItem(tipStorageKey, JSON.stringify(parsed));
        } else {
          const toSave: Record<string, string> = {
            kbTipLocalKey: "1",
          };
          localStorage.setItem(tipStorageKey, JSON.stringify(toSave));
        }
      } catch (e) {
        console.error("Error setting localStorage item:", e);
      }
      setBlocked(true);
    },
    mounted = useMount();
  useEffect(() => {
    if (!mounted) return;
    if (
      toastRootRef.current instanceof HTMLElement &&
      getComputedStyle(toastRootRef.current).display !== "none"
    )
      return;
    toastRootRef.current = document.getElementById(idf);
    if (toastRootRef.current)
      toastRootRef.current.style.display = "inline-block";
    return () => {
      toastRootRef.current ??= document.getElementById(idf);
      if (toastRootRef.current instanceof HTMLElement)
        toastRootRef.current.style.display = "none";
    };
  }, [mounted, toastRootRef]);
  useEffect(() => {
    toastRootRef.current ??= document.getElementById(idf);
    if (
      !toastRootRef.current ||
      getComputedStyle(toastRootRef.current).display !== "none"
    )
      return;
    toastRootRef.current.style.display = "inline-block";
  }, [mounted]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(tipStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, string>;
        if (parsed.kbTipLocalKey === "1") setBlocked(true);
      }
    } catch (e) {
      console.error("Error parsing localStorage item:", e);
    }
  }, []);
  return createPortal(
    !state?.startFormTip ||
      typeof window === "undefined" ||
      !mounted ||
      !document.body ||
      blocked ? (
      <></>
    ) : (
      <Snackbar
        open={state.startFormTip}
        onClose={handleClose}
        autoHideDuration={2600}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        slots={{ transition: Slide }}
        slotProps={{ transition: { direction: "down" } }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="info"
          sx={{
            transformOrigin: "top center",
            animation:
              "kb-toast-pop .18s ease-out, kb-toast-bye .22s ease-in 2.2s forwards",
            "@keyframes kb-toast-pop": {
              from: { transform: "translateY(-8px) scale(.96)", opacity: 0 },
              to: { transform: "translateY(0) scale(1)", opacity: 1 },
            },
            "@keyframes kb-toast-bye": {
              to: { transform: "translateY(-12px) scale(.94)", opacity: 0 },
            },
          }}
          action={
            <Button size="small" color="secondary" onClick={block}>
              Don’t show again
            </Button>
          }
        >
          Tip: press 1–9 to quickly pick a style.
        </Alert>
      </Snackbar>
    ),
    document.getElementById(idf) || document.body,
  );
};
export default memo(StartFormTip);
