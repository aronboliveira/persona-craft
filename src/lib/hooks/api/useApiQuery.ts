import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";

/**
 * Generic API response type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Generic API error type
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Fetch config type for the API
 */
export interface FetchConfig extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Query key factory for consistent cache key generation
 */
export const queryKeys = {
  // Form data queries
  forms: {
    all: ["forms"] as const,
    detail: (id: string) => ["forms", id] as const,
    options: (formType: string) => ["forms", "options", formType] as const,
  },
  // Prompt queries
  prompts: {
    all: ["prompts"] as const,
    detail: (id: string) => ["prompts", id] as const,
    generated: (params: Record<string, unknown>) =>
      ["prompts", "generated", params] as const,
  },
  // User/settings queries
  settings: {
    all: ["settings"] as const,
    user: (userId: string) => ["settings", "user", userId] as const,
  },
} as const;

/**
 * Base fetch function using native fetch API
 */
async function apiFetch<T>(url: string, config?: FetchConfig): Promise<T> {
  try {
    const { body, ...restConfig } = config || {};
    const response = await fetch(url, {
      ...restConfig,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...restConfig.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
        code: response.statusText,
      } as ApiError;
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error && typeof error === "object" && "status" in error) {
      throw error; // Already formatted ApiError
    }
    throw {
      message: error instanceof Error ? error.message : "Network error",
      code: "NETWORK_ERROR",
    } as ApiError;
  }
}

/**
 * Custom hook for GET requests with caching
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useApiQuery(
 *   queryKeys.forms.options('gender'),
 *   '/api/forms/gender/options'
 * );
 * ```
 */
export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: QueryKey,
  url: string,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  > & {
    fetchConfig?: FetchConfig;
  },
) {
  const { fetchConfig, ...queryOptions } = options || {};

  return useQuery<TData, TError, TData, QueryKey>({
    queryKey,
    queryFn: () => apiFetch<TData>(url, { method: "GET", ...fetchConfig }),
    ...queryOptions,
  });
}

/**
 * Custom hook for POST/PUT/DELETE mutations
 *
 * @example
 * ```tsx
 * const mutation = useApiMutation<ResponseType, RequestType>(
 *   '/api/prompts',
 *   { method: 'POST' }
 * );
 *
 * mutation.mutate({ promptData: '...' });
 * ```
 */
export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError,
>(
  url: string,
  fetchConfig?: Omit<FetchConfig, "body">,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) =>
      apiFetch<TData>(url, {
        method: "POST",
        ...fetchConfig,
        body: variables,
      }),
    ...options,
  });
}

/**
 * Hook to get query client for manual cache operations
 *
 * @example
 * ```tsx
 * const { invalidateFormOptions, prefetchFormOptions } = useQueryHelpers();
 *
 * // Invalidate cache after mutation
 * await mutation.mutateAsync(data);
 * invalidateFormOptions('gender');
 * ```
 */
export function useQueryHelpers() {
  const queryClient = useQueryClient();

  return {
    /**
     * Invalidate all form options cache
     */
    invalidateAllForms: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.forms.all }),

    /**
     * Invalidate specific form options cache
     */
    invalidateFormOptions: (formType: string) =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.forms.options(formType),
      }),

    /**
     * Prefetch form options for smoother UX
     */
    prefetchFormOptions: <T>(formType: string, url: string) =>
      queryClient.prefetchQuery({
        queryKey: queryKeys.forms.options(formType),
        queryFn: () => apiFetch<T>(url),
      }),

    /**
     * Set query data directly (useful for optimistic updates)
     */
    setQueryData: <T>(queryKey: QueryKey, data: T) =>
      queryClient.setQueryData(queryKey, data),

    /**
     * Get cached query data
     */
    getQueryData: <T>(queryKey: QueryKey) =>
      queryClient.getQueryData<T>(queryKey),

    /**
     * Clear all cache
     */
    clearCache: () => queryClient.clear(),

    /**
     * Get the raw query client for advanced usage
     */
    queryClient,
  };
}

export default useApiQuery;
