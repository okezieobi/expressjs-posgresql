export default class EntityController {
  constructor({ entity }, handleServiceOutput) {
    this.service = entity;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  createOne({ body: { title, body } }, res, next) {
    this.service.create({ title, body, UserId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findAll(req, res, next) {
    this.service.findByOwner(res.locals.userId)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  findOneById({ params: { id } }, res, next) {
    this.service.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  updateOne({ body: { title, body } }, res, next) {
    this.service.updateOne({
      title: title || res.locals.data.entity.title,
      body: body || res.locals.data.entity.body,
      UserId: res.locals.userId,
      id: res.locals.data.entity.id,
    }).then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}
