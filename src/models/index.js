import { Sequelize, DataTypes } from 'sequelize';

import UserModel from './user';
import EntryModel from './entry';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

const models = { user: UserModel, entry: EntryModel };

Object.values(models).forEach((model) => model.init(sequelize, DataTypes));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  await sequelize.authenticate();
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ force: true, match: /dev$/ });
  }// no sequelize.sync(); use umzug migrations after writing models
})();

const modelTimestamps = (SequelizeDataTypes) => ({
  createdAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
  updatedAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
});

export default {
  ...models,
  sequelize,
  modelTimestamps,
};
