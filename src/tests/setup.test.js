import 'jest-chain';
import 'jest-extended';

import utils from './utils';

beforeAll(async () => {
  await utils.models.sequelize.sync({ force: true, match: /test$/ });
  await utils.seed.userDAO.save();
  await utils.seed.entityDAO.save();
});

afterAll(async () => {
  await utils.models.sequelize.close();
});
