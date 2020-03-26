import { getInquestById, getInquests } from '../db/inquests';
import { getAuthorityById, getAuthorities } from '../db/authorities';
import { getInquestKeywords, getAuthorityKeywords } from '../db/keywords';
import { getJurisdictions } from '../db/jurisdictions';
import * as express from 'express';

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log('Received request with body: ', JSON.stringify(req.body, null, 2));
  res.set('Access-Control-Allow-Origin', 'http://staging.inquests.ca');
  next();
});

// TODO: move routes to separate files.

// Get authority by ID
app.get('/authority/:authorityId(\\d+)', async (req, res) => {
  const { authorityId } = req.params;
  const authority = await getAuthorityById(authorityId);
  if (authority === undefined) res.status(404).send('Authority not found');
  else res.json(authority);
});

// Get all authorities, with optional search parameters and pagination
// e.g.: /authorities?keyword[]=CRIMINAL_JUSTICE&limit=50&offset=100&jurisdiction=CAD_ON
app.get('/authorities', async (req, res) => {
  const {
    // Filtering
    keyword,
    jurisdiction,

    // Pagination
    offset,
    limit,

    // Ordering... TODO
  } = req.query;

  // TODO: create limit, offset default consts.
  const limitParsed = parseInt(limit) >= 0 ? parseInt(limit) : 50;
  const offsetParsed = parseInt(offset) >= 0 ? parseInt(offset) : 0;
  const authorities = await getAuthorities(keyword, jurisdiction, limitParsed, offsetParsed);
  res.json(authorities);
});

// Get inquest by ID
app.get('/inquest/:inquestId(\\d+)', async (req, res) => {
  const { inquestId } = req.params;
  const inquest = await getInquestById(inquestId);
  if (inquest === undefined) res.status(404).send('Inquest not found');
  else res.json(inquest);
});

// Get all inquests, with optional search parameters and pagination
// e.g.: /inquests?keyword[]=CAUSE_CRUSH&limit=50&offset=100&jurisdiction=CAD_ON
app.get('/inquests', async (req, res) => {
  const {
    // Filtering
    keyword,
    jurisdiction,

    // Pagination
    offset,
    limit,

    // Ordering... TODO
  } = req.query;

  // TODO: create limit, offset default consts.
  const limitParsed = parseInt(limit) >= 0 ? parseInt(limit) : 50;
  const offsetParsed = parseInt(offset) >= 0 ? parseInt(offset) : 0;
  const inquests = await getInquests(keyword, jurisdiction, limitParsed, offsetParsed);
  res.json(inquests);
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

// Get all jurisdictions
app.get('/jurisdictions', async (_req, res) => {
  const jurisdictions = await getJurisdictions();
  res.json(jurisdictions);
});

export default app;
