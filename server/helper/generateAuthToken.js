import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id, email) => {
  const token = jwt.sign(
    { id, email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: '1d' },
  );

  return token;
};


export { generateToken };
