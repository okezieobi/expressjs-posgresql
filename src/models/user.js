import bcrypt from '../utils/bcrypt';

module.exports = (sequelize, SequelizeDatatype) => {
  const table = (DataTypes) => ({
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
  });

  const model = sequelize.define('User', table(SequelizeDatatype));

  model.associate = ({ Entity }) => {
    model.hasManyEntries = model.hasMany(Entity, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };

  model.comparePassword = (hashedPassword = '', password = '') => bcrypt.compareString(hashedPassword, password);

  return { model, table };
};
