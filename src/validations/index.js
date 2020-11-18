import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import EntrySchema from './entry';
import jwt from '../utils/jwt';

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const decodeJwt = async ({ headers }, res, next) => {
  await jwt.verify(headers)
    .then(({ id }) => {
      res.locals.userId = id;
      next();
    }).catch(next);
};

const userSchema = new UserSchema(checkSchema);
const entrySchema = new EntrySchema(checkSchema);

export default {
  user: {
    signup: [userSchema.validateSignup, handleValidationErr],
    login: [userSchema.validateLogin, handleValidationErr],
    jwt: [userSchema.validateJWT, handleValidationErr, decodeJwt],
  },
  entry: {
    create: [entrySchema.validateInput, handleValidationErr],
    id: [entrySchema.validateEntryId, handleValidationErr],
  },
};
