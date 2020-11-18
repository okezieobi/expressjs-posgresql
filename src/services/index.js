import models from '../models';
import UserServices from './user';
import EntryServices from './entry';

const user = new UserServices(models);
const entry = new EntryServices(models);

export default {
  user, entry,
};
