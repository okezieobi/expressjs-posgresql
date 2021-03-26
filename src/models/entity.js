module.exports = (sequelize, SequelizeDatatype) => {
  const table = (DataTypes) => ({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },
  });

  const model = sequelize.define('Entity', table(SequelizeDatatype));

  return { model, table };
};
