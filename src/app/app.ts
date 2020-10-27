import express from 'express';

import authoritiesRouter from '../routes/authorities';
import inquestsRouter from '../routes/inquests';
import keywordsRouter from '../routes/keywords';

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://inquests.ca'];
  const origin = Array.isArray(req.headers.origin) ? req.headers.origin[0] : req.headers.origin;
  if (origin && allowedOrigins.indexOf(origin) > -1) res.set('Access-Control-Allow-Origin', origin);
  next();
});

app.use('/authorities', authoritiesRouter);
app.use('/inquests', inquestsRouter);
app.use('/', keywordsRouter);

export default app;
