import express from 'express';
import joi from 'joi';
import createError from 'http-errors';
import { getCustomRepository } from 'typeorm';

import { InquestRepository } from '../dao/inquest';
import { inquestQuerySchema } from '../utils/query';

const router = express.Router();

/**
 * Get inquest by ID.
 */

router.get('/:inquestId(\\d+)', async (req, res, next) => {
  const inquestIdValidation = joi.number().integer().positive().required();
  const query = inquestIdValidation.validate(req.params.inquestId);
  if (query.error) {
    next(createError(400));
    return;
  }

  const inquest = await getCustomRepository(InquestRepository).getInquestFromId(query.value);
  if (!inquest) {
    next(createError(404, 'Inquest not found'));
    return;
  }
  res.json(inquest);
});

/**
 * Get inquests with optional search parameters and pagination.
 */

router.get('/', async (req, res, next) => {
  const query = inquestQuerySchema.validate(req.query);
  if (query.error) {
    next(createError(400));
    return;
  }

  const [data, count] = await getCustomRepository(InquestRepository).getInquests(query.value);
  res.json({ data, count });
});

export default router;
