export default class EntityServices {
  constructor({ Entity, sequelize, Sequelize }, CustomErr) {
    this.model = Entity;
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
    this.CustomErr = CustomErr;
  }

  async create({ title, body, UserId }) {
    return this.sequelize.transaction(async (t) => {
      const entity = await this.model.create({
        title,
        body,
        UserId,
      }, {
        transaction: t,
      });
      return { entity, status: 201 };
    });
  }

  async findByOwner(UserId) {
    return this.sequelize.transaction(async (t) => {
      const entities = await this.model.findAll({
        where: {
          UserId,
        },
        transaction: t,
      });
      return { entities };
    });
  }

  async findOneByOwner({ UserId, id }) {
    return this.sequelize.transaction(async (t) => {
      const entity = await this.model.findOne({
        where: {
          [this.Sequelize.Op.and]: [
            { UserId }, { id },
          ],
        },
        transaction: t,
      });
      if (entity === null) throw new this.CustomErr(404, 'Entity not found');
      return { entity };
    });
  }

  async updateOne({
    title, body, UserId, id,
  }) {
    return this.sequelize.transaction(async (t) => {
      await this.model.update({ title, body }, {
        where: {
          [this.Sequelize.Op.and]: [
            { UserId }, { id },
          ],
        },
        transaction: t,
      });
      const entity = await this.model.findOne({
        where: {
          [this.Sequelize.Op.and]: [
            { UserId }, { id },
          ],
        },
        transaction: t,
      });
      return { entity };
    });
  }
}
