/** Tiny classname joiner. Deliberately not `clsx` — this is all it needs to do. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
