import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useMemo, JSX } from "react";

/**
 * Default React Query configuration optimized for the prompt creator app.
 * These settings balance UX with data freshness.
 */
const defaultQueryClientOptions = {
  queries: {
    // Data is considered fresh for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Cache data for 30 minutes even when unused
    gcTime: 30 * 60 * 1000,
    // Retry failed requests up to 3 times with exponential backoff
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
    // Don't refetch on window focus by default (can be overridden per-query)
    refetchOnWindowFocus: false,
    // Don't refetch on mount if data is fresh
    refetchOnMount: false,
    // Keep previous data while fetching new data
    placeholderData: "previousData" as const,
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
  },
};

/**
 * Creates a new QueryClient with app-specific defaults.
 * Exported for testing purposes.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
}

// Singleton client for production use
let queryClientInstance: QueryClient | null = null;

function getQueryClient(): QueryClient {
  if (!queryClientInstance) {
    queryClientInstance = createQueryClient();
  }
  return queryClientInstance;
}

/**
 * React Query provider wrapper for the application.
 * Provides caching, background refetching, and query state management.
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: PropsWithChildren): JSX.Element {
  // Use memo to avoid recreating client on re-renders
  // In production, uses singleton; allows fresh client in tests
  const queryClient = useMemo(() => getQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * Reset the query client singleton (useful for testing)
 */
export function resetQueryClient(): void {
  queryClientInstance?.clear();
  queryClientInstance = null;
}

export default QueryProvider;
