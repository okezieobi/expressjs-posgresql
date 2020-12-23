import models from '../models';
import jwt from '../utils/jwt';

const user = {
  fullName: 'test-fullName', username: 'test-username', email: 'test@email.com', password: 'test-password',
};
const newUser = {
  fullName: 'test-fullName-new', username: 'test-username-new', email: 'test-new@email.com', password: 'test-password',
};
const userDAO = models.User.build(user);
const token = jwt.generate(userDAO);
const user404 = {
  fullName: 'test-fullName-fake', username: 'test-username-fake', email: 'test-fake@email.com', password: 'test-password',
};
const user404DAO = models.User.build(user404);
const token401 = jwt.generate(user404DAO);

const entity = { title: 'test-title', body: 'test-body', UserId: userDAO.id };
const entityDAO = models.Entity.build(entity);

export default {
  seed: { userDAO, entityDAO },
  token,
  user,
  entity,
  newUser,
  user404,
  user404DAO,
  token401,
  models,
};
