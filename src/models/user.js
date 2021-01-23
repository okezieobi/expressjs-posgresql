import { Model } from 'sequelize';

import bcrypt from '../utils/bcrypt';

export default class User extends Model {
  static async compareString(hashedPassword = '', password = '') {
    return bcrypt.compareString(hashedPassword, password);
  }

  static tableColumns(DataTypes) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        notEmpty: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        notEmpty: true,
        isEmail: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
        set(value) {
          this.setDataValue('password', bcrypt.hashString(value));
        },
      },
      type: {
        type: DataTypes.TEXT,
        defaultValue: 'Client',
        isIn: [['Client', 'Admin']],
      },
    };
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        ...this.tableColumns(DataTypes),
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}
