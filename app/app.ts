import { getInquestById, getInquests } from '../db/inquests';

const express = require('express');
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log('Received request with body: ', JSON.stringify(req.body, null, 2));
    res.set('Access-Control-Allow-Origin', 'http://staging.inquests.ca');
    next();
})

// Get inquest by ID
app.get('/inquest/:inquestId(\\d+)', async (req, res) => {
    const { inquestId } = req.params;
    const inquest = await getInquestById(inquestId);
    if (inquest === undefined) res.status(404).send("Inquest not found");
    else res.json(inquest);
})

// Get all inquests, with optional search parameters and pagination
// e.g.: /inquests?keyword[]=1&limit=50&offset=100
app.get('/inquests', async (req, res) => {
    const { 
        // Filtering
        keyword,

        // Pagination
        offset,
        limit,

        // Ordering... TODO
    } = req.query;

    // TODO: create limit, offset default consts.
    const limitParsed = parseInt(limit) >= 0 ? parseInt(limit) : 50;
    const offsetParsed = parseInt(offset) >= 0 ? parseInt(offset) : 0;
    const inquests = await getInquests(keyword, limitParsed, offsetParsed);
    res.json(inquests);
})

export default app;
