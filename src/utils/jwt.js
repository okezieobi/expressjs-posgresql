import jwt from 'jsonwebtoken';

import env from './env';

export default class JWT {
  static generate({ id }) {
    return jwt.sign({
      id,
    }, env.jwtSecret, {
      expiresIn: '1h',
    });
  }

  static async verify({ token }) {
    return jwt.verify(token, env.jwtSecret);
  }
}
