import express from 'express';

import { getAuthorityById, getAuthorities } from '../dao/authorities';
import { PAGINATION } from '../constants';

const router = express.Router();

// Get authority by ID
router.get('/:authorityId(\\d+)', async (req, res) => {
  const { authorityId } = req.params;
  const authority = await getAuthorityById(parseInt(authorityId));
  if (authority === undefined) res.status(404).send('Authority not found');
  else res.json(authority);
});

// Get all authorities, with optional search parameters and pagination
// e.g.: /authorities?q=People%20First&keywords=CRIMINAL_JUSTICE&limit=50&offset=100&jurisdiction=CAD_ON
router.get('/', async (req, res) => {
  const {
    // Search
    text,

    // Filtering
    keywords,
    jurisdiction,

    // Pagination
    offset,
    limit,

    // Ordering... TODO
  } = req.query;

  const textParsed = (text as string) || null;
  const keywordsParsed = keywords ? new Set<string>((keywords as string).split('__')) : null; // Convert to Set to prevent duplication.
  const jurisdictionParsed = (jurisdiction as string) || null;
  const limitParsed = parseInt(limit as string) >= 0 ? parseInt(limit as string) : PAGINATION;
  const offsetParsed = parseInt(offset as string) >= 0 ? parseInt(offset as string) : 0;
  const [data, count] = await getAuthorities(
    textParsed,
    keywordsParsed,
    jurisdictionParsed,
    limitParsed,
    offsetParsed
  );
  res.json({ data, count });
});

export default router;
