import services from '../services';
import UserController from './user';
import EntryController from './entry';

const user = new UserController(services);
const entry = new EntryController(services);

export default {
  user, entry,
};
