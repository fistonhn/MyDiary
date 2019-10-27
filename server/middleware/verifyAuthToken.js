import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(401).json({ err: 'Unauthorised - Header Not Set' });
    return;
  }
  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err) => {
    if (err) return res.status(401).json({ error: 'Unauthorised or Invalid Token', err });

    next();
  });
};

export default verifyAuthToken;
