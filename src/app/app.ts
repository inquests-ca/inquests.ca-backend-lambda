import { getInquestById, getInquests } from '../db/inquests';
import { getAuthorityById, getAuthorities } from '../db/authorities';
import { getInquestKeywords, getAuthorityKeywords } from '../db/keywords';
import * as express from 'express';

const app = express();

const PAGINATION = 50;

// Middleware
app.use((req, res, next) => {
  // TODO: remove this log statement to prevent logging sensitive data.
  if (process.env.DEBUG)
    console.log('Received request with body: ', JSON.stringify(req.body, null, 2));
  const origin = process.env.ENV === 'dev' ? 'http://localhost:3000' : 'http://inquests.ca';
  res.set('Access-Control-Allow-Origin', origin);

  next();
});

// TODO: move routes to separate files.

// Get authority by ID
app.get('/authorities/:authorityId(\\d+)', async (req, res) => {
  const { authorityId } = req.params;
  const authority = await getAuthorityById(authorityId);
  if (authority === undefined) res.status(404).send('Authority not found');
  else res.json(authority);
});

// Get all authorities, with optional search parameters and pagination
// e.g.: /authorities?q=People%20First&keywords=CRIMINAL_JUSTICE&limit=50&offset=100&jurisdiction=CAD_ON
app.get('/authorities', async (req, res) => {
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

  const textParsed = text || null;
  const keywordsParsed = keywords ? new Set<string>(keywords.split('__')) : null; // Convert to Set to prevent duplication.
  const jurisdictionParsed = jurisdiction || null;
  const limitParsed = parseInt(limit) >= 0 ? parseInt(limit) : PAGINATION;
  const offsetParsed = parseInt(offset) >= 0 ? parseInt(offset) : 0;
  const [data, count] = await getAuthorities(
    textParsed,
    keywordsParsed,
    jurisdictionParsed,
    limitParsed,
    offsetParsed
  );
  res.json({ data, count });
});

// Get inquest by ID
app.get('/inquests/:inquestId(\\d+)', async (req, res) => {
  const { inquestId } = req.params;
  const inquest = await getInquestById(inquestId);
  if (inquest === undefined) res.status(404).send('Inquest not found');
  else res.json(inquest);
});

// Get all inquests, with optional search parameters and pagination
// e.g.: /inquests?q=Smith&keywords=CAUSE_CRUSH&limit=50&offset=100&jurisdiction=CAD_ON
app.get('/inquests', async (req, res) => {
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

  const textParsed = text || null;
  const keywordsParsed = keywords ? new Set<string>(keywords.split('__')) : null;
  const jurisdictionParsed = jurisdiction || null;
  const limitParsed = parseInt(limit) >= 0 ? parseInt(limit) : PAGINATION;
  const offsetParsed = parseInt(offset) >= 0 ? parseInt(offset) : 0;
  const [data, count] = await getInquests(
    textParsed,
    keywordsParsed,
    jurisdictionParsed,
    limitParsed,
    offsetParsed
  );
  res.json({ data, count });
});

// Get all inquest keywords
app.get('/inquestKeywords', async (_req, res) => {
  const inquestKeywords = await getInquestKeywords();
  res.json(inquestKeywords);
});

// Get all authority keywords
app.get('/authorityKeywords', async (_req, res) => {
  const authorityKeywords = await getAuthorityKeywords();
  res.json(authorityKeywords);
});

export default app;
