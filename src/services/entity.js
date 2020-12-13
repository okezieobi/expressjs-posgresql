export default class EntityServices {
  constructor({ entity, sequelize, Sequelize }) {
    this.model = entity;
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
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
      return { entities, status: 200 };
    });
  }

  async findOneByOwner({ UserId, id }) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const entity = await this.model.findOne({
        where: {
          [this.Sequelize.Op.and]: [
            { UserId }, { id },
          ],
        },
        transaction: t,
      });
      if (entity) data = { entity, status: 200 };
      else data = { message: 'Entity not found', status: 404 };
      return data;
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
      return { entity, status: 200 };
    });
  }
}
