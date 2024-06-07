import { unstable_cache as nextCache } from "next/cache"
import { cache as reactCache } from "react"

type Callback = (...args: any[]) => Promise<any>
/**
 * Caches the result of a callback function using Next.js and React cache.
 *
 * @param {T} cb - The callback function to cache.
 * @param {string[]} keyParts - The parts of the cache key.
 * @param {{ revalidate?: number | false; tags?: string[] }} [options={}] - The cache options.
 * @return {ReturnType<T>} The cached result.
 */
export function cache<T extends Callback>(
    cb: T,
    keyParts: string[],
    options: { revalidate?: number | false; tags?: string[] } = {}
) {
    return nextCache(reactCache(cb), keyParts, options)
}