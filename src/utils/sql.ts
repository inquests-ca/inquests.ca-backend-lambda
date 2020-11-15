/**
 * Escapes string for MySQL regex by replacing all non-word characters with a space.
 */
// TODO: Escape characters properly rather than simply removing them.
export const escapeRegex = (term: string): string => term.replace(/[^A-Za-z0-9]/g, ' ').trim();

/**
 * Get MySQL CONCAT_WS expression for the given columns and delimiter.
 */
export const getConcatExpression = (columns: string[], delimiter = ' '): string =>
  `CONCAT_WS('${delimiter}', ${columns.join(', ')})`;
