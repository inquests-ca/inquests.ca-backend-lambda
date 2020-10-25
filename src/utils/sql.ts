// Replace all non-word characters with a space.
export const escapeRegex = (term: string): string => term.replace(/[^A-Za-z0-9]/g, ' ').trim();
