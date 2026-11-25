import fs from "node:fs";
import path from "node:path";
// Vite's unused-import warning from Astro's own asset-utils barrel file is harmless.
import { imageMetadata } from "astro/assets/utils";

export interface ImageSize {
    width: number;
    height: number;
}

const cache = new Map<string, Promise<ImageSize | undefined>>();
const warnedPaths = new Set<string>();

function isInside(root: string, file: string): boolean {
    const relative = path.relative(root, file);
    return relative !== "" && relative !== ".." &&
        !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

export function getImageSize(src?: string | null): Promise<ImageSize | undefined> {
    const pathname = src?.split(/[?#]/, 1)[0] ?? "";
    let key = `invalid:${pathname}`;
    let location: { publicDir: string; filePath: string } | undefined;

    if (pathname.startsWith("/images/")) {
        try {
            const decoded = decodeURIComponent(pathname);
            key = `invalid:${path.posix.normalize(decoded)}`;
            if (!/[\\:\0]/.test(decoded)) {
                const publicDir = path.join(process.cwd(), "public");
                const filePath = path.join(publicDir, ...decoded.slice(1).split("/"));
                if (isInside(publicDir, filePath)) {
                    key = filePath;
                    location = { publicDir, filePath };
                }
            }
        } catch {
            // The path could not be decoded or resolved.
        }
    }

    if (!import.meta.env.DEV) {
        const cached = cache.get(key);
        if (cached) return cached;
    }

    const result = Promise.resolve().then(async () => {
        if (location) {
            try {
                // Also check the real paths so symlinks cannot escape public.
                const [publicDir, filePath] = await Promise.all([
                    fs.promises.realpath(location.publicDir),
                    fs.promises.realpath(location.filePath),
                ]);
                if (isInside(publicDir, filePath)) {
                    const buffer = await fs.promises.readFile(filePath);
                    const { width, height } = await imageMetadata(new Uint8Array(buffer), src ?? undefined);
                    return { width, height };
                }
            } catch {
                // Missing files and metadata errors are non-fatal.
            }
        }
        if (!warnedPaths.has(key)) {
            warnedPaths.add(key);
            console.warn(`[imageSize] Could not determine dimensions for ${pathname || "(empty path)"}`);
        }
        return undefined;
    });
    if (!import.meta.env.DEV) cache.set(key, result);
    return result;
}
