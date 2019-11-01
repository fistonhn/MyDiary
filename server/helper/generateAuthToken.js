import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  const token = jwt.sign({ Id: id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });

  return token;
};

const verifyAuthToken = (token) => {
  const myAuthToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  return myAuthToken.Id;
};

export { generateToken, verifyAuthToken };
