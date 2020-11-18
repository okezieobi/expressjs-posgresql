export default class EntrySchema {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      title: {
        in: ['body'],
        isLength: {
          errorMessage: 'Entry title should be at most 256 characters long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Entry title must be string data type',
        },
        exists: {
          errorMessage: 'Entry title is required',
          options: { checkFalsy: true },
        },
      },
      body: {
        in: ['body'],
        isLength: {
          errorMessage: 'Entry body should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Entry body must be string data type',
        },
        exists: {
          errorMessage: 'Entry body is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateEntryId = checkSchema({
      id: {
        in: ['params'],
        isUUID: {
          errorMessage: 'Entry id does not match UUID format',
        },
      },
    });
  }
}
