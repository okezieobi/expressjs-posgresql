import bcrypt from '../utils/bcrypt';
import jwt from '../utils/jwt';

const id = '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9';
const hashedPassword = bcrypt.hashString('password one');
const token = jwt.generate({ id });
const token401 = jwt.generate({ id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f6' });
const id404 = '18ae5a5b-4c5f-410e-aef1-c0c800cf47f9';

export default {
  user: {
    mock: {
      fullName: 'test-fullName-2',
      username: 'test-username-2',
      email: 'tester@email.com',
      password: 'test-password',
    },
    mock2: {
      id,
      token,
      fullName: 'Frank Okezie',
      username: 'Obiedere',
      email: 'okezie@email.com',
      password: 'password one',
      hashedPassword,
      token401,
    },
    mock3: {
      fullName: 'test-fullName-2',
      username: 'test-username-okezie',
      email: 'frank@email.com',
      password: 'test-password',
    },
  },
  entry: {
    mock: {
      id: '18ae5a5b-4c5f-410e-aef1-c0c800cf47f8',
      title: 'Test title',
      body: 'Test body',
      id404,
    },
    mock2: {
      title: '2nd test title',
      body: '2nd test body',
    },
  },
};
