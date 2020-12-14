export default class EntityController {
  constructor(services) {
    this.services = services.entity;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
  }

  createOne({ body: { title, body } }, res, next) {
    this.services.create({ title, body, UserId: res.locals.userId })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  findAll(req, res, next) {
    this.services.findByOwner(res.locals.userId)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.services.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  updateOne({ body: { title, body } }, res, next) {
    this.services.updateOne({
      title: title || res.locals.data.entity.title,
      body: body || res.locals.data.entity.body,
      UserId: res.locals.userId,
      id: res.locals.data.entity.id,
    }).then((data) => {
      if (data.message) throw data;
      else {
        res.locals.data = data;
        next();
      }
    }).catch(next);
  }
}
