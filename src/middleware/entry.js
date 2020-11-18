export default class EntryMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.entry.create, controllers.entry.createOne];
    this.getAll = controllers.entry.findAll;
    this.verifyOne = [...validations.entry.id, controllers.entry.findOneById];
    this.updateOne = controllers.entry.updateOne;
  }
}
