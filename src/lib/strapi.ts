/**
 * Strapi REST helper (hardened)
 *
 * - Fallback base URL if STRAPI_URL is unset (http://localhost:1337)
 * - Robust error handling with status + response body
 * - Optional Bearer token from STRAPI_TOKEN (can be disabled or overridden via headers)
 * - Flexible unwrap options for data/meta
 * - Backward compatible with wrappedByKey / wrappedByList
 */

export interface StrapiEnvelope<TData = unknown, TMeta = unknown> {
  data: TData;
  meta?: TMeta;
  error?: unknown;
}

interface Props {
  endpoint: string;
  query?: Record<string, string | number | boolean>;
  wrappedByKey?: string;
  wrappedByList?: boolean;

  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  baseUrl?: string;

  // If true, return the raw { data, meta } envelope (no unwrapping)
  includeMeta?: boolean;

  // If true, return only payload.data
  unwrapData?: boolean;

  // If true and result is an array, return first element (applies after unwrapData)
  unwrapFirst?: boolean;

  // If true (default) and STRAPI_TOKEN exists, use Authorization: Bearer <token> unless headers.Authorization is provided
  useToken?: boolean;
}

/**
 * Example usage:
 * - List with populate:
 *   await fetchApi<any>({
 *     endpoint: "posts",
 *     query: { "populate": "header", "sort": "publishedAt:desc" },
 *     unwrapData: true
 *   })
 *
 * - Get by slug:
 *   await fetchApi<any>({
 *     endpoint: "posts",
 *     query: { "populate": "header", "filters[slug][$eq]": slug },
 *     unwrapData: true,
 *     unwrapFirst: true
 *   })
 */
export default async function fetchApi<T = unknown, TMeta = unknown>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  method = "GET",
  body,
  headers = {},
  baseUrl,
  includeMeta = false,
  unwrapData = false,
  unwrapFirst = false,
  useToken = true,
}: Props): Promise<T | StrapiEnvelope<T, TMeta>> {
  // Build base URL with fallback
  const base =
    (baseUrl as string) ||
    import.meta.env.STRAPI_URL ||
    "http://localhost:1337";

  // Normalize slashes
  const sanitizedBase = String(base).replace(/\/+$/, "");
  const sanitizedEndpoint = String(endpoint).replace(/^\/+/, "");

  const url = new URL(`${sanitizedBase}/api/${sanitizedEndpoint}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.append(String(key), String(value));
    }
  }

  const finalHeaders: Record<string, string> = {
    ...(body && method !== "GET" ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  // Add default Authorization from STRAPI_TOKEN if requested and not overridden
  if (useToken && !finalHeaders.Authorization && import.meta.env.STRAPI_TOKEN) {
    finalHeaders.Authorization = `Bearer ${import.meta.env.STRAPI_TOKEN}`;
  }

  const init: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body && method !== "GET") {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(url.toString(), init);

  if (!res.ok) {
    let errorDetail: unknown;
    try {
      errorDetail = await res.json();
    } catch {
      try {
        errorDetail = await res.text();
      } catch {
        errorDetail = null;
      }
    }
    const error = new Error(
      `Strapi request failed: ${res.status} ${
        res.statusText
      } ${url.toString()} | ` +
        (typeof errorDetail === "string"
          ? errorDetail
          : JSON.stringify(errorDetail))
    );
    (error as any).status = res.status;
    (error as any).details = errorDetail;
    throw error;
  }

  let payload: any = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  // Backward compatibility
  if (wrappedByKey) {
    payload = payload?.[wrappedByKey];
  }
  if (wrappedByList) {
    payload = Array.isArray(payload) ? payload[0] : payload?.data?.[0];
  }

  // If includeMeta is true, return envelope as-is
  if (includeMeta) {
    return payload as StrapiEnvelope<T, TMeta>;
  }

  // Unwrap strategies
  if (
    unwrapData &&
    payload &&
    typeof payload === "object" &&
    "data" in payload
  ) {
    payload = payload.data;
    if (unwrapFirst && Array.isArray(payload)) {
      payload = payload[0];
    }
  } else if (unwrapFirst && Array.isArray(payload)) {
    payload = payload[0];
  }

  return payload as T;
}

export type { Props as FetchApiOptions };
