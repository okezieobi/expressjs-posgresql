/* eslint-disable global-require */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

import env from '../utils/env';

const basename = path.basename(__filename);
const sequelize = new Sequelize(env.databaseURL || '', { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

// Run `.associate` if it exists,
// ie create relationships in the ORM

const db = {
  tables: {},
};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    /* eslint-disable import/no-dynamic-require */
    const { model, table } = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
    db.tables[model.name] = table;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

if (process.env.NODE_ENV === 'development') {
  const verifyDB = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true, match: /dev$/ });
    // no sequelize.sync(); use migrations after writing db for production
  };
  verifyDB().catch((err) => console.error(err));
}

db.tables.modelTimestamps = (SequelizeDataTypes) => ({
  createdAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
  updatedAt: {
    type: SequelizeDataTypes.DATE,
    defaultValue: SequelizeDataTypes.NOW,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
