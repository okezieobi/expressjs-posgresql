export default (Router, { handleResponse, middleware }) => {
  const router = Router();

  router.route('/')
    .post(middleware.entry.createOne, handleResponse)
    .get(middleware.entry.getAll, handleResponse);

  router.use('/:id', middleware.entry.verifyOne);
  router.route('/:id')
    .put(middleware.entry.updateOne, handleResponse)
    .get(handleResponse);

  return router;
};
