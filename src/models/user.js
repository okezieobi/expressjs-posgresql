import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model {
  static async compareString(hashedPassword = '', password = '') {
    return bcrypt.compare(password, hashedPassword);
  }

  static tableColumns(DataTypes) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(256),
        allowNull: false,
        notEmpty: true,
      },
      username: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        notEmpty: true,
      },
      email: {
        type: DataTypes.STRING(256),
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
          const salt = bcrypt.genSaltSync();
          this.setDataValue('password', bcrypt.hashSync(value, salt));
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
