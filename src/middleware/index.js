import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import EntryMiddleware from './entry';

const user = new UserMiddleware(validations, controllers);
const entry = new EntryMiddleware(validations, controllers);

export default {
  user, entry,
};
