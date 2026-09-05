/* Minimal classnames joiner (dependency-free `cn`). */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}
