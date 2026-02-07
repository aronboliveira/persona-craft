import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../../redux/mainStore";
import {
  setOrder,
  MAX_FORM_ORDER,
} from "../../../redux/mainStore/slices/formStrategySlice";
import { FormState } from "../../declarations/types/redux";

export const FORM_ORDER_PARAM = "fo";

/**
 * Custom hook that syncs form state with URL query parameters.
 * Prioritizes storage/cache strategies (Redux + sessionStorage) and updates URL retroactively.
 *
 * Flow:
 * 1. On mount: Check URL params, but only use them if no cached state exists
 * 2. On state change: Update URL to reflect current form order
 * 3. Storage/cache always takes precedence over URL params
 */
export function useUrlFormSync(): {
  syncToUrl: () => void;
  getFormOrderFromUrl: () => number | null;
} {
  const dispatch = useDispatch<AppDispatch>();
  const stateOrder = useSelector(
    (s: RootState) => (s.formStrategy as unknown as FormState).order,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitialMount = useRef(true);
  const previousOrder = useRef<number | null>(null);

  /**
   * Get form order from URL if it exists and is valid
   */
  const getFormOrderFromUrl = useCallback((): number | null => {
    const urlOrder = searchParams.get(FORM_ORDER_PARAM);
    if (urlOrder !== null) {
      const parsed = parseInt(urlOrder, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        return Math.min(parsed, MAX_FORM_ORDER);
      }
    }
    return null;
  }, [searchParams]);

  /**
   * Sync current Redux state to URL params
   */
  const syncToUrl = useCallback((): void => {
    const currentUrlOrder = searchParams.get(FORM_ORDER_PARAM);
    const newOrder = stateOrder.toString();

    // Only update if different to avoid unnecessary history entries
    if (currentUrlOrder !== newOrder) {
      setSearchParams(
        prev => {
          const newParams = new URLSearchParams(prev);
          newParams.set(FORM_ORDER_PARAM, newOrder);
          return newParams;
        },
        { replace: true }, // Replace instead of push to avoid cluttering history
      );
    }
  }, [stateOrder, searchParams, setSearchParams]);

  // Initial mount: Check if URL has a form order and no cached state
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // Only use URL order if Redux state is at default (0) and URL has a value
      // This means storage/cache didn't have data to restore
      const rawParam = searchParams.get(FORM_ORDER_PARAM);
      const rawParsed = rawParam !== null ? parseInt(rawParam, 10) : NaN;
      const wasClamped = !isNaN(rawParsed) && rawParsed > MAX_FORM_ORDER;
      const urlOrder = getFormOrderFromUrl();
      if (urlOrder !== null && stateOrder === 0 && urlOrder !== 0) {
        // URL has a different order and we're at default - apply URL state
        dispatch(setOrder(urlOrder));
        if (wasClamped)
          toast(
            `Form order capped at ${MAX_FORM_ORDER}. There are only ${MAX_FORM_ORDER} forms.`,
            { icon: "⚠️", duration: 4000, position: "top-center" },
          );
      } else if (urlOrder !== null && urlOrder !== stateOrder) {
        // Storage/cache overrode URL params - notify user and sync URL
        syncToUrl();
        toast(
          `Form restored from saved progress (form #${stateOrder}). Your URL parameter was overridden.`,
          {
            icon: "ℹ️",
            duration: 4000,
            position: "top-center",
          },
        );
      } else {
        // URL matches current state or no URL param - just sync
        syncToUrl();
      }
    }
  }, [dispatch, getFormOrderFromUrl, stateOrder, syncToUrl]);

  // On state changes: Update URL retroactively
  useEffect(() => {
    // Skip if this is initial mount (handled above)
    if (previousOrder.current === null) {
      previousOrder.current = stateOrder;
      return;
    }

    // Only sync if order actually changed
    if (previousOrder.current !== stateOrder) {
      previousOrder.current = stateOrder;
      syncToUrl();
    }
  }, [stateOrder, syncToUrl]);

  return { syncToUrl, getFormOrderFromUrl };
}

export default useUrlFormSync;
