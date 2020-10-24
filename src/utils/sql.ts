// Replace all non-word characters with space.
export const escapeRegex = (term: string): string => term.replace(/[^\w]/g, ' ').trim();
