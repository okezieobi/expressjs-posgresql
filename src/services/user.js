export default class UserServices {
  constructor({ User, sequelize, Sequelize }) {
    this.model = User;
    this.sequelize = sequelize;
    this.Sequelize = Sequelize;
  }

  async create(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.model.findOne({
        where: {
          [this.Sequelize.Op.or]: [
            { email: arg.email }, { username: arg.username },
          ],
        },
        transaction: t,
      });
      if (userExists) data = { message: 'User already exists with either email or username, please sign in', status: 406 };
      else {
        await this.model.create(arg, { transaction: t });
        const user = await this.model.findOne({
          where: {
            [this.Sequelize.Op.and]: [
              { email: arg.email }, { username: arg.username },
            ],
          },
          transaction: t,
          attributes: {
            exclude: ['password', 'updatedAt'],
          },
        });
        data = { user, status: 201 };
      }
      return data;
    });
  }

  async auth(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.model.findOne({
        where: {
          [this.Sequelize.Op.or]: [
            { email: arg.user }, { username: arg.user },
          ],
        },
        transaction: t,
      });
      if (userExists) {
        const verifyPassword = await this.model.compareString(userExists.password, arg.password);
        if (verifyPassword) {
          const user = await this.model.findOne({
            where: {
              [this.Sequelize.Op.or]: [
                { email: arg.user }, { username: arg.user },
              ],
            },
            transaction: t,
            attributes: {
              exclude: ['password'],
            },
          });
          data = { user, status: 200 };
        } else data = { message: 'Password provided does not match user', status: 401 };
      } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
      return data;
    });
  }

  async authJWT(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const user = await this.model.findByPk(arg, {
        transaction: t,
        attributes: {
          exclude: ['password'],
        },
      });
      if (user) data = { user, status: 200 };
      else data = { message: 'User not found, please sign up by creating an account', status: 401 };
      return data;
    });
  }
}
