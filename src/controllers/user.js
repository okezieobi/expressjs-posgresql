export default class UserController {
  constructor({ user }, jwt) {
    this.services = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.setJWT = this.setJWT.bind(this);
    this.verifyJWT = this.verifyJWT.bind(this);
    this.jwt = jwt;
  }

  async signup({ body }, res, next) {
    await this.services.create(body)
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async login({ body }, res, next) {
    await this.services.auth({ user: body.user, password: body.password })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async findById(req, res, next) {
    await this.services.authJWT(res.locals.userId).then((data) => {
      if (data.message) throw data;
      else next();
    }).catch(next);
  }

  async setJWT(req, res, next) {
    const token = await this.jwt.generate(res.locals.data.user);
    res.cookie('token', token, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true });
    next();
  }

  async verifyJWT({ cookies }, res, next) {
    await this.jwt.verify(cookies)
      .then(({ id }) => {
        res.locals.userId = id;
        next();
      }).catch(next);
  }
}
