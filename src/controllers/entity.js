export default class EntityController {
  constructor({ entity }, handleServices) {
    this.service = entity;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.handleServices = handleServices;
  }

  createOne({ body: { title, body } }, res, next) {
    return this.handleServices(this.service, 'create', { title, body, UserId: res.locals.user.id }, res, next);
  }

  findAll(req, res, next) {
    return this.handleServices(this.service, 'findByOwner', res.locals.user.id, res, next);
  }

  findOneById({ params: { id } }, res, next) {
    return this.handleServices(this.service, 'findOneByOwner', { UserId: res.locals.user.id, id }, res, next);
  }

  updateOne({ body: { title, body } }, res, next) {
    const input = {
      title: title || res.locals.data.entry.title,
      body: body || res.locals.data.entry.body,
      UserId: res.locals.user.id,
      id: res.locals.data.entry.id,
    };
    return this.handleServices(this.service, 'updateOne', input, res, next);
  }
}
