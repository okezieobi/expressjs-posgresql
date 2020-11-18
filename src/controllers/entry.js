export default class EntryController {
  constructor(services) {
    this.services = services.entry;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
  }

  async createOne({ body: { title, body } }, res, next) {
    await this.services.create({ title, body, id: res.locals.userId })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async findAll(req, res, next) {
    await this.services.findByOwner(res.locals.userId)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  async findOneById({ params: { id } }, res, next) {
    await this.services.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async updateOne({ body: { title, body } }, res, next) {
    await this.services.updateOne({
      title: title || res.locals.data.entry.title,
      body: body || res.locals.data.entry.body,
      UserId: res.locals.userId,
      id: res.locals.data.entry.id,
    }).then((data) => {
      if (data.message) throw data;
      else {
        res.locals.data = data;
        next();
      }
    }).catch(next);
  }
}
